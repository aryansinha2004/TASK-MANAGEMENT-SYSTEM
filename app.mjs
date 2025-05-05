import bodyParser from "body-parser";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import multer from 'multer';

import adminRoute from "./routes/admin.mjs";
import authRoute from "./routes/auth.mjs";
import clientRoute from "./routes/client.mjs";
import errorRoute from "./routes/error.mjs";

import Member from "./models/member.mjs";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanagement";
const PORT = process.env.PORT || 3000;

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join("data","images"))
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});
const fileFilter = (requset, file, callback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') callback(null, true);
    else callback(null, false);
}

const app = express();
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: "sessions",
})

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(path.resolve(),"public")));
app.use('/data/images', express.static(path.join(path.resolve(),"data", "images")));

app.use(session({
    secret: 'Some_Encrytped_Text', 
    resave: false, 
    saveUninitialized: false, 
    store: store,
}));

app.use((request, respond, next) => {
    if(!request.session.admin) return next();
    Member.findById(request.session.admin._id)
    .then(admin => {
        request.admin = admin;
        next();
    })
    .catch(e => console.log(e));
});
app.use((request, respond, next) => {
    respond.locals.isAuthenticated = request.session.isAuthenticated;
    respond.locals.admin = request.admin;
    next();
})
app.use("/admin", adminRoute);
app.use(authRoute);
app.use(errorRoute);

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database Connected !");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(e => console.log(e));
