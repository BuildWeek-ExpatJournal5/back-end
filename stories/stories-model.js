const db = require("../database/dbconfig");

module.exports = {
  addStory,
  getAllStories,
  getStoriesByUser,
  getStoryById,
  editStory,
  deleteStory,
};

function addStory(story) {
  try {
    return db("Stories")
      .insert(story, "id")
      .then((ids) => {
        return getStoryById(ids[0]);
      });
  } catch (error) {
    throw error;
  }
}

function getAllStories() {
  return db("Stories");
}

function getStoriesByUser(userId) {
  return db("Stories").where("user_id", userId);
}

function getStoryById(id) {
  return db("Stories").where("id", id);
}

function editStory(id, changes) {
  try {
    return db("Stories")
      .where("id", id)
      .update(changes)
      .then((id) => {
        return getStoryById(id);
      });
  } catch (error) {
    throw error;
  }
}

function deleteStory(id) {
  return db("Stories").where("id", id).del();
}
