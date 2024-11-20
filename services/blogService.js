const Blog = require('../models/Blog');

exports.getBlogSearchService = async ({ category, search, page, limit }) => {
    const filter = {};

    if (category) {
        filter.category = category;
    }

    const pipeline = [];

    if (search) {
        pipeline.push({
            $search: {
                index: "title",
                autocomplete: {
                    query: search,
                    path: "title",
                    fuzzy: {
                        maxEdits: 2,
                        prefixLength: 0,
                        maxExpansions: 50
                    }
                }
            }
        });
    }

    if (Object.keys(filter).length > 0) {
        pipeline.push({ $match: filter });
    }

    pipeline.push(
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * parseInt(limit) },
        { $limit: parseInt(limit) }
    )

    const blogs = await Blog.aggregate(pipeline);

    return blogs;
}

exports.getBlogsService = async ({ category, search, page, limit }) => {
    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.title = { $regex: search, $options: 'i' };
    }

    const blogs = await Blog.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    return blogs;
}

exports.createBlogsService = async (req, res) => {
    const blogData = { ...req.body, authorId: req.user._id };

    const blog = new Blog(blogData);

    await blog.save();

    return blog;
}

exports.editBlogService = async (req, res) => {

    const { id } = req.params;
    const userId = req.user._id;
    const { title, content, category } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).send({ status: false, message: "Blog not found!" });
    }

    if (blog.authorId.toString() !== userId.toString()) {
        return res.status(403).send({ status: false, message: "You are not authorized to update this blog!" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    await blog.save();

    return blog;
}

exports.updateBlogService = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).send({ status: false, message: "Blog not found!" });
    }

    if (blog.authorId.toString() !== userId.toString()) {
        return res.status(403).send({ status: false, message: "You are not authorized to update this blog!" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
    );

    return updatedBlog;
}

exports.deleteBlogService = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).send({ status: false, message: "Blog not found!" });
    }

    if (blog.authorId.toString() !== userId.toString()) {
        return res.status(403).send({ status: false, message: "You are not authorized to update this blog!" });
    }

    await Blog.findByIdAndDelete(id);

    return blog;
}