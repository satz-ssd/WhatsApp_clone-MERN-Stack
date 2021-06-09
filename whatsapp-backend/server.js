//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

//app config
const app= express()
const port=process.env.PORT || 9000

// pusher config 
const pusher = new Pusher({
    appId: "1191569",
    key: "da29a737ebebcfce0cd2",
    secret: "c1b8e55083190ecbd874",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());

app.use(cors());

// db config
const connection_url='mongodb+srv://admin:rSd8bNY3cu5WRZvw@cluster0.gb6yt.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;

db.once('open',()=>{
    console.log('db connected');

    const msgCollection = db.collection('messagecontents'); //name of collection same as in mongodb atlas
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change)=>{
        console.log("A change occured",change);

        if (change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('message','inserted',
            {
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:false
            });
        } else {
            console.log('Error triggering pusher')
        }
    })
})

//????

//api route
app.get('/',(req,res)=>{
    res.status(200).send("hello from server")
})

app.post("/messages/new",(req,res)=>{
    const dbMessages=req.body

    Messages.create(dbMessages,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }else {
            res.status(200).send(data)
        }
    })
})

//listen
app.listen(port,()=>{
    console.log(`listening on port no. ${port}`)
})

// db passwd
// rSd8bNY3cu5WRZvw