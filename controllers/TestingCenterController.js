const TestCenter = require('../models/TestingCenter');

exports.create =(req,res)=>{
    let user = req.user;
    let admin = 'admin@gmail.com';
    let [centerName, state, district, phone] = [req.body.centerName, req.body.state, req.body.district, req.body.phone];
    if(user.email == admin){
        TestCenter.findOne({centerName:centerName}).then(docs=>{
            if(docs) return res.status(400).json({ message: 'center is already haven' });
            else{
                if(centerName !== null && centerName !== undefined){
                    if(state !== null && state !== undefined){
                        if(district !== null && district !== undefined){
                            if(phone !== null && phone !== undefined){
                                if(phone.length >= 10){
                                    const center = new TestCenter({
                                        centerName:centerName,
                                        state:state,
                                        district:district,
                                        phone:phone
                                    }).save().then(docs=>{
                                        return res.json({
                                            message:'create successfully!',
                                            Center:docs
                                        });
                                    }).catch(err=>{
                                        return res.status(400).json(err);
                                    })
                                }
                                else return res.status(400).json({ message: 'phone number must haven 10 digit' });
                            }
                            else return res.status(400).json({ message: 'Phone must haven to create' });
                        }
                        else return res.status(400).json({ message: 'District must haven to create' });
                    }
                    else return res.status(400).json({ message: 'state must haven to create' });
                }
                else return res.status(400).json({ message: 'center name must haven to create' });
            }
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
    else return res.status(400).json({ message: 'You are not an admin' });
}

exports.update = (req,res)=>{
    let user = req.user;
    let admin = 'admin@gmail.com';
    let id = req.body.centerId;
    if(user.email == admin){
        TestCenter.updateOne({_id:id},{$set:req.body}).then(docs=>{
            if(docs){
                TestCenter.findById(id).then(docs=>{
                    return res.json({
                        message:'Update sucessfully',
                        Center:docs
                    });
                }).catch(err=>{
                    return res.status(400).json(err);
                })
            }
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
    else return res.status(400).json({ message: 'You are not an admin' });

}

exports.getOne = (req,res)=>{
    let user = req.user;
    let id = req.params.id;
    if(user){
        TestCenter.findById(id).then(docs=>{
            return res.json(docs);
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
    else return res.status(400).json({ message: 'Please login' });
}

exports.getAll = (req,res)=>{
    let user = req.user;
    if(user){
        TestCenter.find({}).then(docs=>{
            return res.json(docs);
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
    else return res.status(400).json({ message: 'Please login' });
}

exports.delete = (req,res)=>{
    let user = req.user;
    let admin = 'admin@gmail.com';
    let id =req.body.centerId;
    if(user.email = admin){
        TestCenter.deleteOne({_id:id}).then(docs=>{
            return res.json({ message: 'Testing Center Deleted sucessfully',status:docs });
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
}