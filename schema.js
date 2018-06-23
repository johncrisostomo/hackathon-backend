const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type LineData {
      date: String
      v: Int
  }

  type BarData {
      name: String,
      uv: Int
  }

  type ActivityData {
      id: Int,
      title: String,
      text: String,
      type: String
  }

  type Query {
    getLineDataSet(name: String): [LineData]
    getBarDataSet(name: String): [BarData]
    getActivityDataSet(name: String): [ActivityData]
  }

  type Mutation {
    addToLineDataSet(name: String, date: String, value: Int): LineData
    addToBarDataSet(name: String, uv: Int, nameField: String): BarData
    addToActivityDataSet(name: String, id: Int, title: String, text: String, type: String) : ActivityData
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
