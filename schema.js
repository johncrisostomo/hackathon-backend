const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type PrinterCardData {
    consumed: Int
    left: Int
  }

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
      interval: Int
  }

  type PieData {
    label: String,
    value: Int,
    color: String
  }

  type Query {
    getPrintCardData: PrinterCardData
    getLineDataSet(name: String): [LineData]
    getBarDataSet(name: String): [BarData]
    getActivityDataSet(name: String): [ActivityData]
    getPieDataSet(name: String): [PieData]
  }

  type Mutation {
    changePrintCardData(value: Int): PrinterCardData
    addToLineDataSet(name: String, date: String, value: Int): LineData
    addToBarDataSet(name: String, uv: Int, nameField: String): BarData
    addToActivityDataSet(name: String, title: String, text: String, type: String) : ActivityData
    addToPieDataSet(name: String, color: String, label: String, value: Int): PieData
}

  type Subscription {
      printCardDataUpdated: PrinterCardData
      lineDataSetUpdated: LineData
      activityDataSetUpdated: ActivityData
      barDataSetUpdated: BarData
      pieDataSetUpdated: PieData
      lineDataSetUpdatedRoom: LineData
      activityDataSetUpdatedRoom: ActivityData
      barDataSetUpdatedRoom: BarData
      pieDataSetUpdatedRoom: PieData
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
