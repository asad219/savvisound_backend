const asyncHandler = require('express-async-handler');
const {Schedule} = require('../models/scheduleModel');
const {parseScheduleCreate, parseScheduleUpdate, parseScheduleDefaultsCreate} = require('../validators/schedule.zod');
const {formatDateOnly, formatTimeOnly, convertDateOnlyToDate, convertTimeOnlyToDate, transformDateFields} = require('../utils/dateTimeUtils');

// get schedule by id
const getScheduleById = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const schedule = await Schedule.findById(id);
    res.status(200).json({success: true, message: 'Schedule retrieved successfully', schedule: schedule});
});

// get all schedules by user
const getAllSchedulesByUser = asyncHandler(async (req, res) => {
    const {userId} = req.params;


    const schedules = await Schedule.find({userId: userId, isDeleted: false});
    const data = schedules.map((schedule) => ({
        id: schedule.id,
        audioId: schedule.audioId,
        type: schedule.type,
        weekday: schedule.weekday,
        date: formatDateOnly(schedule.date),
        time: formatTimeOnly(schedule.time)
    }));
    if (! data) {
        res.status(404);
        throw new Error('No schedules found');
    }
    res.status(200).json({success: true, message: 'Schedules retrieved successfully', schedules: data});
});

// create schedule by user
const createSchedule = asyncHandler(async (req, res) => {
    const validatedData = parseScheduleCreate(req.body);
    const transformedData = transformDateFields(validatedData, { dateKeys: ['date'], timeKeys: ['time'] });
    const schedule = new Schedule(transformedData);
    const savedSchedule = await schedule.save();
    res.status(201).json({success: true, message: 'Schedule created successfully', schedule: savedSchedule});
});

// create default recurring schedules for full week at 06:30 and 21:00
const createDefaultSchedules = asyncHandler(async (req, res) => {
    const {userId, audioId} = parseScheduleDefaultsCreate(req.body);

    const weekdays = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];
    const timeStrings = ['06:30:00', '21:00:00'];

    const docs = [];

    weekdays.forEach((weekday) => {
        timeStrings.forEach((timeString) => {
            const time = convertTimeOnlyToDate(timeString);
            docs.push({
                userId,
                audioId,
                type: 'recurring',
                weekday,
                date: convertDateOnlyToDate('1900-01-01'),
                time,
                status: true,
                isDefault: true,
                isDeleted: false
            });
        });
    });

    const created = await Schedule.insertMany(docs);

    const response = created.map((schedule) => ({
        id: schedule.id,
        audioId: schedule.audioId,
        type: schedule.type,
        weekday: schedule.weekday,
        date: formatDateOnly(schedule.date),
        time: formatTimeOnly(schedule.time)
    }));

    res.status(201).json({success: true, message: 'Default schedules created for full week at 06:30 and 21:00', schedules: response});
});

// // delete schedule by id
// const deleteSchedule = asyncHandler(async (req, res) => {
//     const {id} = req.params;
//     const schedule = await Schedule.findByIdAndDelete(id);
//     res.status(200).json({success: true, message: 'Schedule deleted successfully', schedule: id});
// });

// update schedule by id
const updateSchedule = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const validatedData = parseScheduleUpdate(req.body);
    const transformedData = transformDateFields(validatedData, { dateKeys: ['date'], timeKeys: ['time'] });
    const schedule = await Schedule.findByIdAndUpdate(id, transformedData, {new: true});
    if (! schedule) {
        res.status(404);
        throw new Error('Schedule not found');
    }
    const { userId, audioId, type, weekday, date, time, status, isDefault, isDeleted, ...rest } = schedule;
    const scheduleResponse = {
        ...rest,
        user: userId,
        audio: audioId,
        type: type,
        weekday: weekday,
        date: formatDateOnly(date),
        time: formatTimeOnly(time),
        status: status,
        isDefault: isDefault,
        isDeleted: isDeleted,
    };
    res.status(200).json({success: true, message: 'Schedule updated successfully', schedule: scheduleResponse});
});

module.exports = {
    getScheduleById,
    getAllSchedulesByUser,
    createSchedule,
    updateSchedule,
    createDefaultSchedules

};
