module.exports = {
    printer: {
        lineDataSet: [
            { date: '6-09', v: 100 },
            { date: '6-10', v: 52 },
            { date: '6-11', v: 105 },
            { date: '6-12', v: 72 },
            { date: '6-13', v: 90 },
            { date: '6-14', v: 50 },
            { date: '6-15', v: 56 },
            { date: '6-16', v: 24 },
            { date: '6-17', v: 40 },
            { date: '6-18', v: 59 },
            { date: '6-19', v: 80 },
            { date: '6-20', v: 225 },
            { date: '6-21', v: 76 },
            { date: '6-22', v: 24 },
            { date: '6-23', v: 13 }
        ],
        activityDataSet: [
            { id: 1, title: '6-09 John', text: 'Printed 100 pages' },
            { id: 2, title: '6-10 Michael', text: 'Printed 52 pages' },
            { id: 3, title: '6-11 Leo', text: 'Printed 105 pages' },
            { id: 4, title: '6-12 Vincent', text: 'Printed 72 pages' },
            { id: 5, title: '6-13 Andre', text: 'Printed 90 pages' },
            { id: 6, title: '6-14 Shero', text: 'Printed 50 pages' },
            { id: 7, title: '6-15 Rachael', text: 'Printed 56 pages' },
            { id: 8, title: '6-16 Varun', text: 'Printed 24 pages' },
            { id: 9, title: '6-17 George', text: 'Printed 40 pages' },
            { id: 10, title: '6-18 Yogesh', text: 'Printed 59 pages' },
            { id: 11, title: '6-19 Allan', text: 'Printed 80 pages' },
            { id: 12, title: '6-20 Johnny', text: 'Printed 225' },
            { id: 13, title: '6-21 Michael', text: 'Printed 76 pages' },
            { id: 14, title: '6-22 Vincent', text: 'Printed 24 pages' },
            { id: 15, title: '6-23 John', text: 'Printed 13 pages' }
        ],
        barDataSet: [
            {
                name: 'January',
                uv: 380
            },
            {
                name: 'February',
                uv: 800
            },
            {
                name: 'March',
                uv: 1066
            },
            {
                name: 'April',
                uv: 876
            },
            {
                name: 'May',
                uv: 2700
            },
            {
                name: 'June',
                uv: 1066
            }
        ],
        pieDataSet: [
            {
                label: 'Printer A',
                value: 200,
                color: '#8f8f8f'
            },

            {
                label: 'Printer B',
                value: 600,
                color: '#000'
            },

            {
                label: 'Printer C',
                value: 100,
                color: '#CC0000'
            }
        ]
    },
    room: {
        lineDataSet: [
            { date: '6-21', v: 1300 },
            { date: '6-22', v: 1300 },
            { date: '6-23', v: 1300 }
        ],
        activityDataSet: [
            {
                id: 1,
                title: 'Room 1',
                text: 'Printer used.',
                type: 'printer'
            },
            {
                id: 2,
                title: 'Room 2',
                text: 'Printer used.',
                type: 'printer'
            },
            {
                id: 3,
                title: 'Room 3',
                text: 'Printer used.',
                type: 'printer'
            }
        ],
        barDataSet: [
            {
                name: 'May',
                uv: 1000
            },
            {
                name: 'June',
                uv: 2700
            },
            {
                name: 'July',
                uv: 3800
            }
        ],
        pieDataSet: [
            {
                label: 'Printer A',
                value: 670,
                color: '#7A296B'
            },

            {
                label: 'Printer B',
                value: 380,
                color: '#AA6039'
            },

            {
                label: 'Printer C',
                value: 250,
                color: '#549431'
            }
        ]
    }
};
