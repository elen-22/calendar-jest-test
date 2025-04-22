import { getDaysInMonth, getFirstDayOfMonth, getMonthName } from './calendar';

const calendar = document.querySelector("#calendar");
const monthYear = document.querySelector("#monthYear");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

let date = new Date();

function showCalendar() {
    calendar.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    monthYear.innerHTML = `${getMonthName(month)} ${year}`;

    // Empty divs for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.innerHTML = i;
        calendar.appendChild(dayDiv);
    }
}

prev.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    showCalendar();
});

next.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    showCalendar();
});

showCalendar();
