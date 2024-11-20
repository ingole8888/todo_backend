const { getBlogSearchService, getBlogsService, createBlogsService, editBlogService, updateBlogService, deleteBlogService } = require('../services/blogService');

exports.createBlog = async (req, res) => {
    try {
        const blog = await createBlogsService(req, res);
        res.status(201).send({ status: true, message: "Blog created successfully!", data: blog });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const blogs = await getBlogsService({ category, search, page, limit })
        res.status(200).send({
            status: true,
            totalblogs: blogs.length,
            currentPage: page,
            totalPages: Math.ceil(blogs.length / limit),
            data: blogs,
        })
    } catch (error) {

    }
}

exports.getBlogsSearch = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const blogs = await getBlogSearchService({ category, search, page, limit })
        res.status(200).send({
            status: true,
            totalblogs: blogs.length,
            currentPage: page,
            totalPages: Math.ceil(blogs.length / limit),
            data: blogs,
        })
    } catch (error) {
        res.status(500).send({ status: true, message: error.message });
    }
}

exports.editBlog = async (req, res) => {
    try {
        const blog = await editBlogService(req, res);
        res.status(200).send({ status: true, message: "Blog updated successfully!", data: blog });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await updateBlogService(req, res)
        res.status(200).send({ status: true, message: "Blog updated successfully!", data: updatedBlog });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await deleteBlogService(req, res);
        res.status(200).send({ status: true, message: `${blog._id} Blog deleted successfully!` });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}
