// Sample data for aircraft ratings
const aircraftRatings = [
    { model: "Cessna 172", rating: "Private Pilot" },
    { model: "Boeing 737", rating: "Commercial Pilot" },
    { model: "Airbus A320", rating: "Airline Transport Pilot" },
    { model: "Piper PA-28", rating: "Private Pilot" },
    { model: "Cirrus SR22", rating: "Private Pilot" }
];

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    resultsDiv.innerHTML = '';
    if (!query) {
        resultsDiv.textContent = 'Please enter a search term.';
        return;
    }
    const filtered = aircraftRatings.filter(item => 
        item.model.toLowerCase().includes(query) || item.rating.toLowerCase().includes(query)
    );
    if (filtered.length === 0) {
        resultsDiv.textContent = 'No results found.';
        return;
    }
    const ul = document.createElement('ul');
    filtered.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.model} - ${item.rating}`;
        ul.appendChild(li);
    });
    resultsDiv.appendChild(ul);
});

// Simple login simulation
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (username === 'admin' && password === 'password') {
        loginMessage.style.color = 'green';
        loginMessage.textContent = 'Login successful!';
    } else {
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'Invalid username or password.';
    }
});






