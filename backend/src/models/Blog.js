import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String, // String representation of display date, e.g., "June 15, 2026"
    },
    author: {
      type: String,
      default: "Rudra Ji",
      trim: true,
    },
    readTime: {
      type: String, // e.g. "5 min read"
      trim: true,
    },
    imgUrl: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: [String], // Array of paragraphs
      required: true,
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
