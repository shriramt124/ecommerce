import { v2 as cloudinary } from 'cloudinary';
 
console.log(process.env.CLOUDINARY_CLOUD_NAME)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file) => {
    try {
        console.log(file,"it is running")
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'products',
            use_filename: true
        });
        return result.secure_url;
    } catch (error) {
        throw new Error('Error uploading to Cloudinary: ' + error.message);
    }
};

export default cloudinary;