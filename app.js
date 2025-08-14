const API_URL = "YOUR_GOOGLE_SCRIPT_URL"; // Replace with your Apps Script Web App URL

document.getElementById("bookingForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Booking submitted!");
  this.reset();
  loadBookings();
});

async function loadBookings() {
  const res = await fetch(API_URL);
  const bookings = await res.json();
  const container = document.getElementById("bookings");
  container.innerHTML = bookings.map(b => `
    <p>${b["Staff Name"]} - ${b["Date"]} ${b["Time"]} - ${b["Status"]}</p>
  `).join("");
}

window.addEventListener("load", loadBookings);
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("booking-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app.js",
        "./manifest.json"
      ]);
    })
  );
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
