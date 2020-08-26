exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Users").insert([
        {
          username: "IG-88",
          password: "password",
          email: "ig88@bounty.com",
        },
        {
          username: "Boba Fett",
          password: "password",
          email: "bfett@bounty.com",
        },
        {
          username: "Dengar",
          password: "password",
          email: "dengar@bounty.com",
        },
      ]);
    });
};
