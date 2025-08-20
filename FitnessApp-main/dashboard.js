let selectedDate = null;
let currentDate = new Date();
let goals = {};

// Update the calendar to show the correct month and year
function updateCalendar() {
  const monthYear = document.getElementById("monthYear");
  const calendarDiv = document.querySelector(".calendar");
  const selectedDateElement = document.getElementById("selectedDate");

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  monthYear.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay(); // Day of the week the month starts
  const totalDays = lastDay.getDate(); // Total days in the month

  calendarDiv.innerHTML = ""; // Clear previous calendar

  // Add empty divs for the days before the start of the month
  for (let i = 0; i < startDay; i++) {
    const emptyDiv = document.createElement("div");
    calendarDiv.appendChild(emptyDiv);
  }

  // Add the actual days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.addEventListener("click", () => selectDay(day));
    calendarDiv.appendChild(dayDiv);
  }

  if (selectedDate) {
    selectedDateElement.textContent = `${selectedDate.month + 1}/${
      selectedDate.day
    }/${selectedDate.year}`;
  }
}

// Handle day selection
function selectDay(day) {
  const selectedDateElement = document.getElementById("selectedDate");
  selectedDate = {
    day,
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };
  selectedDateElement.textContent = `${selectedDate.month + 1}/${
    selectedDate.day
  }/${selectedDate.year}`;
  document.getElementById("goalInput").value = goals[selectedDateKey()] || "";
}

// Add goal to selected day
document.getElementById("addGoal").addEventListener("click", () => {
  const goalInput = document.getElementById("goalInput");
  if (!selectedDate) {
    alert("Please select a day first.");
    return;
  }
  goals[selectedDateKey()] = goalInput.value;
  updateGoalOverview(); // Only update the overview, not the goalList
});

// Show the overview of all goals
function updateGoalOverview() {
  const goalOverview = document.getElementById("goalOverview");
  goalOverview.innerHTML = ""; // Clear previous overview

  for (let key in goals) {
    const goalDiv = document.createElement("div");
    goalDiv.classList.add("goal-overview-item");

    const date = new Date(key);
    const goalDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    goalDiv.innerHTML = `
            <strong>${goalDate}</strong>: ${goals[key]}
            <button onclick="editGoal('${key}')">Edit</button>
            <button onclick="deleteGoal('${key}')">Delete</button>
        `;

    goalOverview.appendChild(goalDiv);
  }
}

// Generate a unique key for each day (to store goals)
function selectedDateKey() {
  return `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`;
}

// Edit goal for a specific date
function editGoal(key) {
  const newGoal = prompt("Edit your goal:", goals[key]);
  if (newGoal !== null) {
    goals[key] = newGoal;
    updateGoalOverview();
  }
}

// Delete goal for a specific date
function deleteGoal(key) {
  if (confirm("Are you sure you want to delete this goal?")) {
    delete goals[key];
    updateGoalOverview();
  }
}

// Navigation buttons for changing the month
document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

// Initial load
updateCalendar();

/* JS to apply rounded off corners only if the badge image is displaying,
if it doesn't load and the alt text is displayed instead, dont apply rounded
off corners */
// Select all images in the badges container
const badgesContainers = document.querySelectorAll(".badgesContainer");

badgesContainers.forEach((container) => {
  const images = container.querySelectorAll("img");

  images.forEach((img) => {
    // Check if the image is already loaded
    if (img.complete && img.naturalWidth > 0) {
      img.style.borderRadius = "30%"; // Apply rounded corners
    } else {
      // Add an event listener for images that might load later
      img.addEventListener("load", () => {
        img.style.borderRadius = "30%"; // Apply rounded corners when loaded
      });
      img.addEventListener("error", () => {
        img.style.borderRadius = "0"; // Remove rounded corners if image fails to load
      });
    }
  });
});

/* If there are no badges in either the Badges or Upcoming Badges article,
then this js will hide the h2 for that article */
function updateBadgesVisibility() {
  const badgeSections = document.querySelectorAll(".badges-section");

  badgeSections.forEach((section) => {
    const badgesContainer = section.querySelector(".badgesContainer");

    // Check if there are any badges
    if (
      !badgesContainer.children.length ||
      (badgesContainer.children.length === 1 &&
        badgesContainer.children[0].nodeType === Node.COMMENT_NODE)
    ) {
      section.classList.add("hidden");
    } else {
      section.classList.remove("hidden");
    }
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateBadgesVisibility);

// Function to add a reminder
function addReminder(reminderText, reminderList) {
  if (reminderText) {
    const newReminder = document.createElement("li");
    newReminder.textContent = reminderText;

    // Create edit and delete buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = () => editReminder(newReminder);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => deleteReminder(newReminder);

    newReminder.appendChild(editButton);
    newReminder.appendChild(deleteButton);

    reminderList.appendChild(newReminder);
  }
}

// Function to edit a reminder
function editReminder(reminderItem) {
  const newText = prompt(
    "Edit your reminder:",
    reminderItem.firstChild.textContent
  );
  if (newText) {
    reminderItem.firstChild.textContent = newText;
  }
}

// Function to delete a reminder
function deleteReminder(reminderItem) {
  reminderItem.remove();
}

// JS to add reminders to View Reminders dropdown when screen size is larger than 810px
document.getElementById("addReminderButton").addEventListener("click", () => {
  const reminderText = prompt("Enter your reminder:");
  if (reminderText) {
    const reminderList = document.querySelector(
      "#viewReminders .dropdown-content"
    );
    addReminder(reminderText, reminderList);
  }
});

// JS to add reminders to View Reminders dropdown when screen size is smaller than 810px
document
  .getElementById("addReminderButton-lower")
  .addEventListener("click", () => {
    const reminderText = prompt("Enter your reminder:");
    if (reminderText) {
      const reminderList = document.querySelector(
        "#viewReminders-lower .dropdown-content"
      );
      addReminder(reminderText, reminderList);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById('currentGoalsChart').getContext('2d');
    var currentGoalsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example labels
            datasets: [{
                label: 'Progress',
                data: [0, 10, 35, 2, 20, 30, 45], // Example data points
                backgroundColor: 'rgba(176, 178, 180, 0.2)',
                borderColor: 'rgb(236, 235, 235)',
                borderWidth: 1
            }]
        },
        options: {
          plugins: {
              legend: {
                  labels: {
                      color: 'rgb(224, 222, 222)' // Color of the legend label 
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: 'rgb(224, 222, 222)' // Color of the x-axis labels 
                  }
              },
              y: {
                  ticks: {
                      color: 'rgb(224, 222, 222)' // Color of the y-axis labels
                  },
                  beginAtZero: true
              }
          }
      }
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//   // Make a request to check if the user is authenticated
//   fetch("http://localhost:3001/auth/Authenticated", {
//     method: "GET",
//     credentials: "include", // Include credentials (cookies) in the request
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (!data.auth) {
//          // If the user is not authenticated, redirect to login page
//         window.location.href = "/login.html"; // Redirect to the login page
//       } else {
//          // If authenticated, do nothing or load user data
//         console.log("User is authenticated, access:", data.access);
//       }
//     })
//     .catch((error) => {
//       console.error("Error checking authentication:", error);
//        // Optionally, handle errors or redirect to an error page
//       window.location.href = "/login.html";
//     });
// });
