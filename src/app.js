const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialPath);
app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Shiv",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Shiv",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Shiv",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forescastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forescastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shiv",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shiv",
    message: "MY 404 PAGE",
  });
});

app.listen(port, () => {
  console.log("server started on" + port);
});
