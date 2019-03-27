const router = require("express").Router(),
      db = require("../models"),
      Sequelize = require("sequelize"),
      Op = Sequelize.Op;

router.post("/buy",async (req, res)=>{
    const data = req.body;
    const event_id = data.event_id;
    
    const count = await db.tickets.count({
        where: {
            event_id
        }
       
    })

    db.event.findOne({
    
        where: {
            id : event_id
        }
    })
    .then(event =>{
        console.log(">>>>"+event)
       if( event.numTickets > count ){
          db.tickets.create(data)
          .then(saved=>{
                res.json(saved)
            })
       } else res.send("false")
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.get("/all/:userId", (req, res)=>{
    const user_id = Number(req.params.userId);

    db.tickets.findAll({
        where: {
            user_id
        },
        include: [
            db.event, db.user
        ]
    })
        .then(alltickets=>{
            if (alltickets){
                res.json(alltickets)
            } else {
                res.send("no tickets!")
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;