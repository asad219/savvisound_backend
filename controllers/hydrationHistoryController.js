const asyncHandler = require('express-async-handler');
const { HydrationHistory } = require('../models/hydrationHistoryModel');
const { parseHydrationHistoryCreate, parseHydrationHistoryUpdate } = require('../validators/hydrationHistory.zod');



//create hydration history by user
const createHydrationHistory = asyncHandler(async (req, res) => {
    const validatedData = parseHydrationHistoryCreate(req.body);
    const hydrationHistory = new HydrationHistory(validatedData);
    const savedHydrationHistory = await hydrationHistory.save();
    res.status(201).json({
        success: true,
        hydrationHistory: savedHydrationHistory,
    });
});

//get hydration history by user id
const getHydrationHistoryByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const results = await HydrationHistory.find({ userId: userId })
        .sort({ createdAt: -1 })
        .select('_id userId date quantity unit glassSizeId createdAt updatedAt')
        .populate('userId', 'name email firstName lastName')
        .populate('glassSizeId', 'name volume unit')
        .lean();
    const hydrationHistory = results.map(({ userId, glassSizeId, ...rest }) => ({
        ...rest,
        user: userId,
        glassSize: glassSizeId ?? null,
    }));
    res.status(200).json({
        success: true,
        hydrationHistory,
    });
});

//delete hydration history by id
const deleteHydrationHistoryById = asyncHandler(async (req, res) => {
    const { hydrationHistoryId } = req.params;
    await HydrationHistory.findByIdAndDelete(hydrationHistoryId);
    res.status(200).json({
        success: true,
        message: 'Hydration history deleted successfully',
    });
});

module.exports = {
    createHydrationHistory,
    getHydrationHistoryByUserId,
    deleteHydrationHistoryById,
};