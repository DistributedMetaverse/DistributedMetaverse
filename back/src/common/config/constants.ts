const bcryptConstant = {
  saltOrRounds: 10,
};

const jwtConstants = {
  jwtAccesstokenSecret: 'accessTokenSecretKey',
  jwtRefreshtokenSecret: 'refreshTokenSecretKey',
  jwtAccesstokenValidationSecond: '15m',
  jwtRefreshtokenValidationSecond: '1h',
};

export { bcryptConstant, jwtConstants }