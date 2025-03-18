import express from "express";
import bodyParser from "body-parser";
import { title } from "process";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

let posts = [];

let id = 0

app.get("/posts", (req, res) => {
    const query = req.query;
    if(!query) {
        res.status(200).json(posts);
    } else {
        res.send("error");
    }

});


app.post("/posts", (req, res) => {
    const newPost = {
        id: id++,
        title: req.body.title || "untitled", 
        content: req.body.content || "untitled",
        catogory: req.body.catogory || "untitled",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    posts.push(newPost);
    res.status(201).send("succesfully created a new post");
})


app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const findPost = posts.find((post) => post.id == id);
    if (!findPost) {
        res.send("this post could not be found!");
    }
    res.json(findPost);
})

app.put("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const findPost = posts.find((post) => post.id == id);
    const newPost = {
        id: findPost.id,
        title: req.body.title || findPost.title, 
        content: req.body.content || findPost.content,
        catogory: req.body.catogory || findPost.catogory,
        createdAt: findPost.createdAt,
        updatedAt: new Date(),
    }
    posts[findPost.id] = newPost; 
    res.send(newPost);

})

app.delete("/posts/:id", (req, res) => { 
    const id = parseInt(req.params.id);
    const findpostIndex = posts.findIndex((post) => post.id === id);
    posts.splice(findpostIndex, 1);
    res.status(201).send("succesfully deleted");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
