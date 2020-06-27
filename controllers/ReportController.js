const Report = require('../models/TestYourSelf');
const User = require('../models/User');

exports.create = (req,res) =>{
    let user = req.user;
    let symptoms = req.body.symptoms;
    if(user){
        if(symptoms !== null && symptoms !== undefined){
            User.findOne({email:user.email}).then(docs=>{
                console.log(docs);
                const report = new Report({
                    name:docs.name,
                    email:docs.email,
                    phone:docs.phone,
                    address:docs.address,
                    symptoms:symptoms
                }).save().then(docs=>{
                    return res.json({ message: 'create succesfully!',report :docs});
                }).catch(err=>{
                    return res.status(400).json(err);
                })
            }).catch(err=>{
                return res.status(400).json(err);
            })
        }
        else return res.status(400).json({ message: 'Symptoms must haven to create' });
    }
}

exports.update = (req,res)=>{
    let user = req.user;
    if(user){
        Report.updateOne({user:user.id},{$push:{symptoms:req.body.symptoms}}).then(docs=>{
            if(docs){
                Report.findOne({user:user.id}).then(docs=>{
                    return res.json(docs);
                }).catch(err=>{
                    return res.status(400).json(err);
                })
            }
            else return res.status(400).json({ message: "Didn't Update" });
        })
    }
}

exports.getOne = (req,res)=>{
    let user = req.user;
    let id = req.params.id;
    if(user){
        Report.findById(id).then(docs=>{
            return res.json(docs);
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
    else return res.status(400).json({ message: 'Please Login' });
}

exports.getAll = (req,res) =>{
    let user = req.user;
    let admin = 'admin@gmail.com';
    if(user.email == admin){
        Report.find({}).then(docs=>{
            return res.json(docs);
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
    else return res.status(400).json({ message: 'Please Login' });
}