import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'News Title is required'],
    minlength: [3, 'News must be at least 3 characters long'],
    maxlength: [100, 'News Title cannot exceed 100 characters'],
    trim: true,
  },
  newsBody: {
    type: String,
    required: [true, 'News Body is required'],
    minlength: [10, 'News body must be at least 10 characters long'],
    maxlength: [5000, 'News body cannot exceed 5000 characters'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  images: [{
    url: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    caption: {
      type: String,
      maxlength: [200, 'Caption cannot exceed 200 characters'],
      trim: true,
    }
  }],
  categories: {
    type: [String],
    required: [true, 'At least one category is required'],
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'At least one category is required',
    },
  },
  tags: {
    type: [String],
    validate: {
      validator: function(array) {
        return array.length <= 10;
      },
      message: 'You can provide up to 10 tags only',
    },
  },
  views: {
    type: Number,
    default: 0,
  },
});

const News = model('News', newsSchema);

export default News;
