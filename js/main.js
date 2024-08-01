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
	});

	// Lap average
	lap_average = getLapAverage(data);
	drawLapAverage(lap_average);

	// Lap standard deviation
	lap_deviation = getLapDeviation(data, lap_average);
	drawLapDeviation(lap_deviation);

	// Initiate DataTables
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

function getLapDeviation(data, lap_average) {
	let laptimes = data.map(entry => parseFloat(entry.time_sec));
	let absolute_deviation = laptimes.reduce((sum, time) => sum + Math.abs(time - lap_average), 0);
	let average_deviation = absolute_deviation / laptimes.length;
	return average_deviation.toFixed(3);
};

function drawLapDeviation(lap_deviation) {
	document.getElementById("lap_deviation").innerHTML = lap_deviation;
}

function getLapAverage(data) {
	let laptimes = data.map(entry => parseFloat(entry.time_sec));
	let lap_average = laptimes.reduce((sum, time) => sum + time, 0) / data.length;
	return lap_average.toFixed(3);
};

function drawLapAverage(lap_average) {
	var lap_average_ms = lap_average * 1000;
	var milliseconds = lap_average_ms % 1000;
	var seconds = Math.floor((lap_average_ms / 1000) % 60);
	var minutes = Math.floor((lap_average_ms / (60 * 1000)) % 60);
	document.getElementById("lap_average").innerHTML = minutes + ":" + seconds + "." + parseInt(milliseconds);
};

function getBestTime(data) {
	let laptimes = data.map(entry => parseFloat(entry.laptime_sec));
	let best_time = Math.min(...laptimes);
	return best_time;
};

function getBestS1(data) {
	let laptimes = data.map(entry => parseFloat(entry.s1));
	let best_s1 = Math.min(...laptimes);
	return best_s1;
};

function getBestS2(data) {
	let laptimes = data.map(entry => parseFloat(entry.s2));
	let best_s2 = Math.min(...laptimes);
	return best_s2;
};

function getBestS3(data) {
	let laptimes = data.map(entry => parseFloat(entry.s3));
	let best_s3 = Math.min(...laptimes);
	return best_s3;
};

function getOptimalTime(s1,s2,s3) {

};

// Start application
setTimeout(() => {  app(data); }, 20);