  const express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        cors = require("cors"),
        PORT = 8080,
        users = require("./routes/users"),
        events = require("./routes/events"),
        tickets = require("./routes/tickets"),
        Sequelize = require("sequelize");
        sequelize = new Sequelize("ticketWise_db", "root", "root",
                      {dialect: "mysql", host:"localhost"})
                        
// const db = require("./models");

app.use('/images', express.static('uploads'));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/events", events);

app.use("/users", users);

app.use("/ticket", tickets);

app.listen(PORT, ()=>{
    console.log(`server is listening on PORT ${PORT}`)
});
