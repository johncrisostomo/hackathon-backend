const { PubSub, withFilter } = require('graphql-subscriptions');

const lineDataSet = [{ pv: 1300 }, { pv: 1300 }, { pv: 1300 }];

const resolvers = {
    Query: {
        async getLineDataSet(parentValue) {
            return lineDataSet;
        }
    },
    Mutation: {
        async addToLineDataSet(parentValue) {
            const pv = { pv: 10000 };

            lineDataSet.append(pv);

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
