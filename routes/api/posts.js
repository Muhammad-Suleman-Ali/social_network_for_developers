const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// post model 
const Post = require('../../model/Post');
// profile model 
const Profile = require('../../model/Profile');

//post validator
const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//@desc  Tests Post route
//@access public

router.get('/test', (req , res)=> res.json({msg:"posts works"}) 
);
//@route GET api/posts
//@desc  get posts
//@access public
router.get('/', (req,res)=>{
    Post.find()
        .sort({date:-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json(err))

});
//@route GET api/posts/:id
//@desc  get post by id
//@access public
router.get('/:id', (req,res)=>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({error:"No post found with this id "}))

});



//@route POST api/posts
//@desc  Create posts
//@access private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
const {errors,isValid} = validatePostInput(req.body);

//check validation
if(!isValid){
    //if any errors send 400 with errors 
    res.status(400).json(errors);
}

    const newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id

    })
    newPost.save().then(post => res.json(post));
});
//@route Delete  api/posts/:id
//@desc  delete post 
//@access private
router.delete('/:id',passport.authenticate('jwt',{session:false}), (req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=> {
        Post.findById(req.params.id)
        .then(post => {
            //check for post owner
            console.log(post.user)
           
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({NotAuthorized:"User not authorized"})
            }
            //delete
            post.remove().then(()=> res.json({succes:true}))
        })
        .catch(err => res.status(404).json({postnotfound:"post not found"}))
    })
});
//@route POST api/posts/like/:id
//@desc  like post 
//@access private
router.post('/like/:id',passport.authenticate('jwt',{session:false}), (req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=> {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString()===req.user.id).length > 0){
                return res.status(400).json({alreadyliked:"user already liked this post"})
            }
            // add the user id to likes array
            post.likes.unshift({user:req.user.id });
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postnotfound:"post not found"}))
    })
});
//@route POST api/posts/unlike/:id
//@desc  unlike post 
//@access private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}), (req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=> {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString()===req.user.id).length === 0){
                return res.status(400).json({notliked:"You have not yet liked this post "})
            }
            // Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString)
                .indexOf(req.user.id)

            //splice out of array 
            post.likes.splice(removeIndex,1);

            //save 
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound:"post not found"}))
    })
});
//@route POST api/posts/comment/:id
//@desc  Add comment to  posts
//@access private
 router.post('/comment/:id', passport.authenticate('jwt',{session:false}), (req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);

    //check validation
    if(!isValid){
        //if any errors send 400 with errors 
        res.status(400).json(errors);
    }
    
     Post.findById(req.params.id)
     .then(post => {
         const newComment ={
             text:req.body.text,
             name:req.body.name,
             avatar:req.body.avatar,
             user:req.user.id
         }
         //Add to comments array 

         post.comment.unshift(newComment);
         //save now 
         post.save().then(post => res.json(post)); 
     })
     .catch(err => res.status(404).json({postnotfound:"No post found"}))
});
//@route Delete api/posts/comment/:id/:comment_id
//@desc  Remove comments from post
//@access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt',{session:false}), (req,res)=>{
  
     Post.findById(req.params.id)
     .then(post => {
        //check if the comment is exists
        if(post.comments.filter(comment => comment._id.toString()=== req.params.comment_id).length===0){
            return res.status(404).json({commentnotexists:"comment does not exists"})
        }
        // get remove index
        const removeIndex =post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
        // splice comment out of array 
        post.comment.splice(removeIndex,1);
        //save now
        post.save().then(post => res.json(post))
     })
     .catch(err => res.status(404).json({postnotfound:"No post found"}))
});


module.exports = router;