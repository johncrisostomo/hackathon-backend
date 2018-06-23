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
        ],
        pieDataSet: [
            {
                label: 'Room A',
                value: 200,
                color: '#fff'
            },

            {
                label: 'Room B',
                value: 600,
                color: '#000'
            },

            {
                label: 'Room C',
                value: 100,
                color: '#CCC0000'
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
        },
        getPieDataSet(parentValue, { name }) {
            return data[name].pieDataSet;
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
                barDataSetUpdated: newValue
            });

            return newValue;
        },
        async addToActivityDataSet(
            parentValue,
            { name, id, title, text, type }
        ) {
            const newValue = { id, title, text, type };

            data[name].activityDataSet[
                data[name].activityDataSet.length - 1
            ] = newValue;

            pubsub.publish('activityDataSetUpdated', {
                activityDataSetUpdated: newValue
            });

            return newValue;
        },
        async addToPieDataSet(parentValue, { name, color, label, value }) {
            const newValue = { name, color, label, value };

            data[name].pieDataSet[data[name].pieDataSet.length - 1] = newValue;

            pubsub.publish('pieDataSetUpdated', {
                pieDataSetUpdated: newValue
            });

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
        }
    }
};

module.exports = resolvers;
