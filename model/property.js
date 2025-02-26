import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
  },
  agentId: {
    type: String,
    required: true
},
    address: {
        type: String,
        required: true,
        unique: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      propertyType: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});



const Property = mongoose.model('Property', propertySchema);
export {Property};