// Main app function
function app(data) {
	// Global vars
	var optimal_time = 0, best_time = 0;
	var best_s1 = 0, best_s2 = 0, best_s3 = 0;
	var lap_average = 0, lap_deviation = 0;

	// Get dataset length/entrycount which is amount of laps registered
	var total_lap_count = data.length;
	drawTotalLapCount(total_lap_count);

	// Best sector times
	best_s1 = getBestS1(data);
	best_s2 = getBestS2(data);
	best_s3 = getBestS3(data);

	// Best lap time
	best_time = getBestTime(data);
	drawBestTime(best_time);

	// Optimal lap time
	optimal_time = (parseFloat(best_s1) + parseFloat(best_s2) + parseFloat(best_s3)).toFixed(3);
	var optimal_diff = (parseFloat(best_time) - parseFloat(optimal_time)).toFixed(3);
	drawOptimalTime(optimal_time, optimal_diff);

	// Loop through dataset
	data.forEach((item) => {
		// Draw table
		drawTableRow(item, best_s1, best_s2, best_s3, best_time);
	});

	// Lap average
	lap_average = getLapAverage(data);
	drawLapAverage(lap_average);

	// Lap standard deviation
	lap_deviation = getLapDeviation(data, lap_average);
	drawLapDeviation(lap_deviation);

	// Initiate DataTables
	let table = new DataTable('#timing-table', {
		order: [[4, "asc"]],
		paging: false,
		searching: false,
		scollCollapse: true,
		scrollY: '80vh',
		bInfo: false
	});
};

// Function helpers
function drawTotalLapCount(total_lap_count) {
	document.getElementById("total_lap_count").innerHTML = total_lap_count;
};

function drawTableRow(item, best_s1, best_s2, best_s3, best_time) {
	var tbody = document.getElementById("table-body");
	var tr = document.createElement("tr");

	// Round
	var td_round = document.createElement("td");
	td_round.innerHTML = item.round;

	// S1
	var td_s1 = document.createElement("td");
	if (parseFloat(item.s1) == best_s1) {
		td_s1.className="purple";
	}
	td_s1.innerHTML = item.s1;

	// S2
	var td_s2 = document.createElement("td");
	if (parseFloat(item.s2) == best_s2) {
		td_s2.className="purple";
	}
	td_s2.innerHTML = item.s2;

	// S3
	var td_s3 = document.createElement("td");
	if (parseFloat(item.s3) == best_s3) {
		td_s3.className="purple";
	}
	td_s3.innerHTML = item.s3;

	// Lap time
	var td_time = document.createElement("td");
	if (parseFloat(item.time_sec) == best_time) {
		td_time.className="purple";
	}
	td_time.innerHTML = item.time;

	// Kart Number
	var td_kart_nr = document.createElement("td");
	td_kart_nr.innerHTML = item.kart_nr;

	// Kart Model
	var td_kart_model = document.createElement("td");
	td_kart_model.innerHTML = item.kart_model;

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
	tr.appendChild(td_kart_model);
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
	let minutes = Math.floor(lap_average / 60).toString().padStart(2, '0');
	let seconds = (lap_average % 60).toFixed(3).padStart(6, '0');
	document.getElementById("lap_average").innerHTML = `${minutes}:${seconds}`;
};

function getBestTime(data) {
	let laptimes = data.map(entry => parseFloat(entry.time_sec));
	let best_time = Math.min(...laptimes);
	return best_time;
};

function drawBestTime(best_time) {
	let minutes = Math.floor(best_time / 60).toString().padStart(2, '0');
	let seconds = (best_time % 60).toFixed(3).padStart(6, '0');
	document.getElementById("best_lap").innerHTML = `${minutes}:${seconds}`;
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

function drawOptimalTime(optimal_time, optimal_diff) {
	let minutes = Math.floor(optimal_time / 60).toString().padStart(2, '0');
	let seconds = (optimal_time % 60).toFixed(3).padStart(6, '0');
	document.getElementById("optimal_lap").innerHTML = `${minutes}:${seconds}` + " <span class=\"badge bg-success\">-"+ optimal_diff +"</span>";
};

// Start application
setTimeout(() => {  app(data); }, 20);