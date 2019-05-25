// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../../config/DefaultRoutes');
const Helper = require('../../utils/Helper');
const ReturnCode = require('../../config/Enum').RETURN_CODE;
const ResponseBuilder = require('../../utils/ResponseBuilder').buildReponse;
const Logistic = require('../../models/Logistic');
const Moment = require('moment');
const Mongo = require('mongodb');


//************* CREATE ONE LOGISTIC **************************
router.post(DefaultRoutes.LOGISTIC.ADD, (req, res) => {
    const logisticName = req.body.logisticName;

    Logistic.findOne({
            logisticName: logisticName
        }).exec()
        .then(logistic => {
            if (!logistic) {
                var logistic = new Logistic({
                    logisticName: logisticName,
                    updateAt: Moment.now(),
                    created: Moment.now(),
                    isDelete: false
                });
                logistic.save((err) => {
                    if (err) {
                        console.log(err);
                        res.json(ResponseBuilder(ReturnCode.FAILURE, "error!", ""));
                        return;
                    } else {
                        res.json(ResponseBuilder(ReturnCode.SUCCESS, "Add success!", {
                            "logistic": logistic
                        }));
                    }
                });

                return;
            } else {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "logistic exited!", ""));
            }
        })
})

//************* GET ALL LOGISTICS **************************
// router.post(DefaultRoutes.LOGISTIC.GET_ALL, (req, res) => {
//     Logistic.find({
//             isDelete: false
//         })
//         .then(logistics => {
//             if (!logistics) {
//                 res.json(ResponseBuilder.buildReponse(ReturnCode.FAILURE, 'fail'));
//             } else {
//                 res.status(200).json(ResponseBuilder.buildReponse(ReturnCode.SUCCESS, 'succeess', {
//                     logistics: logistics
//                 }))
//             }
//         })
//         .catch(err => {
//             console.log('fail');
//             res.json(ResponseBuilder.buildReponse(ReturnCode.FAILURE, err, {}));
//         })
// })

//************* GET ONE LOGISTICS **************************
router.post(DefaultRoutes.LOGISTIC.GET_ONE, (req, res) => {
    const logisticId = req.body.logisticId;
    Logistic.findOne({
            _id: new Mongo.ObjectId(logisticId),
            isDelete: false
        })
        .then(logistic => {
            if (!logistic) {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "FAIL!", ""));
            } else {
                res.json(ResponseBuilder(ReturnCode.SUCCESS, "find success!", {
                    "logisticId": logistic._id,
                    "logisticName": logistic.logisticName,
                    "createdAt": logistic.created,
                    "updatedAt": logistic.updateAt,
                    "isDeleted": logistic.isDelete
                }));
            }
        })
        .catch(err => {
            res.json(ResponseBuilder(ReturnCode.FAILURE, "fail fail", ""));
        })
})

router.post(DefaultRoutes.LOGISTIC.UPDATE, (req, res) => {
    const lcId = req.body.logisticId;
    const lcName = req.body.logisticName;

    Logistic.findOne({
            _id: new Mongo.ObjectId(lcId),
            isDelete: false
        })
        .then(logistic => {
            if (!logistic) {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "FAIL!", ""));
            } else {
                logistic.logisticName = lcName;
                logistic.save(err => {
                    ReturnCode.FAILURE, "fail fail", ""
                });
                res.json(ResponseBuilder(ReturnCode.SUCCESS, "updated success!", ""));
            }
        })
        .catch(err => {
            res.json(ResponseBuilder(ReturnCode.FAILURE, err, ""));
        })
})

router.post(DefaultRoutes.LOGISTIC.DELETE, (req, res) => {
    const lcId = req.body.logisticId;
    Logistic.findOne({
            _id: new Mongo.ObjectId(lcId),
            isDelete: false
        })
        .then(logistic => {
            if (!logistic) {
                res.json(ResponseBuilder(ReturnCode.FAILURE, "FAIL!", ""));
            } else {
                logistic.isDelete = true;
                logistic.save(err => {
                    ReturnCode.FAILURE, "fail fail", ""
                });
                res.json(ResponseBuilder(ReturnCode.SUCCESS, "deleted success!", ""));
            }
        })
        .catch(err => {
            res.json(ResponseBuilder(ReturnCode.FAILURE, err, ""));
        })
})

module.exports = router;