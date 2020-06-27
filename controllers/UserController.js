const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");

const secret = process.env.SECRET || 'secret';

exports.register = (req,res)=>{
    if(req.body.email !== null && req.body.email !== undefined){
        User.findOne({email:req.body.email}).then(docs=>{
            if(docs){
                res.status(404).json({
                    message:'Email is already Used'
                })
            }
            else{
                User.findOne({email:req.body.email}).then(user=>{
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(!user){
                            if(req.body.email !== null){
                                if(req.body.password !== null){
                                    const user = new User({
                                        name:req.body.name,
                                        email:req.body.email,
                                        password:hash
                                    }).save()
                                    .then(docs=>{
                                        return res.json(docs);
                                    }).catch(err=>{
                                        return res.json(err);
                                    })
                                }
                                else{
                                    return res.status(400).json({ message: 'password must import to register' });
                                }
                            }
                            else{
                                res.json({
                                    message:'Email must import to register'
                                })
                            }
                        }
                    })
                }).catch(err=>{
                    return res.json(err);
                })
            }
        }).catch(err=>{
            return res.json(err)
        })
    }else{
        User.findOne({username:req.body.username}).then(docs=>{
            if(docs){
                res.status(404).json({
                    message:'username is already Used'
                })
            }
            else{
                User.findOne({username:req.body.username}).then(user=>{
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(!user){
                            if(req.body.username !== null){
                                if(req.body.password !== null){
                                    const user = new User({
                                        username:req.body.username,
                                        password:hash
                                    }).save()
                                    .then(docs=>{
                                        return res.json(docs);
                                    }).catch(err=>{
                                        return res.json(err);
                                    })
                                }
                                else{
                                    return res.status(400).json({ message: 'password must import to register' });
                                }
                            }
                            else{
                                res.json({
                                    message:'user name must import to register'
                                })
                            }
                        }
                    })
                }).catch(err=>{
                    return res.json(err);
                })
            }
        }).catch(err=>{
            return res.json(err)
        })
    }
}

exports.login = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    if(email !== null && email !== undefined){
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(400).json({ message: 'Invalid User' });
        }
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(isMatch){
                const payload = {
                    id:user._id,
                    email:user.email
                };
                jwt.sign(payload,secret,{ expiresIn : 36000},
                    (err,token)=>{
                        if(err) return res.status(400).json({ error:"Error siging token",raw:err });
                        else return res.json({ success: true, token: `Bearer ${token}` });
                    })
            }
            else{
                return res.status(400).json({ message: 'Incorrect password' });
            }
        })
    })
    .catch(err=>{
        return res.status(400).json(err);
    })
    }else{
        return res.status(400).json({ message: 'Invalid Email' });
    }
}

exports.profile = (req,res)=>{
    let user = req.user;
    User.findOne({email:user.email}).then(docs=>{
        if(docs){
            User.updateOne({email:user.email},{$set:req.body}).then(docs=>{
                if(docs){
                    User.findOne({email:user.email}).then(docs=>{
                        return res.json(docs)
                    }).catch(err=>{
                        return res.status(400).json(err)
                    })
                }
            }).catch(err=>{
                return res.status(400).json(err);
            })
        }
    }).catch(err=>{
        return res.status(400).json(err);
    })
}

exports.get = (req,res)=>{
    let user = req.user;
    User.findOne({email:user.email}).then(docs=>{
        return res.json(docs);
    }).catch(err=>{
        return res.status(400).json(err);
    })
}