'use strict';

// Set the DEBUG environment variable to enable debug output
process.env.DEBUG = 'swagger:*';
process.chdir(__dirname);

// Create a Swagger Server app from the yaml file
var swaggerServer = require('swagger-server');
var app = swaggerServer('conf.yaml');

// Start listening on port 8000
app.listen(8000, function() {
  console.log('The Swagger Server is now running at http://localhost:8000');
});
