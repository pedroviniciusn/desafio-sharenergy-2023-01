import mongoose, { Connection, ConnectOptions } from 'mongoose';

export async function connect(): Promise<Connection> {
  
  let url = process.env.NODE_ENV === "test" 
  ? "mongodb://localhost:27017/tests"
  : "mongodb://balta:e296cd9f@localhost:27017/admin";

  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
  ) 

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to database!")
  });

  db.on('error', console.error.bind(console, 'connection error: '));

  return db;
}