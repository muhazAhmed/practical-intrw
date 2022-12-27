const { Router } = require("express")
const express = require ("express")
const route = express.Router()
const City = require("./controllers/cityController")
const User = require("./controllers/userController")

route.get("/", (req,res) =>{
    return res.json("Api is Working")
})

//=================> City
route.post("/addcity", City.addCity)
route.get("/city", City.getCity)

//=================> User
route.post("/adduser", User.adduser)
route.get("/user", User.getUser)
route.patch("/user/update/:userId", User.updateUser)

route.all("/*", (req, res) => 
{ res.status(400).send({ status: false, message: "Endpoint is not correct" }) })

module.exports = route