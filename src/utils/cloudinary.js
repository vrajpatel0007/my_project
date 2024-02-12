import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null
        //upload the file on cloudinary
        cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        //file has been uploaded successfull
        console.log("file has been uploaded successfull", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath) //remove the locally saved temporary file as the upload operation got fai led
        return null;
    }
}




export { uploadOnCloudinary }