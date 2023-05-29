const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  const liTag = buildCalendarDays();
  currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`;
  daysTag.innerHTML = liTag;
};

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.id == "prev") {
      currentMonth -= 1;
    }

    if (icon.id === "next") {
      currentMonth += 1;
    }

    date = new Date();

    if (currentMonth < 0 || currentMonth > 11) {
      changeYear();
    }

    renderCalendar();
  });
});

function changeYear() {
  date = new Date(currentYear, currentMonth);
  currentYear = date.getFullYear();
  currentMonth = date.getMonth();
}

function getPreviusMonthLastDays(firstDayOfMonth, lastDateOfLastMonth) {
  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  return liTag;
}

function getNextMonthFistDays(lastDayOfMonth) {
  let liTag = "";

  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  return liTag;
}

function getAllDaysOfCurrentMonth(lastDateOfMonth) {
  let liTag = "";

  for (let i = 1; i <= lastDateOfMonth; i++) {
    const state = isToday(i);
    liTag += `<li class="${state}">${i}</li>`;
  }

  return liTag;
}

function isToday(day) {
  if (
    day === date.getDate() && currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    return "active";
  }

  return "";
}

function buildCalendarDays() {
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth)
    .getDay();
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let liTag = "";

  liTag += getPreviusMonthLastDays(firstDayOfMonth, lastDateOfLastMonth);
  liTag += getAllDaysOfCurrentMonth(lastDateOfMonth);
  liTag += getNextMonthFistDays(lastDayOfMonth);

  return liTag;
}

renderCalendar();
