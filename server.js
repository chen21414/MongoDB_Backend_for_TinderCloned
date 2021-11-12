import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors';

import Cards from './dbCards.js'

//App Config
const app = express();
const port = process.env.PORT || 8001; //port equals to processor environment or running on 8001
const connection_url = `mongodb+srv://admin:NMHrZ7GY8ppZSGsu@cluster0.bruva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//Middlewares
app.use(express.json())
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology: true,


    //useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.

});
//API Endpoints
app.get('/', (req, res)=>res.status(200).send('Hello')) //200 means ok

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data) //successful created
        }
    })
});

//will retrive everything from database we created
app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data) 
            
        }
    })
})

//Listener
app.listen(port, ()=> console.log(`listening on localhost: ${port}`))