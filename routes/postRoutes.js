const express = require("express")
const router = express.Router()
const {publishPost,commentPost,getCommentsByPost,getPostByUser} = require('../controllers/Postcontroller')
const {authUser} = require('../middleware/auth')

router.route("/publish").post(authUser,publishPost)
router.route("/commentPost").post(commentPost)
router.route("/postByUser").get(getPostByUser)
router.route("/getComments").get(getCommentsByPost)

module.exports = router