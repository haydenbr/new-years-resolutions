if (process.env.IONIC_ENV === 'prod') {
  console.log("Prod build started");
  module.exports = require('./webpack.prod');
}
else {
  console.log("Dev build started");
  module.exports = require('./webpack.dev');
}
