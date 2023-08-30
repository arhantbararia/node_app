const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb+srv://pearl_user:pearlthoughts@cluster0.ovwd8ob.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());

var i = 0

app.get('/', async (req, res) => {

	try {
		i = i+1
		let x = Math.floor((Math.random()*50)+1);
    		const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    		await client.connect();

    		const db = client.db('inventory');
    		const products = db.collection('products');

    		const product = {
      		name: 'Product ' + i,
      		quantity: x,
    		};
		
    		const result = await products.insertOne(product);
    		
		const all_products = await products.find({}).toArray();
		client.close();
		
    		res.json({ message: 'Product added to inventory', insertedId: result.insertedId ,prods:all_products });
  	}
	catch (error) {
    		console.error(error);
    		res.status(500).json({ error: 'An error occurred' });
  	}



  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
