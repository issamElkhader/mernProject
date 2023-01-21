import mongoose from "mongoose";

export const connectDB = async (CONNECTION_URL) => {
    mongoose.set("strictQuery" , false)
    await mongoose.connect(CONNECTION_URL)
        .then((res) => {
            console.log(`MongoDB Connected - port ${res.connection.port}   - host ${res.connection.host .cyan.underline}`)
        })
        .catch((error) => {
            console.log(error.message)
            process.exit(1)
        })
}