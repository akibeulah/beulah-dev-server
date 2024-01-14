require('dotenv').config();
const express = require("express");
require('./models');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const v1Routes = require("./routes/index");
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(cors()); // Use the cors middleware to enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', v1Routes);

// const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

const start = async () => {
    try {
        // await client.connect();
        // await client.db("admin").command({ ping: 1 });

        app.listen(3000, () => console.log("Server started on port 3000."));
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        // await client.close();
    }
};

start().catch(console.dir);
