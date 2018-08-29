var chart = c3.generate({
    data: {
        columns: [
            ['Amount already in', 0]
        ],
        type: 'bar'
    },
    bar: {
        width: 32
    },
    axis: {
        rotated: true
    },
    grid: {
        y: {
            lines: [{value: oProject['minimum-funding-goal'], text: 'Min'}, {value: oProject['total_funding_goal'], class: 'grid800', text: 'Max'}, {value: oProject['total_amount_out'], class: 'grid800', text: 'Out'}]
        }
    }
});


setTimeout(function () {
    chart.load({
        columns: [
            ['Amount already in', 80]
        ]
    });
}, 1000);
