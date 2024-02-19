import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res, next) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username , email
    // check for images ,check for avatar
    // upload them to cloudnary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const { fullName, email, userName, password } = req.body
    console.log(req.body);
    // if (
    //     [fullName, email, username, password].some(
    //         (field) => typeof field !== "string" || field.trim() === ""
    //     )
    // ) {
    //     throw new ApiError(400, "all fields are required");
    // }
    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "user with email or already exists")
    }

    const avatarLocalpath = req.files?.avatar[0]?.path
    const coverImageLocalpath = req.files?.coverImage[0]?.path

    if (!avatarLocalpath) {
        throw new ApiError(400, "Avatar fille is required")
    }

    const avatar = avatarLocalpath
    const coverImage = coverImageLocalpath

    if (!avatar) {
        throw new ApiError(400, "Avatar fille is required")
    }
    const user = await User.create({
        fullName,
        avatar: "public/temp/"+req.files.avatar[0].filename,
        coverImage: "public/temp/"+req.files.coverImage[0].filename,
        email,
        userName: req.body.userName,
        password
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refereshToken"
    )
    console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered Successfully")
    )
});

export {
    registerUser
}