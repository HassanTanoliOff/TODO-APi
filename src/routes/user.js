const express = require('express')
const router = express.Router()
const  {getUsers,signUp} = require('../controllers/user')
const {userSignUpValidator} = require('../Validators/userSignUpValidator')

router.get('/',getUsers)
router.post('/signup',userSignUpValidator,signUp)
// router.post('/signin')


module.exports = router;