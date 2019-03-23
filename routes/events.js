const router = require("express").Router(),
      db = require("../models"),
      Sequelize = require("sequelize"),
      Op = Sequelize.Op,
      moment = require("moment");
let now;

function todayDate() {
    now = new Date();
    now.setUTCHours(0);
    now.setUTCMinutes(0);
    now.setUTCSeconds(0);
}


router.get("/all", (req,res)=>{
    todayDate();
    db.event.findAll(
        {
            where: {
               eDate: {
                    [Op.gte] : now
                } 
            },
            order: [["eDate", "ASC"]]
        }
    )
        .then(events => {
            res.json(events)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

router.get("/category/:categ", (req, res)=>{
    let category=req.params.categ;
    todayDate();
    db.event.findAll(
        {
            where: {
                eDate: {
                     [Op.gte] : now
                 },
                 category
             },
             order: [["eDate", "ASC"]]
            
        }
    )
        .then(events => {
            res.json(events)
        })
        .catch(err=>{
            res.status(500).json(err)
        })

})

router.get("/:id", (req, res)=>{
    let eventId=req.params.id;
    db.event.findOne(
        {
            where: {
               id: {
                    [Op.eq] : eventId
                } 
            }
        }
    )
        .then(event => {
            console.log(event)
            res.json(event)
        })
        .catch(err=>{
            res.status(500).json(err)
        })

})

router.post("/new", (req, res)=>{
    const data = req.body;

    db.event.create(data)
        .then(saved=>{
            res.json(saved)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;