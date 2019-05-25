const mongoose = require('mongoose');


const WarrantySchema = new mongoose.Schema({
    warrantyName:{
        type: String,
        required: true,
        unique: true,
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


var Warranty = module.exports = mongoose.model('Warranty', WarrantySchema);