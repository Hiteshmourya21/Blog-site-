 //jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/BlogDB');

var _ = require('lodash')
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "I am Hitesh Mourya.Student of Acropolis Institute of Technology and research.This is My blog site made by node.js express and mongodb .This site contains all my blogs and my learning throughout my learning stage.On my blog site, I aim to create a space that feels like a cozy corner of the internet, where visitors can immerse themselves in a world of diverse topics and engaging content. From travel adventures to culinary explorations, I share my experiences and insights, hoping to inspire others to embark on their own journeys. Through vivid storytelling and captivating visuals, I strive to make every post a captivating read. Whether it's a review of the latest gadgets or a reflection on life's lessons, my blog is a reflection of my passion for sharing stories and connecting with others in a meaningful way.";
const aboutContent = "I am Hitesh Mourya.Student of Acropolis Institute of Technology and research currently pursuing the B-tech course in Computer Science And Technology.As a BTech student, my experience has been a whirlwind of learning and growth. From the intricate theories of electrical engineering to the practical applications in labs, every day is a new challenge. Balancing academics with extracurricular activities has taught me time management and teamwork. The late-night study sessions and group projects have honed my problem-solving skills and patience. Through internships, I've gained real-world insights, understanding the industry's demands. Networking with professionals and peers has broadened my perspectives. Overall, the journey of a BTech student is not just about earning a degree; it's about transforming into a skilled professional ready to tackle the challenges of tomorrow.";
const contactContent = "If you have any questions, suggestions, or just want to say hello, feel free to reach out to us using the contact form below. We value your feedback and are always looking for ways to improve your experience on our blog.";


const blogSchema={
  title : String,
  content : String
}

const Blog = mongoose.model("Blog",blogSchema)

const blog1 = new Blog({
  title : "Test",
  content : "This is the deafault data in DB"
})

//blog1.save()

app.get("/",function(req,res){
  Blog.find().then(foundBlog=>{
    res.render("home",{homeContent:homeStartingContent,Posts:foundBlog});
  }).catch(err=>{
    console.log(err);
  })
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent})
})

app.get("/compose",function(req,res){
  res.render("compose")
})

app.post("/compose",function(req,res){
    const postTitle = req.body.postTitle
    const postBody = req.body.postBody

  const blog = new Blog({
    title : postTitle,
    content : postBody
  })
    blog.save();
    res.redirect("/")
})

app.get("/posts/:postId",function(req,res){
  const reqId = req.params.postId;
  Blog.findById(reqId).then(foundpost=>{
    res.render("post",{title:foundpost.title,body:foundpost.content})
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
