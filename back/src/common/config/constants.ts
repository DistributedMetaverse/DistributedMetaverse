const bcryptConstant = {
  saltOrRounds: 10,
};

const jwtConstants = {
  jwtAccesstokenSecret: 'accessTokenSecretKey',
  jwtRefreshtokenSecret: 'refreshTokenSecretKey',
  jwtAccesstokenValidationSecond: 60 * 15, // 15m
  jwtRefreshtokenValidationSecond: 60 * 60,  // 1h or 7d
};

export { bcryptConstant, jwtConstants }