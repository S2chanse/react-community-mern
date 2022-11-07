//배포상태인가?
if (process.env.NODE_ENV === 'production') {
  //배포상태
  module.exports = require('./production');
} else {
  //개발상태
  module.exports = require('./dev');
}
