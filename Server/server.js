const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

//*** FOR CONNECTING TO ONLINE DATABASE(ATLAS)
// const DB = process.env.DATABASE.replace(
//     "<PASSWORD>",
//     process.env.DATABASE_PASSWORD
// );

//**CONNECTED TO LOCAL DATABASE */
mongoose.connect(process.env.DATABASE_LOCAL, {
    // .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
// .then(() => {
// console.log("DB COnnected");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // console.log("app is running on port 8000");
});