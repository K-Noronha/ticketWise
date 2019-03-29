const router = require("express").Router(),
      db = require("../models"),
      Sequelize = require("sequelize"),
      Op = Sequelize.Op;

//adds a ticket to the user for the event
router.post("/buy",async (req, res)=>{
    const data = req.body;
    const event_id = data.event_id;
    //counts how many tickets have been purchased for the event
    const count = await db.tickets.count({
        where: {
            event_id
        }     
    })
    //finds the corresponding event to check the number of tickets available 
    db.event.findOne({
        where: {
            id : event_id
        }
    })
    .then(event =>{
        //creates a ticket if there are tickets available
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

//finds all the tickets for the user
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