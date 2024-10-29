// spa.js

const routes = {
    "/": "/login.html",
    "/login": "/login.html",
    "/exercises": "/exercises.html",
    "/edit_exercise": "/edit_exercise.html",
    "/404": "/404.html"
};

function route(event) {
    event.preventDefault();
    const path = event.target.getAttribute("href") || "/edit_exercise"; // Default to Edit page if triggered by button
    window.history.pushState({}, "", path);
    handleLocation();
}

async function handleLocation() {
    const path = window.location.pathname;
    const route = routes[path] || routes["/404"];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("app").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
