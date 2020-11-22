const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const passport = require('passport');

// load validation for experience

const validateExperienceInput = require('../../validation/experience')

// load validation for education

const validateEducationInput = require('../../validation/education')

// Load Validation
const validateProfileInput = require('../../validation/profile');  


// Load Profile Model
const Profile = require ('../../model/Profile')
// Load User  Model
const User = require('../../model/User') 




//@route GET api/profile/test
//@desc  Tests profile route
//@access public

router.get('/test', (req , res)=> res.json({msg: "profile works"}) 
);

//@route GET api/profile
//@desc  getting current user Profile
//@access private
router.get('/',passport.authenticate('jwt',{session:false}),(req, res)=>{
    const errors = {};
    Profile.findOne({user:req.user.id})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile= "There is no profile for this User";
            return res.status(404).json(errors)
        }
           res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
//@route   GET /api/profile/all
//@desc    Get  all profile
//@access  public
router.get('/all', (req,res)=>{
    const errors ={};
Profile.find().populate('user',['name','avatar'])
.then(profiles => {
    errors.noprofile='There are no profiles';
    if(!profiles ){
        res.status(404).json(errors)
    }
    res.json(profiles);
}).catch(err => res.status(404).json({profiles: 'There are no profiles '}));
})





//@route   GET /api/profile/handle/:handle
//@desc    Get profile by handle
//@access  public
router.get('/handle/:handle', (req,res)=>{
    const errors={};
Profile.findOne({handle:req.params.handle})
.populate('user', ['name', 'avatar'])
.then(profile => {
    if(!profile){
        errors.noprofile= 'There is no profile for this user';
        res.status(404).json(errors)
    }
    res.json(profile);
})
.catch(err => res.status(404).json(err));
} );

//@route   GET /api/profile/user/:user_id
//@desc    Get profile by user id
//@access  public
router.get('/user/:user_id', (req,res)=>{
    const errors={};
Profile.findOne({user:req.params.user_id})
.populate('user', ['name', 'avatar'])
.then(profile => {
    if(!profile){
        errors.noprofile= 'There is no profile for this user';
        res.status(404).json(errors)
    }
    res.json(profile);
})
.catch(err => res.status(404).json({profile:'There is no profile for this user'}));
} );



//@route   post api/profile
//@desc    Create or Edit User profile
//@access  private
router.post('/',passport.authenticate('jwt',{session:false}),(req, res)=>{
   const {errors,isValid} = validateProfileInput(req.body);
   //check validation 
   if(!isValid){
       // return any error with 400 errors
       return res.status(400).json(errors);
   } 


    // Get fields 
    const profileFields = {}; 
    profileFields.user = req.user.id;
    if(req.body.handle)         profileFields.handle = req.body.handle;
    if(req.body.company)        profileFields.company = req.body.company;
    if(req.body.website)        profileFields.website = req.body.website;

    if(req.body.location)       profileFields.location = req.body.location;
    if(req.body.bio)            profileFields.bio = req.body.bio;
    if(req.body.status)         profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    //skills  split it into array 

    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }
    // social links
    profileFields.social ={};
    if(req.body.youtube)   profileFields.social.youtube = req.body.youtube;
    if(req.body.facebook)  profileFields.social.facebook = req.body.facebook;
    if(req.body.twitter)   profileFields.social.twitter= req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.linkedin)  profileFields.social.linkedin = req.body.linkedin;
    Profile.findOne({user:req.user.id})
        .then(profile =>{
            if(profile){
                //update
                Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields }, {new:true})
                .then(profile => res.json(profile));
                
                
            }else{
                //create
                
                // check if handle exists
                Profile.findOne({handle:profileFields.handle})
                .then(profile => {
                    if(profile){
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }
                    //save profile
                    new Profile(profileFields).save().then(profile => res.json(profile))
                })
            }
        });
      


}); 
//@route   post /api/profile/experience
//@desc    Add experience to profile
//@access  private
router.post('/experience', passport.authenticate('jwt',{session:false}), (req, res)=>{
    const {errors,isValid} = validateExperienceInput(req.body);
   //check validation 
   if(!isValid){
       // return any error with 400 errors
       return res.status(400).json(errors);
   } 
Profile.findOne({user:req.user.id})
    .then(profile => {
        const newExp ={
            title:       req.body.title,
            company:     req.body.company,
            location:    req.body.location,
            from :       req.body.from,
            to:          req.body.to,
            current:     req.body.current,
            description: req.body.description
        }
        // Add to experience array
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile))
    });
    
});
//@route   post /api/profile/education
//@desc    Add education to profile
//@access  private
router.post('/education', passport.authenticate('jwt',{session:false}), (req, res)=>{
    const {errors,isValid} = validateEducationInput(req.body);
   //check validation 
   if(!isValid){
       // return any error with 400 errors
       return res.status(400).json(errors);
   } 
Profile.findOne({user:req.user.id})
    .then(profile => {
        const newEdu ={
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy,
            from : req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        // Add to education array
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile))
    })
});
//@route   delate /api/profile/experience/:exp_id 
//@desc    Delete experience from profile
//@access  private
router.delete('/experience/:exp_id', passport.authenticate('jwt',{session:false}), (req, res)=>{
   
Profile.findOne({user:req.user.id})
    .then(profile => {
   //get remove index   
   const removeIndex = profile.experience
    .map(item => item.id)
        .indexOf(req.params.exp_id);


        //splice out of array
        profile.experience.splice(removeIndex,1);
        
        // save        
        profile.save().then(profile => res.json(profile));
    }) 
    .catch(err => res.status(404).json(err));
});
//@route   delate /api/profile/education/:edu_id 
//@desc    Delete education from profile
//@access  private
router.delete('/education/:edu_id', passport.authenticate('jwt',{session:false}), (req, res)=>{
   
    Profile.findOne({user:req.user.id})
        .then(profile => {
       //get remove index   
       const removeIndex = profile.education
        .map(item => item.id)
            .indexOf(req.params.edu_id);
    
    
            //splice out of array
            profile.education.splice(removeIndex,1);
            
            // save        
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    });
//@route   delete /api/profile 
//@desc    Delete user and profile
//@access  private
router.delete('/', passport.authenticate('jwt',{session:false}), (req, res)=>{
   Profile.findOneAndRemove({user:req.user.id})
   .then(()=>{
       User.findOneAndRemove({_id: req.user.id})
       .then(()=>res.json({success:true, user: 'User deleted'}))
        
   })
    });

module.exports = router;