const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config();

const app = express()

const authRouter = require("./routes/authRoutes")


const mongoString = process.env.DATABASE_CLOUD

mongoose.connect(mongoString, {useNewUrlParser: true})
    
mongoose.connection.on("error", function(error) {
      console.log(error)
})
    
mongoose.connection.on("open", function() {
      console.log("Connected to MongoDB database.")
 })    
app.use(morgan("dev"))

app.use(bodyParser());
app.use(cookieParser())
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }
app.use(cors());

app.use('/api', authRouter)


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
