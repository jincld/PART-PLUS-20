import { Schema, model } from "mongoose";

const reservationsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    email: { 
      type: String,
      required: true,  
    },
    password: {
      type: String,
      required: true,  
    },
    phone: {
      type: String,
      required: true,  
    },
    age: {
      type: Number,
      required: true,  
    },
  },
  {
    timestamps: true,  
    strict: true,  
  }
);

export default model("reservations", reservationsSchema);