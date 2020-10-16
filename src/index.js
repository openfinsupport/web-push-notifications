let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser");
let webPush = require("web-push");

app.use(express.static("public"));

app.use(bodyParser.json());

// generate keys w/ webPush.generate.generateVAPIDKeys()
// this example just uses a hard coded keys:

const VAPID_PUBLIC_KEY =
  "BKTPwedXYPj7oz3fSXqHZRtyikcU7W-ImjdNGAbztNZ5t0rZLE57BJR9fSfBR6ojshObArP9xqYsHI0M07IjBR4";
const VAPID_PRIVATE_KEY = "nxwrPP5Sle44IDNvsLMHxa73Y26wcjf3CHXr95B4yhw";

// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://dmntc.sse.codesandbox.io/",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.get("/service-worker.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/service-worker.js"));
});

app.get("/vapidPublicKey", function (req, res) {
  res.send(VAPID_PUBLIC_KEY);
});

app.post("/register", function (req, res) {
  res.sendStatus(201);
});

app.post("/sendNotification", function (req, res) {
  const { subscription, message, delay, uuid } = req.body;

  const payload = JSON.stringify({
    uuid,
    message
  });

  const options = {
    TTL: null
  };

  setTimeout(function () {
    webPush
      .sendNotification(subscription, payload, options)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        res.sendStatus(500);
        console.log(error);
      });
  }, delay * 1000);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is live and listening to ${PORT}`);
});
