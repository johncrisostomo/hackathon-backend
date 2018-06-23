const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const data = {
    printer: {
        lineDataSet: [
            { date: '6-11', v: 1300 },
            { date: '6-11', v: 1300 },
            { date: '6-11', v: 1300 }
        ],
        activityDataSet: [
            {
                id: 1,
                title: 'Printer 1',
                text: 'Printer used.',
                type: 'printer'
            },
            {
                id: 2,
                title: 'Printer 2',
                text: 'Printer used.',
                type: 'printer'
            },
            {
                id: 3,
                title: 'Printer 3',
                text: 'Printer used.',
                type: 'printer'
            }
        ],
        barDataSet: [
            {
                name: 'January',
                uv: 1000
            },
            {
                name: 'February',
                uv: 2700
            },
            {
                name: 'March',
                uv: 3800
            }
        ]
    },
    room: {
        lineDataSet: [{ pv: 400 }, { pv: 1300 }, { pv: 1300 }]
    }
};

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
        }
    },
    Mutation: {
        async addToLineDataSet(parentValue, { name, date, value }) {
            const pv = { date, v: value };

            data[name].lineDataSet[data[name].lineDataSet.length - 1] = pv;

            pubsub.publish('lineDataSetUpdated', {
                lineDataSetUpdated: pv
            });

            return pv;
        },
        async addToBarDataSet(parentValue, { name, uv, nameField }) {
            const newValue = { uv, name: nameField };

            data[name].barDataSet[data[name].barDataSet.length - 1] = newValue;

            pubsub.publish('barDataSetUpdated', {
                newValue
            });

            return newValue;
        },
        async addToActivityDataSet(
            parentValue,
            { name, id, title, text, type }
        ) {
            const newValue = { id, title, text, type };

            data[name].activityDataSet[
                data[name].lineDataSet.length - 1
            ] = newVAlue;

            pubsub.publish('activityDataSetUpdated', {
                newValue
            });

            return newValue;
        }
    },
    Subscription: {
        lineDataSetUpdated: {
            subscribe: () => pubsub.asyncIterator('lineDataSetUpdated')
        }
    }
};

module.exports = resolvers;
