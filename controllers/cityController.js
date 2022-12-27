const cityModel = require ("../models/cityModel")

const addCity = async (req, res) => {
    try {
        let data = req.body;
        let {city} = data

        if (!city) {
            return res.status(300).json("Please enter city name");
          }
      
          const alphaCity = /^[a-zA-Z]+$/;
      
          let checkCity = alphaCity.test(city);
          if (!checkCity) {
            return res.status(300).json("City name can have only alphabets");
          }
    
        let findCity = await cityModel.findOne({ city });
        if (findCity) {
          return res.status(300).json("Please Enter Existing city name");
        }
    
        let saveData = await cityModel.create(data);
        return res.status(200).json(saveData);
    
      } catch (error) {
        return res.status(500).json(error.message);
      }
}

const getCity = async (req, res) => {
    try {
        let city = await cityModel.find({});
        return res.status(200).json(city);
      } catch (error) {
        return res.status(500).json(error.message);
      }
}

module.exports = {addCity, getCity}