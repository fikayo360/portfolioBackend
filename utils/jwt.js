const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

const createJWT = ({userId,username}) => {
  let tokenUser = {userId,username}
  const token = jwt.sign(tokenUser, secretKey, {
    expiresIn: process.env.JWT_LIFETIME
  });
  return token;
};

const isTokenValid = ( token ) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
  return token
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
