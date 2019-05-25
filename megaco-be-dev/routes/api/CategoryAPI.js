// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../../config/DefaultRoutes');
const Helper = require('../../utils/Helper');
const Category = require('../../models/Category');
const ReturnCode = require('../../config/Enum').RETURN_CODE;
const categoryCore = require('../../core/CategoryCore');
const responseBuilder = require('../../utils/ResponseBuilder').buildReponse;
const moment = require('moment');
const mongo = require('mongodb');
const fs = require('fs');
// Add category
router.post(DefaultRoutes.CATEGORY.ADD, (req, res) => {
    const data = req.body;
    const categoryName = data.categoryName;
    // console.log(data);
    Category.findOne({categoryName:categoryName}).exec()
    .then(category => {
        if(category != null || category === ''){
            res.json(responseBuilder(returnCode.FAILURE, "category exited!", ""));
        return;
        } else {
            console.log(categoryName);
            var category = new Category({
                categoryName: categoryName,
                haveChildren: data.haveChildren,
                parentId: data.parentId,
                attributes: data.attributes,
                createdAt: moment.now(),
                updateAt: moment.now()
            });
            category.save((err)=> {
                if(err){
                    // console.log(err);
                res.json(responseBuilder(returnCode.FAILURE, "error!", ""));
                    return;
                } else {
                    res.json(responseBuilder(returnCode.SUCCESS, "Add success!", {"category": category}));
                }
            });
        }
    });
    
});

router.post(DefaultRoutes.CATEGORY.GET_TREE, (req, res) => {
    // const file = './dataCategoryTree/categories.json';
    const file = './dataCategoryTree/catefull.json';
    fs.readFile(file,'utf8', (err, data)=>{
        if(err) {
           return res.json(responseBuilder(ReturnCode.FAILURE, err,""));
        }
        else {
        // jsonString = JSON.parse(data);
        res.status(200).json(responseBuilder(ReturnCode.SUCCESS, 'succeess', {
            "categories": JSON.parse(data)
        }))

    }

    })

    // Category.find({category})
    //     .then(category => {
    //         if (!category) {
    //             res.json(ResponseBuilder.buildReponse(ReturnCode.FAILURE, 'fail'));
    //         } else {
                // res.status(200).json(ResponseBuilder.buildReponse(ReturnCode.SUCCESS, 'succeess', {
                //     category: category
                // }))
    //         }
    //     })
    //     .catch(err => {
    //         res.json(ResponseBuilder.buildReponse(ReturnCode.FAILURE, err));
    //     })
})

router.post(DefaultRoutes.CATEGORY.GET_ATTRIBUTE, (req, res) => {
    const categoryId = req.body.categoryId;

    Category.findOne({
            _id: new mongo.ObjectId(categoryId)
        })
        .then(category => {
            if (!category) {
                res.json(ResponseBuilder.buildReponse(ReturnCode.FAILURE, 'fail'));
            } else {
                res.status(200).json(ResponseBuilder.buildReponse(ReturnCode.SUCCESS, 'succeess', {
                    categoryName: category.categoryName,
                    attributes: category.attributes
                }))
            }
        })
        .catch(err => {
            res.json(ResponseBuilder.buildReponse(ReturnCode.FAILURE, err));
        });
})

module.exports = router;
