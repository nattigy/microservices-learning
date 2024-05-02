const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const status = content?.includes("orange") ? "rejected" : "approved";

    axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          content,
          status,
          postId,
        },
      })
      .catch((e) => console.log({ sender: "CommentModerated", error: e }));
  }

  res.send({});
});

app.listen(4003, () => [console.log("listening on 4003")]);
