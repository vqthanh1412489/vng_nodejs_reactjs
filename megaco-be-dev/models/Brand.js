const mongoose = require('mongoose');


const BrandSchema = new mongoose.Schema({
    brandName: { type: String, unique: true, required: [true, "can't be blank"] },
    globalIdentifier:{
        type: String,
        unique: true,
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


var Brand = module.exports = mongoose.model('Brand', BrandSchema);
