const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');
const url = require('url');

const schema = require('./schema');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(
    '/graphql',
    graphqlExpress({
        schema
    })
);

app.use(
    '/graphiql',
    graphiqlExpress(req => ({
        endpointURL: '/graphql',
        subscriptionsEndpoint: url.format({
            host: req.get('host'),
            protocol: req.protocol === 'https' ? 'wss' : 'ws',
            pathname: '/subscriptions'
        })
    }))
);

const PORT = process.env.PORT || 3030;

const websocket = createServer(app);
websocket.listen(PORT, () => {
    console.log(`Server now running at port ${PORT}`);
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema
        },
        {
            server: websocket,
            path: '/subscriptions'
        }
    );
});
