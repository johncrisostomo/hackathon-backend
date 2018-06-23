const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const lineDataSet = [{ pv: 1300 }, { pv: 1300 }, { pv: 1300 }];

const resolvers = {
    Query: {
        getLineDataSet(parentValue) {
            return lineDataSet;
        }
    },
    Mutation: {
        async addToLineDataSet(parentValue) {
            const pv = { pv: 10000 };

            lineDataSet.push(pv);

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
