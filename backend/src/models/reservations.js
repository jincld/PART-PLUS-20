import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    vehicle: { 
      type: String,
      required: true,  
    },
    service: {
      type: String,
      required: true,  
    },
    status: {
      type: String,
      required: true,  
    },
  },
  {
    timestamps: true,  
    strict: true,  
  }
);

export default model("clients", clientsSchema);