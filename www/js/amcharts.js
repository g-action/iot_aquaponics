// This is a JavaScript file

// mBaaS アプリケーション・クライアントの指定
var ncmb = new NCMB("YOUR_APP_KEY", "YOUR_CLIENT_KEY");
var MyNCMB = ncmb.DataStore("Pi2NCMB");

var chartData = generateChartData();

var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "dark",
      // アニメーション有効時に必要
  	"addClassNames": true,
	"legend": {
        "useGraphSettings": true
    },
  	"dataProvider": chartData,
    "synchronizeGrid":true,
    "valueAxes": [{
        "id":"v1",
        "axisColor": "#FF6600",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
    }, {
        "id":"v2",
        "axisColor": "#FCD202",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
    }, {
        "id":"v3",
        "axisColor": "#B0DE09",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 50,
        "axisAlpha": 1,
        "position": "left"
    }],
    "graphs": [{
      	// アニメーション有効時に必要
        "id": "g1",
        "valueAxis": "v1",
        "lineColor": "#FF6600",
        "bullet": "round",
      	"balloonText": "温度:[[value]] ℃",
      	"bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "温度(℃)",
        "valueField": "temp",
		"fillAlphas": 0,
      	// アニメーション有効時に必要
		"classNameField": "bulletClass"
    }, {
        "id": "g1",
      	"valueAxis": "v2",
        "lineColor": "#FCD202",
        //"bullet": "square",
        "bullet": "round",
      	"balloonText": "湿度:[[value]] %",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "湿度(%)",
        "valueField": "humi",
		"fillAlphas": 0,
		"classNameField": "bulletClass"
    }, {
        "id": "g1",
      	"valueAxis": "v3",
        "lineColor": "#B0DE09",
        //"bullet": "triangleUp",
        "bullet": "round",
      "balloonText": "水温:[[value]] ℃",
      	"bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "水温(℃)",
        "valueField": "cel",
      	"fillAlphas": 0,
		"classNameField": "bulletClass"
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "categoryBalloonDateFormat": "MMM DD JJ:NN",
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "minPeriod": "hh",
      	"minorGridEnabled": true
    },
    "export": {
    	"enabled": true,
        "position": "bottom-right"
     }
});

chart.addListener("dataUpdated", zoomChart);
zoomChart();

// generate some random data, quite different range
function generateChartData() {
  
	var chartData = [];
  
  	// データストアの取得
  	MyNCMB.order("createDate", true)
    .count()
    .limit(100)
	.fetchAll()
	.then(function(results){
        for (var i = 0;  i<results.length;  i++) {
          
			var object = results[results.length-1-i];
          	var date = object.createDate;
			var temp = object.temp;
			var humi = object.humi;
			var cel = object.cel;

      		console.log("date is " + date);
      		console.log("temp is " + temp);
          	console.log("humi is " + humi);
      		console.log("cel is " + cel);

            if ( i == results.length - 1 ){
            	chartData.push({
        			date: date,
					temp: temp,
					humi: humi,
					cel: cel,
                  	// 最終点のみ拡大アニメーション
		       		"bulletClass": "lastBullet"
				})
            }else{
            	chartData.push({
        			date: date,
					temp: temp,
					humi: humi,
					cel: cel
				})
            }
		}
	})
	return chartData;
} 

function zoomChart(){
    chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
}