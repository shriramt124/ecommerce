import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            ref: "user",
            required: true
        },
        orderItems: [
            {
                product: {
                    type: Schema.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity must be at least 1"]
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        shippingAddress: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            }
        },
        paymentInfo: {
            id: String,
            status: String,
            type: {
                type: String,
                enum: ["CARD", "COD"],
                default: "COD"
            }
        },
        itemsPrice: {
            type: Number,
            required: true,
            min: [0, "Items price cannot be negative"]
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0
        },
        totalPrice: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PENDING"
        },
        deliveredAt: Date,
        paidAt: Date
    },
    { timestamps: true }
);

// Calculate total price before saving
orderSchema.pre("save", function(next) {
    this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
    next();
});

const OrderModel = model("Order", orderSchema);
export default OrderModel;