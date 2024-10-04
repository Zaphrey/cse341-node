const routes = require("express").Router();
const lesson01Controller = require("../controllers/lesson1");
const contacts = require("../controllers/contacts");

// People routes for personal assignment 01
routes.get("/", lesson01Controller.charlesRoute);
routes.get("/erin", lesson01Controller.erinRoute);
routes.get("/miley", lesson01Controller.mileyRoute);

// Contacts route for personal assignment 02
routes.get("/contacts/:id", contacts.getDocument);
routes.get("/contacts", contacts.getDocuments);
routes.post("/contacts", contacts.addDocument);
routes.put("/contacts/:id", contacts.updateDocument);
routes.delete("/contacts/:id", contacts.removeDocument);

module.exports = routes;