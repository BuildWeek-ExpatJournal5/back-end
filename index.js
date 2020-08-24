const server = require("./api/server.js");
const constants = require("./variables/constants");

PORT = constants.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
