const router = require("express").Router();

const Stories = require("./stories-model");

router.get("/", (req, res) => {
  Stories.getAllStories()
    .then((stories) => {
      return res.status(200).json(stories);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "There was an error retrieving the stories" });
    });
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  Stories.getStoriesByUser(userId)
    .then((stories) => {
      return res.status(200).json(stories);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "There was an error retrieving the stories" });
    });
});

router.get("/story/:storyId", (req, res) => {
  const storyId = req.params.storyId;

  Stories.getStoryById(storyId)
    .then((story) => {
      return res.status(200).json(story);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "There was an error retrieving this story" });
    });
});

router.post("/", (req, res) => {
  const newStory = req.body;

  Stories.addStory(newStory)
    .then((story) => {
      return res.status(200).json(story);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "There was a problem adding this story" });
    });
});

router.put("/:storyId", (req, res) => {
  const storyId = req.params.storyId;
  const changes = req.params.body;

  Stories.editStory(storyId, changes)
    .then((story) => {
      return res.status(200).json(story);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unable to apply changes" });
    });
});

router.delete("/:storyId", (req, res) => {
  const storyId = req.params.storyId;

  Stories.deleteStory(storyId)
    .then((count) => {
      if (count > 0) {
        return res.status(204).end();
      } else {
        return res.status(404).json({ message: "This story does not exist" });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Unable to delete the story at this time" });
    });
});

module.exports = router;
