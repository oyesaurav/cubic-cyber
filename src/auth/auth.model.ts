import mongoose from "mongoose";

export const PStModel = new mongoose.Schema({
    name: {type: String, required: true},
    pstid: {type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: String,
    dist: String,
    block: String,
    pin: Number,
    stCode: String,
    head: String
})