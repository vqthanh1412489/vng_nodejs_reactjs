// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../../config/DefaultRoutes');
const Helper = require('../../utils/Helper');
const ReturnCode = require('../../config/Enum').RETURN_CODE;
const ResponseBuilder = require('../../utils/ResponseBuilder').buildReponse;
const Warranty = require('../../models/Warranty');
const Moment = require('moment');
const Mongo = require('mongodb');

/*************** Create ONE warranty ********************** */
router.post(DefaultRoutes.WARRANTY.ADD, (req, res) => {
    const wrtName = req.body.warrantyName;
    var warranty = new Warranty({
        warrantyName: wrtName,
        updateAt: Moment.now(),
        created: Moment.now(),
        isDelete: false
    });
    warranty.save((err) => {
        if (err) {
            res.json(ResponseBuilder(ReturnCode.FAILURE, "error!", ""));
            return;
        } else {
            res.json(ResponseBuilder(ReturnCode.SUCCESS, "Add success!", {
                "warrantyName": wrtName,
                warrantyId: warranty._id
            }));
        }
    });
})

/******************************  Update ONE warranty ***************************************/
router.post(DefaultRoutes.WARRANTY.UPDATE, (req, res) => {
    const warrantyID = req.body.warrantyId;
    const warrantyName = req.body.warrantyName;

    Warranty.findOne({
            _id: new Mongo.ObjectId(warrantyID),
            isDelete: false
        })
        .then(warranty => {
            if (!warranty) {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "FAIL!", ""));
            } else {
                warranty.warrantyName = warrantyName;
                warranty.updateAt = Moment.now();
                warranty.save(err => {
                    ReturnCode.FAILURE, "fail fail", ""
                });
                res.json(ResponseBuilder(ReturnCode.SUCCESS, "updated success!", ""));
            }
        })
        .catch(err => {
            res.json(ResponseBuilder(ReturnCode.FAILURE, err, ""));
        })
})


/******************************  Remove ONE warranty type ***************************************/

router.post(DefaultRoutes.WARRANTY.DELETE, (req, res) => {
    const warrantyId = req.body.warrantyId;
    Warranty.findOne({
            _id: new Mongo.ObjectId(warrantyId),
            isDelete: false
        })
        .then(warranty => {
            if (!warranty) {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "FAIL!", ""));
            } else {
                warranty.isDelete = true;
                warranty.save(err => {
                    ReturnCode.FAILURE, "fail fail", ""
                });
                res.json(ResponseBuilder(ReturnCode.SUCCESS, "deleted success!", ""));
            }
        })
        .catch(err => {
            res.json(ResponseBuilder(ReturnCode.FAILURE, err, ""));
        })
})

/******************************  Get ONE warranty ***************************************/
router.post(DefaultRoutes.WARRANTY.GET_ONE, (req, res) => {
    const warrantyId = req.body.warrantyId;
    Warranty.findOne({
            _id: new Mongo.ObjectId(warrantyId),
            isDelete: false
        })
        .then(warranty => {
            if (!warranty) {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "FAIL!", ""));
            } else {
                res.json(ResponseBuilder(ReturnCode.SUCCESS, "find success!", {
                    "warrantyId": warranty._id,
                    "warrantyName": warranty.warrantyName,
                    "createdAt":warranty.created,
                    "updatedAt": warranty.updateAt,
                    "isDeleted": warranty.isDelete
                }));
            }
        })
        .catch(err => {
            res.json(ResponseBuilder(ReturnCode.FAILURE, "fail fail", ""));
        })
})
module.exports = router;