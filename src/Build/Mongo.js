const mongoose = require("mongoose");
const { mongoPath } = require("../Configuration/config.json");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(mongoPath, dbOptions);

    mongoose.set("useFindAndModify", false);

    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("Connected into the Database!");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected of the Database!");
    });

    mongoose.connection.on("err", (err) => {
      console.log(
        "There has been an error trying to connect into the Database!"
      );
    });
  },
};
