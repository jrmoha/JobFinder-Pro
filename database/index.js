import mongoose from "mongoose";

const connect = async (uri) => {
  await mongoose
    .connect(uri)
    .then((_) => console.log("Connected to database"))
    .catch((err) => {
      console.log("Failed to connect to database");
      console.log(err);
    });
};

export { connect };
