const db = require("../database/dbconfig");

module.exports = {
  add,
  selectBy,
};

function add(user) {
  try {
    return db("Users")
      .insert(user, "id")
      .then((ids) => {
        return ids[0];
      });
  } catch (error) {
    throw error;
  }
}

function selectBy(filter) {
  return db("Users").where(filter);
}
