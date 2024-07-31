// Main app function
function app(data) {
	// Global vars
	var optimal_time = 0, best_time = 0;
	var best_s1 = 0, best_s2 = 0, best_s3 = 0;
	var lap_average = 0, lap_deviation = 0;

	// Get dataset length/entrycount which is amount of laps registered
	var total_lap_count = data.length;
	drawTotalLapCount(total_lap_count);

	// Loop through dataset
	data.forEach((item) => {
		// Draw table
		drawTableRow(item);

		// Calculate + draw average lap time
		lap_average = getLapAverage(lap_average, item);
	});

	lap_average = lap_average/total_lap_count;
	drawLapAverage(lap_average);

	let table = new DataTable('#timing-table', {
		order: [],
		paging: false,
		searching: false,
		scollCollapse: true,
		scrollY: '75vh'
	});
};

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

function getLapAverage(lap_average, item) {
	lap_average = lap_average + parseFloat(item.time_sec);
	return lap_average;
};

function drawLapAverage(lap_average) {
	var lap_average_ms = lap_average * 1000;
	var milliseconds = lap_average_ms % 1000;
	var seconds = Math.floor((lap_average_ms / 1000) % 60);
	var minutes = Math.floor((lap_average_ms / (60 * 1000)) % 60);
	document.getElementById("lap_average").innerHTML = minutes + ":" + seconds + "." + parseInt(milliseconds);
};

function getOptimalTime() {

};

function getBestS1() {

};

function getBestS2() {

};

function getBestS3() {

};

// Start application
setTimeout(() => {  app(data); }, 20);