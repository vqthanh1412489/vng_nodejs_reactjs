// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../../config/DefaultRoutes');
const AuthCore = require('../../core/AuthCore');

const ResponseBuilder = require('../../utils/ResponseBuilder');
const RETURN_CODE = require('../../config/Enum').RETURN_CODE;
const USER_ROLE = require('../../config/Enum').ROLE;

/*
 *
 *   SECTION 2: Authentication
 *
 */

// 2.1. Login
router.post(DefaultRoutes.AUTHENTICATION.LOGIN, (req, res, next) => {
  const accountName = req.body.accountName;
  const password = req.body.password;

  if (!accountName || !password) {
    return res
      .status(400)
      .json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          `${(!accountName && 'accountName') ||
            (!password && 'password')} is missing`
        )
      )
  }

  AuthCore.login(accountName, password)
    .then(loginToken => {
      if (loginToken == null) {
        return res.json(
          ResponseBuilder.buildReponse(RETURN_CODE.FAILURE, 'login failed')
        )
      }

      return res.json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.SUCCESS,
          'login successfully',
          {
            token: loginToken
          }
        )
      )
    })
    .catch(err => {
      return res.json(
        ResponseBuilder.buildReponse(RETURN_CODE.FAILURE, err.message)
      )
    })
})

// 2.2. Register
router.post(DefaultRoutes.AUTHENTICATION.REGISTER, (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const phone = req.body.phone
  const email = req.body.email
  const fullname = req.body.fullname
  const permission = req.body.permission

  if (!username || !password || !phone || !email) {
    return res
      .status(400)
      .json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          `${(!username && 'username') ||
            (!password && 'password') ||
            (!phone && 'phone') ||
            (!email && 'email')}` + ' is missing'
        )
      )
  }
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    (typeof phone !== 'string' || isNaN(Number(phone))) ||
    typeof email !== 'string'
  ) {
    return res
      .status(400)
      .json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          `input data type is invalid`
        )
      )
  }

  AuthCore.register({
    username,
    password,
    phone,
    email,
    fullname,
    permission: permission || USER_ROLE.USER
  })
    .then(createdUser => {
      if (!createdUser) {
        return res
          .status(200)
          .json(
            ResponseBuilder.buildReponse(
              RETURN_CODE.FAILURE,
              'Registration failed'
            )
          )
      }

      return res.json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.SUCCESS,
          'Register successfully',
          {
            username: createdUser.username
          }
        )
      )
    })
    .catch(err => {
      if (err.name === 'MongoError') {
        return res.json(
          ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            err.errmsg.substring(
              err.errmsg.indexOf('index: ') + 7,
              err.errmsg.lastIndexOf('_')
            ) + ' is existing'
          )
        )
      }

      return res.json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          'Can not register account'
        )
      )
    })
})

// 2.3. Reset password
router.post(DefaultRoutes.AUTHENTICATION.RESET_PASSWORD, (req, res, next) => {
  const accountName = req.body.accountName

  if (!accountName) {
    return res
      .status(400)
      .json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          `${!accountName && 'accountname'}` + ' is missing'
        )
      )
  }
  if (typeof accountName !== 'string') {
    return res
      .status(400)
      .json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          `input data type is invalid`
        )
      )
  }

  AuthCore.resetPassword({
    accountName
  })
    .then(isReseted => {
      if (!isReseted) {
        return res
          .status(200)
          .json(
            ResponseBuilder.buildReponse(
              RETURN_CODE.FAILURE,
              'Can not reset password. Please try again later'
            )
          )
      }

      return res.json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.SUCCESS,
          'A reset email has been sent to your email'
        )
      )
    })
    .catch(errmsg => {
      return res.json(
        ResponseBuilder.buildReponse(RETURN_CODE.FAILURE, errmsg.toString())
      )
    })
})

/**
 *  Demo user auth for frontend
 *
 *
 *
 *
 */

router.post(DefaultRoutes.AUTHENTICATION.DEMO_LOGIN, (req, res, next) => {
  const userName = req.body.userName
  const password = req.body.password

  if (!userName || !password) {
    return res
      .status(400)
      .json(
        ResponseBuilder.buildReponse(
          RETURN_CODE.FAILURE,
          `${(!userName && 'accountName') ||
            (!password && 'password')} is missing`
        )
      )
  }

  if (password === 'admin' && userName === 'admin') {
    res.json(
      ResponseBuilder.buildReponse(RETURN_CODE.SUCCESS, 'login successfully', {
        token: 'loginToken',
        status: 'ok',
        type: 'admin',
        currentAuthority: 'admin'
      })
    )
    return
  }
  if (password === 'user' && userName === 'user') {
    res.json(
      ResponseBuilder.buildReponse(RETURN_CODE.SUCCESS, 'login successfully', {
        token: 'loginToken',
        status: 'ok',
        type: 'user',
        currentAuthority: 'user'
      })
    )
    return
  }
  res.send({
    status: 'error',
    type: 'guest',
    currentAuthority: 'guest'
  })

  res.json(
    ResponseBuilder.buildReponse(RETURN_CODE.FAILURE, 'login failed', {
      status: 'error',
      type,
      currentAuthority: 'guest'
    })
  )
})

router.get(DefaultRoutes.AUTHENTICATION.DEMO_USER, (req, res, next) => {
  res.json(
    ResponseBuilder.buildReponse(
      RETURN_CODE.SUCCESS,
      'get current user successfully!',
      {
        token: 'loginToken',
        name: 'Son Nguyen',
        avatar: '',
        userid: '00000001',
        email: 'sonnguyennnnn@gmail.com',
        signature: 'Try it yourself.',
        title: 'Software Engineer',
        profile: 'Winter is coming',
        group: 'Megaco',
        tags: [
          {
            key: '0',
            label: 'Professional'
          }
        ],
        notifyCount: 3,
        country: 'Vietnam',
        geographic: {
          province: {
            label: 'Quan 8',
            key: '110000'
          },
          city: {
            label: 'Sai Gon',
            key: '110100'
          }
        },
        address: 'Address in Sai Gon',
        phone: '099-888888888'
      }
    )
  )
});

/**
 *  END Demo user auth for frontend
 *
 *
 *
 *
 */

module.exports = router
