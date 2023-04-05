import mongoose, { ConnectOptions } from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.NEXT_PUBLIC_MONGO_URL!,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
