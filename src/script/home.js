function loadTasks() {
    const TASKS_KEY = "personal-dashboard-tasks";
    const saved = localStorage.getItem(TASKS_KEY);
    if (!saved) return [];

    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function setGreeting() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
    greeting = "Good morning.";
    } else if (currentHour < 18) {
    greeting = "Good afternoon.";
    } else {
    greeting = "Good evening.";
    }
    document.getElementById("greeting").textContent = greeting;
}

function updateClock(){
    let time = new Date().toLocaleTimeString();
    document.getElementById("clock").textContent = time;
}

async function getWeather() {

    const url = "https://api.open-meteo.com/v1/forecast?latitude=55.8362&longitude=-4.55356&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto";

    const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain"
    };

    try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current;

        document.getElementById("weather-temp").textContent =
            current.temperature_2m + "°C";

        document.getElementById("weather-wind").textContent =
            "Wind: " + current.wind_speed_10m + " km/h";

        document.getElementById("weather-description").textContent =
    "Conditions: " + weatherDescriptions[current.weather_code] || "Unknown conditions";

    } catch (error) {
        document.getElementById("weather-temp").textContent =
            "Weather unavailable";
    }
}

function taskSummary() {
    let tasks = loadTasks()
    let tasksToDo = 0;
    let tasksCompleted = 0;

    for (const task of tasks){
        if (!task.done){
            tasksToDo += 1;
        } else {
            tasksCompleted += 1;
        }
    }

    if (tasksToDo === 0) {
            document.getElementById("tasksToDo").textContent = "You're all caught up!"
        } else {
            document.getElementById("tasksToDo").textContent = "Tasks still to do: " + tasksToDo;
        }
        
        document.getElementById("tasksComplete").textContent = "Tasks complete: " + tasksCompleted;
}

function randomFact() {
    const facts = [
        "Octopuses have 3 hearts.",
        "A day on venus is longer than its year.",
        "Bananas are botanically classified as berries.",
        "Sharks existed before trees.",
        "Honey can remain edible for an extremely long time when stored properly.",
        "A group of flamingos is called a 'flamboyance'",
        "An adult human has 206 bones",
        "Saturn would float in water if you had a bathtub large enough.",
        "The shortest war in recorded history lasted less than an hour.",
        "Wombats produce cube-shaped droppings.",
         "The Moon is slowly moving away from Earth.",
        "Dolphins use distinctive whistles to identify one another.",
        "There are more possible chess games than atoms in the observable universe.",
        "The heart of a blue whale is roughly the size of a small car.",
        "A bolt of lightning can be hotter than the surface of the Sun.",
        "Some turtles can breathe through specialised tissues near their tails.",
        "The Pacific Ocean is larger than all of Earth's land combined.",
        "A cloud can weigh hundreds of tonnes.",
        "The fingerprints of koalas are remarkably similar to human fingerprints.",
        "Jupiter has the shortest day of all the planets in our solar system.",
    ]
    num = Math.floor(Math.random() * 20);
    let fact = facts[num];
    document.getElementById("randomFact").textContent = fact;
}

setGreeting();
updateClock();
setInterval(updateClock, 1000);

getWeather();
setInterval(getWeather, 3600000);

taskSummary();

randomFact();
document.getElementById("newFact").addEventListener("click", randomFact);