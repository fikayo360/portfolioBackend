const User = require('../models/User')
const bcrypt = require("bcrypt")
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const register = async(req,res) => {
    const {username,password} = req.body

    if (!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty')
      }

    const foundUser = await User.findOne({username})

    if (foundUser) {
        return res.status(StatusCodes.BAD_REQUEST).json('user already exists')
    }

    try{
        const savedUser  = await User.create({username,password: bcrypt.hashSync(password, 10)})
        return res.status(StatusCodes.OK).json('user created successfully')
    }
    catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('err creating user')
    }
}

const login = async(req,res) => {
    
    const {username,password} = req.body
    if (!username || !password){
         return res.status(500).json("pls ensure fields are not empty ")
      }
    try{  
    const foundUser = await User.findOne({username})
    if(!foundUser){
        return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
    }
  
    if(!bcrypt.compareSync(password,foundUser.password)){
       return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
     }else{
        const { password, ...others} = foundUser._doc;
        console.log(others)
        const {username,_id} = others;
        console.log({username,_id})
        let tokenUser = {username,_id}
        let secretKey = process.env.JWT_SECRET
        const token = jwt.sign(tokenUser, secretKey, {
            expiresIn: process.env.JWT_LIFETIME
          });
        return res.status(StatusCodes.OK).json({tokenUser,token})
     }
    }
    catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('error Authenticating user')
    }
}

module.exports = {register,login}