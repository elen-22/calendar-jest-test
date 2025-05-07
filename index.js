import { getDaysInMonth, getFirstDayOfMonth, getMonthName } from './calendar.js';

const calendar = document.querySelector("#calendar");
const monthYear = document.querySelector("#monthYear");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

let date = new Date();
let notes = JSON.parse(localStorage.getItem("calendarNotes") || "{}");

function saveToLocalStorage() {
    localStorage.setItem("calendarNotes", JSON.stringify(notes));
}

function createNoteElement(text, dayKey) {
    const note = document.createElement("div");
    note.className = "note";
    note.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.className = "delete-note";
    deleteBtn.onclick = () => {
        notes[dayKey] = notes[dayKey].filter(n => n !== text);
        saveToLocalStorage();
        showCalendar(); 
    };

    note.appendChild(deleteBtn);
    return note;
}

function renderNotes(container, dayKey) {
    if (!notes[dayKey]) return;
    notes[dayKey].forEach(noteText => {
        const noteEl = createNoteElement(noteText, dayKey);
        container.appendChild(noteEl);
    });
}

function showCalendar() {
    calendar.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    monthYear.innerHTML = `${getMonthName(month)} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        const dayKey = `${year}-${month}-${i}`;

        const dateLabel = document.createElement("div");
        dateLabel.className = "day-number";
        dateLabel.textContent = i;

        const noteContainer = document.createElement("div");
        noteContainer.className = "note-container";

        dayDiv.appendChild(dateLabel);
        dayDiv.appendChild(noteContainer);
        renderNotes(noteContainer, dayKey);

        dateLabel.addEventListener("click", () => {
            if (dayDiv.querySelector("input")) return;

            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Add note";

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";

            saveBtn.addEventListener("click", () => {
                const val = input.value.trim();
                if (val) {
                    if (!notes[dayKey]) notes[dayKey] = [];
                    notes[dayKey].push(val);
                    saveToLocalStorage();
                    showCalendar();
                }
            });

            dayDiv.appendChild(input);
            dayDiv.appendChild(saveBtn);
        });

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
