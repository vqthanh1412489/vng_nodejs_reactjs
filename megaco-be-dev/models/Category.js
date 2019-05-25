const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    isLeaf: {
        type: Boolean,
        default: false
    },
    parentId:
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'

        },

    attributes: [{
        name: { type: String},
        type: Array,
        isRequired: {type: Boolean},
        options: [{
            value: {type: String}
        }]
    }],

    
    updatedAt:{
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


var Category = module.exports = mongoose.model('Category', CategorySchema);