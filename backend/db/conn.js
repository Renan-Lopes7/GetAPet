const mongoose = require("mongoose");

const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/SiteDePets');
    // console.log("conectamos");

}
main().catch((erro) => {
    console.log(erro);
});

module.exports = main;