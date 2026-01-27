const mongoose = require('mongoose');


const validateObjectId = (req, res, next) => {
    if (! mongoose.Types.ObjectId.isValid(req.params.id || req.params.userId || req.params.colorId || req.params.audioFileId || req.params.scheduleId || req.params.notificationSettingsId)) {
        res.status(400);
        throw new Error('Invalid ID format');
    }
    next();
};

module.exports = {
    validateObjectId
};
