const { NotificationSettings } = require('../models/notificationSettingsModel');
const { parseNotificationSettingsCreate, parseNotificationSettingsUpdate } = require('../validators/notificationSettings.zod');
const asyncHandler = require('express-async-handler');

const getNotificationByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    const notification = await NotificationSettings.findOne({ userId: userId });
    
    
    if (!notification) {
        res.status(404);
        throw new Error('Notification settings not found for this user');
    }
    
    res.status(200).json({
        success: true,
        message: 'Notification settings retrieved successfully',
        data: notification
    });
});


const createNotification = asyncHandler(async (req, res) => {
    const validatedData = parseNotificationSettingsCreate(req.body);

    // Check if notification settings already exist for this user
    const existingNotification = await NotificationSettings.findOne({ userId: validatedData.userId });
        
    if (existingNotification) {
        res.status(400);
        throw new Error('Notification settings already exist for this user');
    }
    
    const notification = new NotificationSettings(validatedData);
    const savedNotification = await notification.save();
    
    res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: savedNotification
    });
});

const updateNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = parseNotificationSettingsUpdate(req.body);
    
    const updatedNotification = await NotificationSettings.findByIdAndUpdate(
        id,
        validatedData,
        { new: true, runValidators: true }
    );
    
    if (!updatedNotification) {
        res.status(404);
        throw new Error('Notification not found');
    }
    
    res.status(200).json({
        success: true,
        message: 'Notification updated successfully',
        data: updatedNotification
    });
});

module.exports = {
    getNotificationByUserId,
    createNotification,
    updateNotification
};