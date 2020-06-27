const Hospital = require('../models/Hospital');

exports.create = (req,res) =>{
    let user = req.user;
    let admin = 'admin@gmail.com';
    let [hospitalName, state, district, noOfBets, phone ]= [req.body.hospitalName, req.body.state, req.body.district, req.body.noOfBets, req.body.phone];
    if(user.email == admin){
        Hospital.findOne({hospitalName:req.body.hospitalName}).then(docs=>{
            if(docs) return res.status(400).json({ message: 'Hospital is already haven' });
            else{
                if(hospitalName !== null && hospitalName !== undefined){
                    if(state !== null && state !== undefined){
                        if(district !== null && district !== undefined){
                            if(noOfBets !== null && noOfBets !== undefined){
                                if(phone !== null && phone !== undefined){
                                    if(phone.length >=10 ){
                                        const hospital = new Hospital({
                                            hospitalName:hospitalName,
                                            state:state,
                                            district:district,
                                            noOfBets:noOfBets,
                                            phone:phone
                                        }).save().then(docs=>{
                                            return res.json(docs)
                                        }).catch(err=>{
                                            return res.status(400).json(err);
                                        })
                                    }
                                    else return res.status(400).json({ message: 'phone number must haven 10 digit to create' });
                                }
                                else return res.status(400).json({ message: 'phone must haven to create' });
                            }
                            else return res.status(400).json({ message: 'No Of Bets must hven to create' });
                        }
                        else return res.status(400).json({ message: 'District must haven to create' });
                    }
                    else return res.status(400).json({ message: 'state must haven to create' });
                }
                else return res.status(400).json({ message: 'Hospital name must haven to create' });
            }
        })
    }
    else return res.status(400).json({ message: 'You are Not an Admin' });
}

exports.update = (req,res)=>{
    let user = req.user;
    let admin = 'admin@gmail.com';
    let id = req.body.hospitalId;
    if(user.email == admin){
        Hospital.updateOne({_id:id},{$set:req.body}).then(docs=>{
            if(docs){
                Hospital.findById(id).then(docs=>{
                    return res.json({
                        message:'Update sucessfully',
                        Hospital:docs
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
        Hospital.findById(id).then(docs=>{
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
        Hospital.find({}).then(docs=>{
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
    let id = req.body.hospitalId;
    if(user.email = admin){
        Hospital.deleteOne({_id:id}).then(docs=>{
            return res.json({ message: 'Hospital Deleted sucessfully',status:docs });
        }).catch(err=>{
            return res.status(400).json(err);
        })
    }
}