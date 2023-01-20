import mongoose, { Connection, ConnectOptions } from 'mongoose';

export async function connect(): Promise<Connection> {

  let url = process.env.NODE_ENV === "test" 
  ? process.env.MONGODB_URI_TESTS
  : process.env.MONGODB_URI;
  
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