'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var db = app.dataSources['client-gate'];

  //创建模型
  async.parallel({
    logins: async.apply(createUser),
  }, function(err, results) {
    if (err) throw err;

  });
  //创建用户
  function createUser(cb) {
    db.automigrate('ClientMallInfo', function(err) {
      if (err) return cb(err);
      var ClientMallInfo = app.models.ClientMallInfo;
      ClientMallInfo.create([{
        "email": "xuyong@126.com",
        "password": "123",
        "nickName": "xy"
      }], cb)
    });
  }

};
