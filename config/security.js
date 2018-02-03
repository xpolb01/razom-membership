const decode = require('jwt-decode');

/*
* Swagger secuirty handlers are functions that receive a request, the swagger security definition,
* an apiKey (in this case, a JSON Web Token), and callback.
*
* The callback (next) is the gatekeeper to the API:
* - If the cb is called with an error, the request is halted and the response is an error message
* - If the cb is called with nothing, the secuirty security middleware allows the request to proceed
*
* The name of these exported functions must match the 'securityDefinitions' listed in the
* swagger.yaml. To protect to a route, simply add the appropriate 'security' level.
*/


module.exports = { };
