const router = require("express").Router(),
      db = require("../models");

router.post("/buy", (req, res)=>{
    const data = req.body;

    db.tickets.count({
        where: {
            event_id : data.event_id
        }
    })
    .then(count=>{
        console.log(count)
    })



    //
    
    db.tickets.create(data)
        .then(saved=>{
            res.json(saved)
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

module.exports = router;