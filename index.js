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
            const userInfoCollection = client.db("Social-Say").collection("userInfo")
            const postCollection = client.db("Social-Say").collection("posts")

            app.get('/users', async(req,res)=>{
                const query = {}
                const users = await usersCollection.find(query).toArray()
                res.send(users)
            })
            app.get('/users/:id', async(req,res)=>{
                const id = req.params.id;
                const query = {_id:Object(id)}
                const users = await usersCollection.findOne(query)
                res.send(users)
            })
            // app.put('/users', async(req,res)=>{
            //     const email = req.params.email
            //     const updateUser = req.body
            //     const filter ={email:email}
            //     const updatedDoc ={
            //         $set:{"name":"updateUser.name","email":"updateUser.email","address":"updateUser.address","education":"updateUser.education"}
            //     }
            //     const result = await usersCollection.updateOne(updatedDoc,filter)
            //     res.send(result)
            // })

            app.post('/users', async(req,res)=>{
                const user = req.body
                const result = await usersCollection.insertOne(user)
                res.send(user)
            })
            app.post('/usersInfo', async(req,res)=>{
                const updateUser = req.body
                const result = await userInfoCollection.insertOne(updateUser)
                res.send(updateUser)
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