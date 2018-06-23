const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type LineData {
      pv: Int
  }

  type Query {
    getLineDataSet(name: String): [LineData]
  }

  type Mutation {
    addToLineDataSet(name: String, value: Int): LineData
  }

  type Subscription {
      lineDataSetUpdated: LineData
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
