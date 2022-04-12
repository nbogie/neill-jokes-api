console.log("1. I am starting to execute JS");

const express = require("express");
const allJokes = require("./jokesData.json");
const lodash = require("lodash");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
// be prepared to parse application/json if seen in body and substitute req.body as the parsed object
app.use(express.json());
app.use(cors());

let nextJokeId = 10000000;

//"set up a listener for a get request"
//"if we receive a GET request for path / then call the given function"
//"register a route handler"

//Configure the application (the API server)
app.get("/jokes", handleRequestForAllJokes);
function handleRequestForAllJokes(req, res) {
  //res.header('Access-Control-Allow-Origin', '*');
  res.json(allJokes);
}

app.get("/jokes/first", handleRequestForFirstJoke);
function handleRequestForFirstJoke(req, res) {
  res.json([allJokes[0]]);
}

app.get("/", (req, res) => {
  res.send("This is a jokes API server.  Try /jokes or /jokes/random");
});

function handleRequestForRandomJoke(req, res) {
  const chosenJoke = lodash.sample(allJokes);
  res.json([chosenJoke]);
}
app.get("/jokes/random", handleRequestForRandomJoke);

const handleGetTime = (req, res) => {
  res.send("" + new Date());
};
app.get("/time", handleGetTime);

function handleRequestForRandomJoke(req, res) {
  const chosenJoke = lodash.sample(allJokes);
  res.json([chosenJoke]);
}
app.get("/jokes/random", handleRequestForRandomJoke);

//Configure express to be able to receive a POST request with a new joke

function handleRequestForPOSTJoke(req, res) {
  //get body from request, store as newJoke
  const newJoke = req.body;
  //check it exists (not null / undefined)
  if (newJoke === undefined || newJoke === null) {
    res.send("where is your joke! it's not in the body, i think");
    return;
  }

  //add an id to the joke
  const id = nextJokeId++;
  newJoke.id = id;
  newJoke.timestamp = new Date() + "";
  //put newJoke into the allJokes array
  allJokes.push(newJoke);
  console.log("Saved new joke: ", newJoke);
  res.status(201).json(newJoke);
}

app.post("/jokes", handleRequestForPOSTJoke);

console.log("2. I am going to call listen");

app.listen(port, () => {
  console.log(`3. Example app listening on port ${port} at ` + new Date());
});

console.log("4. I have finished running");
