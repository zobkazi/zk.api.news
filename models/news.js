import {Schema, model} from "mongoose"



const newsSchema = new Schema({
    title: {
        type: String,
    required: [true, 'News Title is required'],
    minlength: [3, 'News must be at least 3 characters long'],
    maxlength: [30, 'News cannot exceed 30 characters'],
    trim: true, 
    }
})

