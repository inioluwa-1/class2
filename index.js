const express = require('express');
const app = express();
const port = 3040;
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema.js');


app.use('/graphy', graphqlHTTP({
    schema,
    graphiql: true
    
}));


app.listen(port, () => { 
    console.log(`oya load me joor http://localhost:${port}`);
});