const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
const weekdays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// let futureDate = new Date(2020, 11, 31, 24, 0, 0);
// *** set always 9 days in the future***
let fDate = new Date();
let fYear = fDate.getFullYear();
let fMonth = fDate.getMonth();
let fDay = fDate.getDate();
const futureDate = new Date(fYear, fMonth, fDay + 9, 11, 30, 0);

// ****display giveaway****

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = futureDate.getMonth();

const date = futureDate.getDate();
let hMonth = months[month];
let htime = '';
if (12 <= hours) {
	hours === 12 ? (htime = `${hours}:${minutes}pm`) : (htime = `${hours - 12}:${minutes}pm`);
} else {
	htime = `${hours}:${minutes}am`;
}
let day = weekdays[futureDate.getDay()];
giveaway.textContent = `giveaway ends on: ${day} ${date} ${hMonth} ${year} ${htime}`;

// ****counter****

const futureMs = futureDate.getTime();
function calculateRemainingTime() {
	const presentMs = new Date().getTime();
	const diff = futureMs - presentMs;
	const dayInMs = 24 * 60 * 60 * 1000;
	const hourInMs = 60 * 60 * 1000;
	const minInMs = 60 * 1000;
	let tday = Math.floor(diff / dayInMs);
	let thour = Math.floor((diff % dayInMs) / hourInMs);
	let tmin = Math.floor((diff % hourInMs) / minInMs);
	let tsec = Math.floor((diff % minInMs) / 1000);
	const values = [ tday, thour, tmin, tsec ];
	items.forEach(function(element, index) {
		element.innerHTML = values[index];
	});
	if (diff <= 0) {
		clearInterval(countdown);
		deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
	}
}

let countdown = setInterval(calculateRemainingTime, 1000);
calculateRemainingTime();
