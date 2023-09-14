const express = require('express');
const router = express.Router();
const Article = require("../models/Article");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

//Router 1: fetch all articles using: GET "/api/articles/fetchallarticles"
router.get('/fetchallarticles', async (req, res) => {
    try {
        const articles = await Article.find({});
        res.json(articles);
    } catch (error) {
        // catch error
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Router 2: fetch all articles using: GET "/api/articles/fetchallarticles"
router.get('/fetchownarticles', fetchuser, async (req, res) => {
    try {
        const articles = await Article.find({ user: req.user.id });
        res.json(articles);
    } catch (error) {
        // catch error
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Router 3: add article using: POST "/api/articles/addarticle"
router.post(
    "/addarticle",
    fetchuser,
    [
        body("title", "enter valid title").isLength({ min: 3 }),
        body("description", "Enter valid desc").isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const article = new Article({
                title,
                description,
                tag,
                user: req.user.id,
                name: req.user.name,
            });
            success = true;
            const savedArticle = await article.save();
            res.json({ success, savedArticle });
        } catch (error) {
            console.error(error.massage);
            res.status(500).send("errror occured");
        }
    }
);

//Router 4: update article using: PATCH "/api/articles/updatearticle/:id"
router.patch(
    "/updatearticle/:id",
    fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            let success = true;
            let newArticle = {};
            if (title) { newArticle.title = title; }
            if (tag) { newArticle.tag = tag; }
            if (description) { newArticle.description = description; }
            let article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).send("not found");
            }
            if (article.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");
            }
            article = await Article.findByIdAndUpdate(req.params.id, { $set: newArticle }, { new: true });
            res.json({ success, article });
        } catch (error) {
            console.error(error.massage);
            res.status(500).send("errror occured");
        }
    }
);

//Router 5: delete article using: DELETE "/api/articles/deletearticle/:id"
router.delete(
    "/deletearticle/:id",
    fetchuser,
    async (req, res) => {
        try {
            let article = await Article.findById(req.params.id);
            let success = true;
            if (!article) {
                return res.status(404).send("not found");
            }
            if (article.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");
            }
            article = await Article.findByIdAndDelete(req.params.id);
            res.json({ success, article: article });
        } catch (error) {
            console.error(error.massage);
            res.status(500).send("errror occured");
        }
    }
);
module.exports = router;