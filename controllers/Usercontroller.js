const User = require('../models/User')
const bcrypt = require("bcrypt")
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const jwt = require('jsonwebtoken');

const register = async(req,res) => {
    const {username,password} = req.body

    if (!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty')
      }

    const foundUser = await User.findOne({username})

    if (foundUser) {
        res.status(StatusCodes.BAD_REQUEST).json('user already exists')
    }

    try{
        const savedUser  = await User.create({username,password: bcrypt.hashSync(password, 10)})
        const tokenUser = createTokenUser(savedUser)
        attachCookiesToResponse({res,user:tokenUser})
        res.status(StatusCodes.OK).json({user:tokenUser})
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
    console.log(foundUser);
    if(!foundUser){
        return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
    }
    
    if(!bcrypt.compareSync(password,foundUser.password)){
       return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
     }
     const { password: foundUserPassword, ...others } = foundUser._doc;
     const tokenUser = createTokenUser(others);
     let cookie = attachCookiesToResponse({ res, user: tokenUser });
     return res.status(StatusCodes.OK).json({ user: others,cookie });
    }
    catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('error Authenticating user')
    }
}

module.exports = {register,login}