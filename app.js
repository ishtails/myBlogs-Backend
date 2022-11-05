const mongoose = require('mongoose');
const express = require('express');
const morgan = require("morgan");
const app = express();
const Blog = require('./models/blog')

//MongoDB
const dbURI = 'mongodb+srv://ishtails:ishtails123@styles.1714pc8.mongodb.net/myBlog?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=>{
        const server = app.listen(3000);
    })
    .catch((err)=>{console.log(err)});

//Express
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { heading: 'Home', blogs: result});
        })
        .catch((err) => {console.log(err)});
})

app.get('/about', (req, res) => {
    res.render('about' , { heading: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create' , { heading: 'Create Blog'});
});

app.use((req, res)=>{
    res.status(404).render('404' , { heading: 'Page Not Found'});
});