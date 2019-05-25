const mongoose = require('mongoose');

const LogisticSchema = new mongoose.Schema({
    logisticName: {
        type: String,
        required: true,
    },
    updateAt:{
        type: Date,
    },
    createdAt: {
        type: Date,
   },
    isDeleted: {
        type: Boolean,
        default: false
    }
    

}, { timestamps: true });


var Logistic = module.exports = mongoose.model('Logistic', LogisticSchema);