const express = require('express');
const bodyParser = require('body-parser');
const { graphqlConnect, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use('/graphql', graphqlConnect({
  schema
}));
app.use('/play', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(app.get('port'), error => {
  if (error) throw error;
  console.log('App started: http://localhost:' + app.get('port'));
});
