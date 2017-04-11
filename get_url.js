var fs = require('fs');
  var googleAuth = require('google-auth-library');

  var scopes = require('./scopes');

  function getAuthorizationUrl(cb) {
    // Load client secrets
    fs.readFile('client_secret.json', function(err, data) {
      if (err) {
        return cb(err);
      }
      var credentials = JSON.parse(data);
      var clientSecret = credentials.web.client_secret;
      var clientId = credentials.web.client_id;
      var redirectUrl = credentials.web.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
      });
      return cb(null, authUrl);
    });
  }

  getAuthorizationUrl(function(err, url) {
    if (err) {
      console.log('err:', err);
    } else {
      console.log('Authorization url is:\n', url);
    }
  });
