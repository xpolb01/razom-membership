const fs = require('fs');
const https = require('https');
const app = require('express')();
const db = require('./models');
const SwaggerExpress = require('swagger-express-mw');

const port = process.env.PORT || 9292;
const env = process.env.NODE_ENV;
const swaggerSecurityHandlers = require('./config/security');

module.exports = app; // for testing

function customSwaggerErrorHandler(err, req, res, next) {
  // if (env === 'test') console.log(err);
  if (err.failedValidation) {
    // logger.log(`Error code 400 sent to user ${req.auth && req.auth.email}. Message is "${err.message}"`);
    res.status(400).json({ success: false, status: 400, message: err.message, validationErrors: err.results });
  } else {
    // logger.log(`Error code ${err.statusCode || 500} sent to user ${req.auth && req.auth.email}. Message is "${err.message}"`);
    res.status(err.statusCode || 500).json({ success: false, status: err.statusCode || 500, message: err.message });
  }
}

const config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers, // to protect routes
};

if (env === 'test') {
  // test config
  SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) { throw err; }
    // install middleware
    swaggerExpress.register(app);
    app.use(customSwaggerErrorHandler);
    app.listen(port);
  });
} else {
  // regular config
  SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) { throw err; }

    /**
     * Listen on provided port, on all network interfaces...
     */
    if (env === 'production' || env === 'stage') {
      // const clientCertificateAuth = require('client-certificate-auth');
      // checking client certificate here so only requests coming from API Gateway can get thru
      const checkAuth = cert => cert.subject.CN === 'ApiGateway';
      // install middleware
      // app.use(clientCertificateAuth(checkAuth));
      swaggerExpress.register(app);

      const SSLOptions = {
        key: fs.readFileSync('betterpt-key.pem'),
        cert: fs.readFileSync('betterpt-crt.pem'),
        ca: [fs.readFileSync('gd-ca-crt.pem'), fs.readFileSync('client-crt.pem')],
        requestCert: true,
        // rejectUnauthorized is set to true here so no other entity can request from
        // our backend except the API Gateway
        rejectUnauthorized: true
      };

      const httpsServer = https.createServer(SSLOptions, app);

      app.use(customSwaggerErrorHandler);
      db.didConnect
        .then(() => httpsServer.listen(port));
    } else {
      swaggerExpress.register(app);
      app.use(customSwaggerErrorHandler);
      db.didConnect
        .then(() => app.listen(port))
        .then(() => console.log(`App is listening on port ${port}`));
    }
  });
}
