"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

const pathToIndex = path.join(__dirname, "build/index.html");

const fpRoutes = [
  "home",
  "about-us",
  "partners",
  "chart",
  "projects",
  "innovation-program",
  "Academic",
  "teams",
  "news",
  "career",
  "contact",
];

const fpRoutes_SEO = [
  {
    title: "ARTPARK",
    content: "ARTPARK (AI & Robotics Technology Park) is a one-of-its-kind, not-for-profit (section-8) foundation promoted by the Indian Institute of Science (IISc), Bengaluru with support from AI Foundry in a public-private collaborative model, to promote technology innovations in AI & Robotics."
  },
  {
    title: "ARTPARK",
    content: "ARTPARK (AI & Robotics Technology Park) is a one-of-its-kind, not-for-profit (section-8) foundation promoted by the Indian Institute of Science (IISc), Bengaluru with support from AI Foundry in a public-private collaborative model, to promote technology innovations in AI & Robotics."
  },  
  {
    title: "ARTPARK PARTNERS",
    content: "A joint initiative of IISc and AI Foundry, with a seed funding of INR 170 Cr ($22Mn) from the Department of Science and Technology (DST) and INR 60 Cr ($10Mn) from the Government of Karnataka (GoK) to create cutting-edge innovations in terms of new technologies, standards, products, services, and intellectual properties out of India."
  },
];

const reimagine_seo = {
  title: "Reimagine Health",
  content: "Reimagined Health Journeys are experiences we dream of providing our health workers, our health professionals, and above all, our citizens."
}

const default_seo = {
  title: "ARTPARK",
  content: "ARTPARK (AI & Robotics Technology Park) is a one-of-its-kind, not-for-profit (section-8) foundation promoted by the Indian Institute of Science (IISc), Bengaluru with support from AI Foundry in a public-private collaborative model, to promote technology innovations in AI & Robotics."  
}

app.get("/", (req, res) => {
  const raw = fs.readFileSync(pathToIndex);
  const pageTitle = "Homepage - Welcome to my page";
  const updated = raw.toString().replace(
    "__PAGE_META__",
    `<title>${default_seo.title}</title>
    <meta
      name="description"
      content="${default_seo.content}"
    />`
  );
  res.send(updated);
}); //

app.get("/reimagine-health", (req, res) => {
  const raw = fs.readFileSync(pathToIndex);
  const updated = raw.toString().replace(
    "__PAGE_META__",
    `<title>${reimagine_seo.title}</title>
    <meta
      name="description"
      content="${reimagine_seo.content}"
    />`
  );
  res.send(updated);
}); //

app.get("/reimagine-health/2030_rural_india", (req, res) => {
  const raw = fs.readFileSync(pathToIndex);
  const pageTitle = "Homepage - Welcome to my page";
  const updated = raw.toString().replace(
    "__PAGE_META__",
    `<title>${reimagine_seo.title}</title>
    <meta
      name="description"
      content="${reimagine_seo.content}"
    />`
  );
  res.send(updated);
}); //

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  console.log(req.originalUrl);
  const raw = fs.readFileSync(pathToIndex);
  const updated = raw.toString().replace(
    "__PAGE_META__",
    `<title>${default_seo.title}</title>
    <meta
      name="description"
      content="${default_seo.content}"
    />`
  );
  res.send(updated);
});

module.exports = app;
module.exports.handler = serverless(app);
