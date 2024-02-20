const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var fs = require("fs");

const { products, users, pro } = require("./dummy.json");
app.use(bodyParser.json());
// console.log(products);
// console.log(users);

app.get("/products", (req, res) => {
  res.type = "application/json";
  res.send({ products });
});

app.get("/users", (req, res) => {
  res.type = "application/json";
  res.send({ users });
});

app.post("/add-users", (req, res) => {
  const usersList = req.body;
  console.log(usersList);

  fs.readFile("dummy.json", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      const jsonFile = JSON.parse(data.toString());
      jsonFile.users.push(usersList);
      fs.writeFile("dummy.json", JSON.stringify(jsonFile), (err) => {
        if (err) {
          console.log(err);
          res.send("error happened");
        } else {
          console.log("success");
          res.send("User added successfully");
        }
      });
    }
  });
  res.status(200);
  res.send("user added");
});

app.get("/usernames", (req, res) => {
  res.type = "application/json";
  res.send({ usernames });
});

const usernames = users.map((e) => {
  return e.name;
});

// console.log(usernames);

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
