
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = ()=>{
    // console.log(process.env.DB_URL);
    mongoose.connect(process.env.MONGODB_URI)
        .then((data)=>{
            console.log(`mongoDB connected with server : ${data.connection.host}`);
        })
        .catch((e)=>{
            console.log(e);
        })
}
//username - srijan26dec
//password - YkkHlIyDljOezLUa

module.exports = connectDB;
