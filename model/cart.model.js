import { Schema, model } from 'mongoose';
import mongoose from "mongoose"
const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    cartItem: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
        totalProductDiscount: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  {
    timestamps: true,
  }
);

const cartModel = model('cart', cartSchema);
export default cartModel;