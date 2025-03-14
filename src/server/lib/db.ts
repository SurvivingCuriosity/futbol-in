import mongoose from 'mongoose';  
  
const MONGODB_URI = process.env.MONGODB_URI;  
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};  

async function connectDb() {  
    if (!MONGODB_URI) {  
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');  
    }  
    if (cached.connection) {  
        return cached.connection;  
    }  
    if (!cached.promise) {  
        const opts = {  
            bufferCommands: false,  
        };  
        cached.promise = mongoose.connect(MONGODB_URI, opts);  
    }  
    try {  
        cached.connection = await cached.promise;  
    } catch (e) {  
        cached.promise = undefined;  
        throw e;  
    }  
    return cached.connection;  
}  
export default connectDb;
