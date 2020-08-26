exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Stories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Stories").insert([
        {
          user_id: "1",
          title: "Adventure in Mos Eisley",
          body: "This is my story from Mos Eisley",
          image_url:
            "https://images.unsplash.com/photo-1578681715158-f7f1c53458af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          location: "Mos Eisley",
        },
        {
          user_id: "2",
          title: "Adventure In Cloud City",
          body: "This is my story from Cloud City",
          image_url:
            "https://images.unsplash.com/photo-1595441618793-9a4e0387572a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
          location: "Cloud City",
        },
        {
          user_id: "3",
          title: "Adventure on Dagobah",
          body: "This is my story from Dagobah",
          image_url:
            "https://images.unsplash.com/photo-1543777166-81504743e51e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          location: "Dagobah",
        },
      ]);
    });
};
