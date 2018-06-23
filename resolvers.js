const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const data = require('./mocks');

const resolvers = {
    Query: {
        getLineDataSet(parentValue, { name }) {
            return data[name].lineDataSet;
        },
        getBarDataSet(parentValue, { name }) {
            return data[name].barDataSet;
        },
        getActivityDataSet(parentValue, { name }) {
            return data[name].activityDataSet;
        },
        getPieDataSet(parentValue, { name }) {
            return data[name].pieDataSet;
        }
    },
    Mutation: {
        async addToLineDataSet(parentValue, { name, date, value }) {
            const pv = { date, v: value };

            data[name].lineDataSet[data[name].lineDataSet.length - 1] = pv;

            if (name === 'printer') {
                pubsub.publish('lineDataSetUpdated', {
                    lineDataSetUpdated: pv
                });
            } else {
                pubsub.publish('lineDataSetUpdatedRoom', {
                    lineDataSetUpdatedRoom: pv
                });
            }

            return pv;
        },
        async addToBarDataSet(parentValue, { name, uv, nameField }) {
            const newValue = { uv, name: nameField };

            data[name].barDataSet[data[name].barDataSet.length - 1] = newValue;

            if (name === 'printer') {
                pubsub.publish('barDataSetUpdated', {
                    barDataSetUpdated: newValue
                });
            } else {
                pubsub.publish('barDataSetUpdatedRoom', {
                    barDataSetUpdatedRoom: newValue
                });
            }

            return newValue;
        },
        async addToActivityDataSet(parentValue, { name, title, text, type }) {
            const newValue = {
                id: data[name].activityDataSet.length + 1,
                title,
                text,
                type
            };

            data[name].activityDataSet.push(newValue);

            if (name === 'printer') {
                pubsub.publish('activityDataSetUpdated', {
                    activityDataSetUpdated: newValue
                });
            } else {
                pubsub.publish('activityDataSetUpdatedRoom', {
                    activityDataSetUpdatedRoom: newValue
                });
            }

            return newValue;
        },
        async addToPieDataSet(parentValue, { name, color, label, value }) {
            const newValue = { name, color, label, value };

            data[name].pieDataSet[data[name].pieDataSet.length - 1] = newValue;

            if (name === 'printer') {
                pubsub.publish('pieDataSetUpdated', {
                    pieDataSetUpdated: newValue
                });
            } else {
                pubsub.publish('pieDataSetUpdatedRoom', {
                    pieDataSetUpdatedRoom: newValue
                });
            }

            return newValue;
        }
    },
    Subscription: {
        lineDataSetUpdated: {
            subscribe: () => pubsub.asyncIterator('lineDataSetUpdated')
        },
        barDataSetUpdated: {
            subscribe: () => pubsub.asyncIterator('barDataSetUpdated')
        },
        activityDataSetUpdated: {
            subscribe: () => pubsub.asyncIterator('activityDataSetUpdated')
        },
        pieDataSetUpdated: {
            subscribe: () => pubsub.asyncIterator('pieDataSetUpdated')
        },
        lineDataSetUpdatedRoom: {
            subscribe: () => pubsub.asyncIterator('lineDataSetUpdatedRoom')
        },
        barDataSetUpdatedRoom: {
            subscribe: () => pubsub.asyncIterator('barDataSetUpdatedRoom')
        },
        activityDataSetUpdatedRoom: {
            subscribe: () => pubsub.asyncIterator('activityDataSetUpdatedRoom')
        },
        pieDataSetUpdatedRoom: {
            subscribe: () => pubsub.asyncIterator('pieDataSetUpdatedRoom')
        }
    }
};

module.exports = resolvers;
