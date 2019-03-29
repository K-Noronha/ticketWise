const router = require("express").Router(),
      db = require("../models"),
      Sequelize = require("sequelize"),
      Op = Sequelize.Op,
      multer = require("multer"),
      path = require("path");
let now;

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`);
    }
});

const uploadMiddleware = multer({ storage }).single('poster');

//gets todays date, corrects for UTC times 
function todayDate() {
    now = new Date();
    now.setUTCHours(0);
    now.setUTCMinutes(0);
    now.setUTCSeconds(0);
}

//gets all events from today onwards and orders them in asc
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

//gets all events today onwards of a category 
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

//gets the single corresponing event
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
            res.json(event)
        })
        .catch(err=>{
            res.status(500).json(err)
        })

})

//uploads the new event and takes care of the image upload
router.post("/new",uploadMiddleware, (req, res)=>{
    const data = req.body;
    data.poster = `http://localhost:8080/images/${req.file.filename}`;
    db.event.create(data)
        .then(saved=>{
            res.json(saved)  
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
})

module.exports = router;