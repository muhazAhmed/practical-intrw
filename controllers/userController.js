const userModel = require("../models/userModel");
const cityModel = require("../models/cityModel");
const mongoose = require("mongoose");


const adduser = async (req, res) => {
  try {
    let data = req.body;
    let { name, city, mobile, media_url } = data;

    if (!data.name) {
      return res.status(300).json("Please enter a name");
    }

    const alphaName = /^[a-zA-Z]+$/;

    let checkName = alphaName.test(data.name);
    if (!checkName) {
      return res.status(300).json(" name can have only alphabets");
    }

    if (!data.city) {
      return res.status(300).json("Please enter a city");
    }

    let findCity = await cityModel.findOne({ city });
    if (!findCity) {
      return res.status(300).json("Please Enter Existing city name");
    }

    const numbMobile = /[1-9]/;

    if(mobile){
        let checkMobile = numbMobile.test(data.mobile);
    if (!checkMobile) {
      return res.status(300).json(" mobile can have only numbers");
    }
    }

    if(media_url){
        const alphaUrl = /^(https:\/\/)/;

    let checkUrl = alphaUrl.test(data.media_url);
    if (!checkUrl) {
      return res.status(300).json(" url should start with https://");
    }
    }    

    let saveData = await userModel.create(data);
    let hideId = await userModel.findOne({saveData}).select({_id:0, createdAt : 0,  __v:0, updatedAt:0})
    return res.status(200).json(hideId);

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  try {

    let user = await userModel.find({});
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    let data = req.body;
    let { name, city, mobile, media_url } = data;

    let id = req.params.userId;
    console.log(id)
    if (!mongoose.isValidObjectId(id)) {
        return res.status(300).json("Please enter valid user id")
    }
    let findUser = await userModel.findById(id);
    
    if (!findUser) {
        return res.status(300).json("User not found")
    }

    let user = await userModel.updateOne({ data }, { $set: data });

    if (data.city) {
        let findCity = await cityModel.findOne({ city });
        if (!findCity) {
            return res.status(300).json("Please Enter Existing city name");
    }
    }

    return res.status(200).json({user : data});

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { adduser, getUser, updateUser };
