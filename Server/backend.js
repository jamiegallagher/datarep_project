const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Instantiating the directory for the build files
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// Body parser would not work in this scenario so I looked up a method for older Express versions
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Connecting the cluster from mongoDB onto our server and generating a model using a Schema
const myConnectionString = 'mongodb+srv://admin:Notimetodie007@cluster0.xotpg.mongodb.net/videogames?retryWrites=true&w=majority'
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const MongoSchema = mongoose.Schema;

var gameSchema = new MongoSchema({
    name: String,
    release: String,
    cover: String
});

var GameData = mongoose.model("game", gameSchema);
//Creating a new webpage taking in the json data created in week 4 and populating it back out from the back end to the front end
app.get('/api/videogames', (req, res) => {
    // const myGames = [
    //     {
    //         "Name": "Red Dead Redemption 2",
    //         "Release": "2018",
    //         "Type": "videogame",
    //         "Cover": "https://lh3.googleusercontent.com/HCUkD69MAHEOj84Yi7Kb5vxHpCePTsmQI4g9vYuVPUo-87cWE6ZZIk0tiyYzaiS9zaAFMTXRNYJaaRczRN-yQYw"
    //       },
    //       {
    //         "Name": "Marvel's Spider-Man",
    //         "Release": "2018",
    //         "Type": "videogame",
    //         "Cover": "https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png"
    //       },
    //       {
    //         "Name": "Far Cry 6",
    //         "Release": "2021",
    //         "Type": "videogame",
    //         "Cover": "https://image.api.playstation.com/vulcan/img/rnd/202106/1514/xqoTYwf0S55ro6fwcIIY1KI4.png"
    //       }
    // ];

    // res.status(200).json({
    //    message: "Everything is ok",
    //    videogames: myGames});

    GameData.find((err, data) => {
        res.json(data);
    })
})

//res.status(200).json({
//  message: "Everything is ok",
// videogames:myGames});
//}
//)
app.get('/api/videogames/:id', (req, res) => {
    console.log(req.params.id);

    GameData.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

 app.put('/api/videogames/:id', (req, res) => {
     console.log("Update game: " + req.params.id);
     console.log(req.body);

     GameData.findByIdAndUpdate(req.params.id, req.body, { new: true },
         (err, data) => {
             res.send(data);
         })
 })

// //Method to listen out for an id to delete information from the database
app.delete('/api/videogames/:id', (req, res) => {
    console.log("Delete Game: " + req.params.id);

    GameData.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})
app.post('/api/videogames', (req, res) => {
    console.log('Video Game Recieved!');
    console.log(req.body.name);
    console.log(req.body.release);
    console.log(req.body.cover);
    //Sending the items from the create section of the application into the database depending on user input
    GameData.create({
        name: req.body.name,
        release: req.body.release,
        cover: req.body.cover
    })
    res.send('Game Added');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})