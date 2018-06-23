const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const data = {
    printer: {
        lineDataSet: [{ pv: 1300 }, { pv: 1300 }, { pv: 1300 }],
        activityDataSet: [],
        barDataSet: []
    },
    room: {
        lineDataSet: [{ pv: 400 }, { pv: 1300 }, { pv: 1300 }]
    }
};

const resolvers = {
    Query: {
        getLineDataSet(parentValue, { name }) {
            return data[name].lineDataSet;
        }
    },
    Mutation: {
        async addToLineDataSet(parentValue, { name, value }) {
            const pv = { pv: value };

            data[name].lineDataSet[data[name].lineDataSet.length - 1] = pv;

            pubsub.publish('lineDataSetUpdated', {
                pv
            });

            return pv;
        }
    },
    Subscription: {
        lineDataSetUpdated: {
            subscribe: () => pubsub.asyncIterator('lineDataSetUpdated')
        }
    }
};

module.exports = resolvers;
