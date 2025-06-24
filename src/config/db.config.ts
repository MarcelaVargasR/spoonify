import { connect } from "mongoose";

const db = {
  connect: async () => {
    try {
      await connect(process.env.MONGODB_URL as string);
      console.log("MongoDB Atlas connected successfully!");
    } catch (err) {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    }
  },
};

export { db };
