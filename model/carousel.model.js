import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Carousel image URL is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

const CarouselModel = mongoose.model("Carousel", carouselSchema);

export default CarouselModel;