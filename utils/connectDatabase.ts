import mongoose from "mongoose";

const MONGO_URI: any = process.env.MONGO_URI;

export const connectDatabase = async () => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
