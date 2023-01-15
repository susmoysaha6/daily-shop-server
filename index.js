const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();


// middleware
app.use(cors());

app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yna6pse.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    const productCollecion = client.db('eShop').collection('products');

    app.get('/products', async (req, res) => {
        const query = {};
        const products = await productCollecion.find(query).toArray();
        res.send(products);
    })

}

run().catch(err => console.error(err))

app.get('/', async (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log(`running on ${port}`);
})