
var jade = require('jade');
var nodemailer = require('nodemailer');
var templatesUrl = process.cwd() + '/api/templates';


module.exports = function(options, cb) {
  var tasks = {};
  var htmlTemplate = options.htmlTemplate || options.template;
  var textTemplate = options.textTemplate || options.template;

  options.locals = options.locals || {};
  options.locals.settings = sails.config.settings;

  function renderHtml(cb) {
    options.locals.email = true;

    jade.renderFile(templatesUrl + '/html/' + htmlTemplate + '.jade', options.locals, function(err, html) {
      err ? cb(err) : cb(null, html);
    });
  }

  function renderText(cb) {
    jade.renderFile(templatesUrl + '/plaintext/' + textTemplate + '.jade', options.locals, function(err, text) {
      err ? cb(err) : cb(null, text);
    });
  }

  if(htmlTemplate) tasks.html = renderHtml;
  if(textTemplate) tasks.text = renderText;

  async.parallel(
    tasks,
    function (err, content) {
      if(err) return cb(err);

      var transporter = nodemailer.createTransport({
        service: sails.config.mailer.service,
        auth: {
          user:  sails.config.mailer.user,
          pass:  sails.config.mailer.pass
        }
      });
      transporter.sendMail(_.merge(options, content, {
        from: sails.config.mailer.from
      }), cb);
    }
  );
};
