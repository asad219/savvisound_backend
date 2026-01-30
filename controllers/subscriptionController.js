const asyncHandler = require('express-async-handler');
const { Subscription } = require('../models/subscriptionModel');
const { parseSubscriptionCreate, parseSubscriptionUpdate } = require('../validators/subscription.zod');
const { convertDateOnlyToDate, formatDateOnly, transformDateFields } = require('../utils/dateTimeUtils');

//get all subscriptions by admin
const getAllSubscriptions = asyncHandler(async (req, res) => {
    const subscriptions = await Subscription.find()
        .select('_id userId packageId price discount total couponId subscriptionStatus expirationDate createdAt updatedAt')
        .populate('userId', 'name email firstName lastName')
        .populate('packageId', 'name price')
        .populate('couponId', 'name discount')
        .lean();
    res.status(200).json({
        success: true,
        subscriptions,
    });
});

//create subscription by user
const createSubscription = asyncHandler(async (req, res) => {
    const validatedData = parseSubscriptionCreate(req.body);
    const transformedData = transformDateFields(validatedData, { dateKeys: ['expirationDate'] });
    const subscription = new Subscription(transformedData);
    const savedSubscription = await subscription.save();
    res.status(201).json({
        success: true,
        message: 'Subscription created successfully',
        subscription: savedSubscription,
    });
});

//get subscription by user id
const getSubscriptionByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const doc = await Subscription.findOne({ userId: userId })
        .select('_id userId packageId price discount total couponId subscriptionStatus expirationDate createdAt updatedAt')
        .populate('userId', 'name email firstName lastName')
        .populate('packageId', 'name price')
        .populate('couponId', 'name discount')
        .lean();
    if (!doc) {
        return res.status(200).json({
            success: true,
            subscription: null,
        });
    }
    const { userId: userIdRef, packageId, couponId, expirationDate, ...rest } = doc;
    const dateStr = expirationDate != null ? formatDateOnly(expirationDate) : null;
    const subscription = {
        ...rest,
        user: userIdRef,
        package: packageId,
        coupon: couponId,
        expirationDate: dateStr != null ? convertDateOnlyToDate(dateStr) : null,
    };
    res.status(200).json({
        success: true,
        subscription,
    });
});

// update subscription
// update subscription only when current date is greater than expiration date
const updateSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = parseSubscriptionUpdate(req.body);
    const subscriptionToUpdate = await Subscription.findById(id);
    if (!subscriptionToUpdate) {
        res.status(404);
        throw new Error('Subscription not found');
    }
    const currentDate = new Date();
    // Check if subscription has expired
    let updatedSubscription;
    if (
        subscriptionToUpdate.expirationDate &&
        currentDate > subscriptionToUpdate.expirationDate &&
        subscriptionToUpdate.subscriptionStatus === 'active'
    ) {
        updatedSubscription = await Subscription.findByIdAndUpdate(
            id,
            { subscriptionStatus: 'expired' },
            { new: true }
        );
    } else {
        updatedSubscription = await Subscription.findByIdAndUpdate(
            id,
            validatedData,
            { new: true }
        );
    }

    res.status(200).json({
        success: true,
        message: 'Subscription updated successfully',
        subscription: updatedSubscription,
    });
});

// cancel subscription by user
const cancelSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subscriptionToCancel = await Subscription.findById(id);
    if (!subscriptionToCancel) {
        res.status(404);
        throw new Error('Subscription not found');
    }
    subscriptionToCancel.subscriptionStatus = 'cancelled';
    subscriptionToCancel.cancelDate = new Date();
    const canceledSubscription = await subscriptionToCancel.save();
    res.status(200).json({
        success: true,
        message: 'Subscription cancelled successfully',
        subscription: canceledSubscription,
    });
});

module.exports = {
    getAllSubscriptions,
    createSubscription,
    getSubscriptionByUserId,
    updateSubscription,
    cancelSubscription
};