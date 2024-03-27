

const userModel = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
    // const authorization = req.headers.authorization;
    // if (authorization && authorization.startsWith('Bearer')) {
        const token = req.headers["x-auth-token"];
        console.log(token);
  if (!token) {
    return res.status(400).json({
      msg: "Access token is required",
    });
  }
        try {
            console.log("c");
            // const token = req.headers.authorization.split(' ')[1];
            const userVerify = jwt.verify(token, 'masobimat');
            console.log(userVerify);
            const userId = userVerify._id;
            console.log("b");
            const userInf = await userModel.findById(userId).select('-password');
            req.user = userInf;
            next();
        } catch (e) {
            res.status(401);
            console.log(e);
            throw new Error('token khong dung!');
        }
    // } else {
    //     res.status(401);
    //     throw new Error('token truyen khong dung!')
    // }
})
module.exports = {
    protect,
}