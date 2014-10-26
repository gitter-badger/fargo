/**
 * ApplicationController
 *
 */

module.exports = {

  index: function(req, res) {
    if(sails.config.csrf) {
      res.cookie('XSRF-TOKEN', res.locals._csrf);
    }
    req.user && res.cookie('SESSION-USER', JSON.stringify(req.user));
    return res.view('index');
  }
};
