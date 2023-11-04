const mongoose= require ('mongoose');
mongoose.connect(process.env.mongo_url)

const db = mongoose.connection;

db.on('connected', ()=> {console.log("mongodb connection succesful");
});
db.on("error",() =>
{
    console.log("mongodb connection failed");
});