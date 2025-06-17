import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!

if (!MONGODB_URL)
{
    throw new Error ("please define mono_url in env variable");
}

let cashed = global.mongoose

if(!cashed){
    cashed = global.mongoose = {connection : null , promise : null}
}

export async function connectToDatabase(){
    if(cashed.connection){
        return cashed.connection
    }

    if(!cashed.promise){
        const opts = {
            bufferCommands : true,
            maxPoolSize : 10
        }
        mongoose.connect(MONGODB_URL,opts).then(() => mongoose.connection)
    }

    try {
        cashed.connection = await cashed.promise

    }catch (error){
       cashed.promise = null 
       throw error  
    }
}   