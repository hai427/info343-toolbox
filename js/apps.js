$(function() {
    'use strict';
    
    var canvasW = document.getElementById('weatherChart');
    var canvasC = document.getElementById('caloriesChart');
    var canvasT = document.getElementById('timeSpentChart');
    
    var ctxW = canvasW.getContext('2d');
    var ctxC = canvasC.getContext('2d');
    var ctxT = canvasT.getContext('2d');
    
    //makes all charts responsive to browser size
    Chart.defaults.global.responsive = true; 
    
    //data for calorie intake chart
    var caloriesData = [
        {
            value: 563,
            color:"#6059FF",
            label: "McDonald's Big Mac",
            highlight: "#958DFF"
        },
        {
            value : 105,
            color : "#517BE8",
            label: "Banana",
            highlight: "#809AE8"
        },
        {
            value : 387 ,
            color : "#65C2FF",
            label : "Steak",
            highlight: "#99D3FF"
        },
        {
            value : 365,
            color : "#51DDE8",
            label : "French Fries",
            highlight: "#80DDE8"
        }
    ];
    
    //data for time spent during day
    var timeSpentData = {
        labels: ["Eating", "Working", "Exercising", "Commuting", "Playing Games", "Sleeping"],
        datasets: [
            {
                label: "Purple - Today",
                fillColor: "rgba(118,38,255,0.2)",
                strokeColor: "#7626FF",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [1.5, 8.5, 1, 1.5, 3, 8.5]
            },
            {
                label: "Grey - Yesterday",
                fillColor: "rgba(151,187,205,0.4)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [1, 8.5, 2, 1.5, 0.5, 9.5]
            }
        ]
    };
    
    //data for local weekly weather forecast
    var weatherData = {
        labels: ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"], 
        datasets: [
            {
                fillColor: "#E89C41",
                strokeColor: "#E87F2B",
                highlightFill: "#FFB025",
                highlightStroke: "#E8C029",
                data: [65, 59, 58, 60, 55, 56, 57]
            }
        ]
    }
    
    var weatherOptions = {
        scaleShowGridLines : false,
        barValueSpacing : 10
    }
    
    //adds a new meal to the calorie intake chart
    $('#new-meal').submit(function(evt) {
        evt.preventDefault();
        var name = $(this).find('[name="name"]').val();
        var calories = $(this).find('[name="calories"]').val();
        doughnutChart.addData({
            value: calories,
            label: name,
            color: '#76FFA2',
            highlight: '#8CFFBA'
        })
    })
    
    //creates doughnut chart
    var doughnutChart = new Chart(ctxC).Doughnut(caloriesData);
    //creates legend for items in the chart
    document.getElementById('caloriesLegend').innerHTML = 
        doughnutChart.generateLegend();
    
    //creates bar graph
    var barGraph = new Chart(ctxW).Bar(weatherData, weatherOptions);
    var d = new Date();
    var month = d.getUTCMonth() + 1; //months from 1-12
    var day = d.getUTCDate();
    $('#date').text(month + "/" + day);
    
    //creates radar graph
    var radarGraph= new Chart(ctxT).Radar(timeSpentData);
    document.getElementById('timeSpentLegend').innerHTML = 
        radarGraph.generateLegend();
});