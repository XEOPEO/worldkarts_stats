// Get data from CSV
var data;
var csv = Papa.parse("https://kartstats.lugia.eu/data/worldkarts_results.csv", {
	header: true,
	download: true,
	delimeter: ",",
	complete: function(results) {
		data = results.data;
	}
});

// Global vars
var optimal_time, best_time = 0;
var best_s1, best_s2, best_s3 = 0;
var lap_average, lap_deviation = 0;

// Function helpers
function drawTotalLapCount(total_lap_count) {
	document.getElementById("total_lap_count").innerHTML = total_lap_count;
};

function drawTableRow(item) {
	var tbody = document.getElementById("table-body");
	var tr = document.createElement("tr");

	// Round
	var td_round = document.createElement("td");
	td_round.innerHTML = item.round;

	// S1
	var td_s1 = document.createElement("td");
	td_s1.innerHTML = item.s1;

	// S2
	var td_s2 = document.createElement("td");
	td_s2.innerHTML = item.s2;

	// S3
	var td_s3 = document.createElement("td");
	td_s3.innerHTML = item.s3;

	// Lap time
	var td_time = document.createElement("td");
	td_time.innerHTML = item.time;

	// Kart Number
	var td_kart_nr = document.createElement("td");
	td_kart_nr.innerHTML = item.kart_nr;

	// Date
	var td_date = document.createElement("td");
	td_date.innerHTML = item.date;

	// Week
	var td_week = document.createElement("td");
	td_week.innerHTML = item.week;

	// Append TD's to TR
	tr.appendChild(td_round);
	tr.appendChild(td_s1);
	tr.appendChild(td_s2);
	tr.appendChild(td_s3);
	tr.appendChild(td_time);
	tr.appendChild(td_kart_nr);
	tr.appendChild(td_date);
	tr.appendChild(td_week);

	// Append TR to TBODY
	tbody.appendChild(tr);
};

function getLapDeviation() {

};

function getLapAverage() {

};

function getOptimalTime() {

}

function getBestS1() {

};

function getBestS2() {

};

function getBestS3() {

};

// Main app function
function app(data) {
	// Get dataset length/entrycount which is amount of laps registered
	var total_lap_count = data.length;
	drawTotalLapCount(total_lap_count);

	// Loop through dataset
	data.forEach((item) => {
		// Draw table
		drawTableRow(item);
	});

	let table = new DataTable('#timing-table', {
		order: [],
		paging: false,
		scollCollapse: true,
		scrollY: '75vh'
	});
};

while (typeof data == undefined) {
	if (typeof data != undefined) break;
}

app(data);