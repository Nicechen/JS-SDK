const coralJs = document.getElementById('coral_js');
const env = coralJs.getAttribute('env'); // beta, pro
module.exports = {
  urlPrefix: env === 'local'
    ? 'http://keiran.qq.com:8782'
    : env === 'beta'
      ? 'https://testgmall.m.qq.com'
      : 'https://gmall.m.qq.com',
  env,
};
