 const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const grapghlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema.js');



app.use('/graphy', grapghlHTTP({
    schema,
    graphiql: true
}))

mongoose.connect(process.env.URI)
.then(() => {
    console.log('connected to db');
}) .catch((err) => {
    console.log(err);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});