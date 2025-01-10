/**
 * This will be the starting file of the projecrt
 * (File runed and project started)
 */

const express = require("express")
const mongoose = require("mongoose")  /**For MOngoDB connection */
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())            //middleware i.e. Json->JSObj

/**
 * Create an admin user at the starting of the application 
 * if not already present 
 */

//Connection with mongoDb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection
db.on("error", ()=>{
    console.log('error while connecting to the mongoDB')
})

db.once("open", ()=>{
    console.log("Connected to mongoDB")
    init()
})

async function init()
{
    try{
        let user = await user_model.findOne({userId : "admin"})

        if(user){
        console.log("Admin is already is present")
        return
        }

    }catch{
        console.log("Error while reading the data",err)
    }
    

    try{
        user = await user_model.create({
            name : "Varsha",
            userId : "admin",
            email : "yadavvarsha0012@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome1",8)
        })

        console.log("Admin Created", user)

    }catch(err){
        console.log("Error while create admin", err)
    }
}

/**
 * Stich the router to server
 */
require("./routes/auth.routes")(app)

/**
 * Start the server
 */

app.listen(server_config.PORT, ()=>{
    console.log("Server started at Port number : ", server_config.PORT)
})

