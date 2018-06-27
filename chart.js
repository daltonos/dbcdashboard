
var chart = c3.generate({
    data: {
        columns: [
            ['in', 70],
            ['base', 120],
            ['out', 100],
            ['max', 80],
            ['min', 20]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); },
        color: function (color, d) {
            if(d=='base') return 'grey'
            return d == 'In' ? '#a90d37' : '#ffffff';
        },
        width: function(a,b,c){
            console.log(a,b,c);
            return 1;
        }
    },
    label: false,
    gauge: {
        label: {
            format: function(value, ratio , label) {
                if(label == 'base') return;
                return label + ' (' +value + ')';
            },
            show: true // to turn off the min/max labels.
        },
    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 120, // 100 is default
    units: 'in Mio €',
 // for adjusting arc thickness
    },// the three color levels for the percentage values.
    size: {
        height: 180
    }
});
