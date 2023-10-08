const Post = require('../models/Post')
const { StatusCodes } = require('http-status-codes')


const publishPost = async(req,res) => {
    const {userId,postImg,postAuthor,postTitle,postBody} = req.body
    try{
        const newPost = await Post.create({userId,postImg,postAuthor,postTitle,postBody})
        res.status(StatusCodes.OK).json('post created ')
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('error creating posts ')
    }
}

const commentPost = async(req,res) => {
    try{
        const Timecreated = Date.now()
        const {PostId,PostcommentAuthor,PostcommentBody,PostcommentProfilePic} = req.body
        let newComment = {PostId,PostcommentAuthor,PostcommentProfilePic,PostcommentBody,Timecreated}
        let currentPost = await Post.findById({_id:PostId})
        
        currentPost.postComments.push(newComment)
        await currentPost.save()
        
        res.status(StatusCodes.OK).json('comment added succesfully')
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json(err)
    }
}

const getPostByUser = async(req,res) => {
    try{
        const userPost = await Post.find({})
        if(userPost){
            res.status(StatusCodes.OK).json(userPost)
        }else{
            res.status(StatusCodes.BAD_REQUEST).json('fikayo has not posted yet')
        }
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('error occured')
    }
}

const getCommentsByPost = async(req,res) => {
    const PostId = req.query.PostId;
    try{
        const comments = await Post.findOne({_id:PostId})
        res.status(StatusCodes.OK).json(comments);
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('error getting comments');
    }
}

module.exports = {publishPost,commentPost,getCommentsByPost,getPostByUser}