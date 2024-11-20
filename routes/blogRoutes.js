const express = require('express');
const { createBlog, getBlogs, editBlog, deleteBlog, updateBlog, getBlogsSearch } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorization');
const router = express.Router();

router.post('/create', authMiddleware, authorizeRole('author'), createBlog);
router.get('/', getBlogs);
router.get('/getBlogsSearch', getBlogsSearch);
router.put('/:id', authMiddleware, authorizeRole('author'), editBlog);
router.delete('/:id', authMiddleware, authorizeRole('author'), deleteBlog);
router.patch('/updateBlog/:id', authMiddleware, authorizeRole('author'), updateBlog);

module.exports = router;