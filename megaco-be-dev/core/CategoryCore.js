const Category = require('../models/Category');

module.exports = {
    checkExited: async (categoryName) => {
        return await Category.find({categoryName: categoryName})
        .then(category => {
            if(category!="") return false;
            else return true;
        }).catch(err=>{
            console.log(err);
            return false;
        })
        
    },

    
}