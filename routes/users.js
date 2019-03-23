const router = require("express").Router(),
      db = require("../models");


router.post("/new", (req, res)=>{
    const data = req.body;

    db.user.create(data)
        .then(saved=>{
            delete saved.dataValues.password;
            res.json(saved)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.post("/check", (req, res)=>{
    const {username, password} = {...req.body};

    db.user.findOne(
        {
            where: {
                username,
                password
            }
        }
    )
    .then(user=>{
        if (user){
            delete user.dataValues.password;
            res.json(user)
        } else {
            res.send(false)
        }    
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;