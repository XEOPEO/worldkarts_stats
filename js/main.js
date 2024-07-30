// Get data from CSV
var data;
var csv = Papa.parse("http://127.0.0.1:5500/worldkarts_stats/data/worldkarts_results.csv", {
	header: true,
	download: true,
	delimeter: ",",
	complete: function(results) {
		data = results.data;
	}
});

setTimeout(() => {  console.log(data); }, 20);