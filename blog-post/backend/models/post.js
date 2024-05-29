const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
    validate: {
      validator: (value) => !/\s/.test(value),
      message: 'Spaces are not allowed before or after the text.',
    },
  },
  description: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
    validate: {
      validator: (value) => !/\s/.test(value),
      message: 'Spaces are not allowed before or after the text.',
    },
  },
  author: {
    type: String,
    required: true,
  },
  keyWords: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware de pré-validation Mongoose
postSchema.pre('validate', function (next) {
  // Mise à jour de la date de création
  this.createdAt = new Date();
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
