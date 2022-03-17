"use strict";

var _app = require("./app");

/**
 * inicia o servidor
 */
_app.app.listen(3333, () => {
  console.log('Server running on http://localhost:3333');
});