import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';

// @desc    Get all blog posts (published or all for admin)
// @route   GET /api/v1/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const query = isAdmin ? {} : { isPublished: true };
  const blogs = await Blog.find(query).sort({ createdAt: -1 });
  res.json(blogs);
});

// @desc    Get single blog post by ID
// @route   GET /api/v1/blogs/:id
// @access  Public
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Create a new blog post
// @route   POST /api/v1/blogs
// @access  Private (Admin)
export const createBlog = asyncHandler(async (req, res) => {
  const { title, category, date, author, readTime, imgUrl, summary, content, isPublished } = req.body;

  const blog = new Blog({
    title,
    category,
    date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: author || "Rudra Ji",
    readTime: readTime || "5 min read",
    imgUrl,
    summary,
    content,
    isPublished: isPublished !== undefined ? isPublished : true,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog post
// @route   PUT /api/v1/blogs/:id
// @access  Private (Admin)
export const updateBlog = asyncHandler(async (req, res) => {
  const { title, category, date, author, readTime, imgUrl, summary, content, isPublished } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title !== undefined ? title : blog.title;
    blog.category = category !== undefined ? category : blog.category;
    blog.date = date !== undefined ? date : blog.date;
    blog.author = author !== undefined ? author : blog.author;
    blog.readTime = readTime !== undefined ? readTime : blog.readTime;
    blog.imgUrl = imgUrl !== undefined ? imgUrl : blog.imgUrl;
    blog.summary = summary !== undefined ? summary : blog.summary;
    blog.content = content !== undefined ? content : blog.content;
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/v1/blogs/:id
// @access  Private (Admin)
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog post removed successfully' });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});
