window.dataLayer = window.dataLayer || [];

// Fake analytics storage (for demo)
let analytics = {
  clicks: 0,
  views: 0,
  forms: 0
};

// Page view tracking
let pageName = window.location.pathname.replace(".html", "");

analytics.views++;
updateDashboard();

dataLayer.push({
  event: "page_view",
  page: pageName
});

// Click tracking
function trackClick(name) {
  analytics.clicks++;
  updateDashboard();

  dataLayer.push({
    event: "click",
    element: name
  });

  console.log("Clicked:", name);
}

// Form tracking
function trackForm(event) {
  event.preventDefault();

  analytics.forms++;
  updateDashboard();

  dataLayer.push({
    event: "form_submit"
  });

  alert("Submitted successfully!");
}

// Update dashboard UI
function updateDashboard() {
  let clickEl = document.getElementById("clickCount");
  let viewEl = document.getElementById("viewCount");
  let formEl = document.getElementById("formCount");

  if (clickEl) clickEl.innerText = analytics.clicks;
  if (viewEl) viewEl.innerText = analytics.views;
  if (formEl) formEl.innerText = analytics.forms;

  renderCharts();
}

// CHARTS 🔥
function renderCharts() {
  const ctx1 = document.getElementById("clickChart");
  const ctx2 = document.getElementById("pageChart");

  if (!ctx1 || !ctx2) return;

  // Click Chart
  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Clicks"],
      datasets: [{
        label: "User Clicks",
        data: [analytics.clicks]
      }]
    }
  });

  // Page View Chart
  new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Views", "Forms"],
      datasets: [{
        data: [analytics.views, analytics.forms]
      }]
    }
  });
}