const express = require('express');
const cors = require('cors');
const app = express();
require ('dotenv').config();
const port = process.env.port || 5000;

// middleware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hvwcwlz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)
async function run(){
    try{
            const usersCollection = client.db("Social-Say").collection("users")
            const postCollection = client.db("Social-Say").collection("posts")

            app.post('/users', async(req,res)=>{
                const user = req.body
                const result = await usersCollection.insertOne(user)
                res.send(user)
            })

            app.get('/post', async(req,res)=>{
                const query = {};
                const posts = await postCollection.find(query).toArray();
                res.send(posts)

            })
            app.post('/post', async(req,res)=>{
                const post = req.body
                const result = await postCollection.insertOne(post)
                res.send(post)
            })

            
    }

    finally{

    }
}
run()
.catch(err => console.error(err))

app.get('/', (req,res)=>{
    res.send('Social-Say server side running')
})
app.listen(port,()=>{
    console.log(`My API is running on port ${port}`)
})