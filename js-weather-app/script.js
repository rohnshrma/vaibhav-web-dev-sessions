let responseBox = document.querySelector("#response-data");
let loadingBox = document.querySelector("#loading");

function sendRequest(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6176d074d272ffb7969552b9f68b0a31&units=metric`;
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(new Error("City not found. Check your coordinates."));
        }
      }
    });
    request.open("GET", url);
    request.send();
  });
}

// Map weather condition code to emoji
function getWeatherEmoji(iconCode) {
  const map = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return map[iconCode] || "🌍";
}

// Get neon color class based on temperature
function getTempColor(temp) {
  if (temp <= 0) return "#00f5ff";
  if (temp <= 10) return "#7b2ff7";
  if (temp <= 20) return "#00ff88";
  if (temp <= 30) return "#ffcc00";
  return "#ff2d78";
}

const handleRequest = async (city) => {
  try {
    // Reset & show loading
    document.querySelector("#city").value = "";
    responseBox.classList.add("hidden");
    loadingBox.classList.remove("hidden");

    const data = await sendRequest(city);
    loadingBox.classList.add("hidden");

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const emoji = getWeatherEmoji(data.weather[0].icon);
    const tempColor = getTempColor(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeed = data.wind?.speed ?? "—";
    const feelsLike = data.main.feels_like;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const cityName = data.name;
    const country = data.sys?.country ?? "";

    const content = `
      <div class="weather-card">

        <div class="weather-hero">
          <div class="weather-icon-wrap">
            <img src="${iconUrl}" alt="${description}" />
          </div>

          <div class="weather-hero-info">
            <div class="city-name">${cityName}</div>
            <div class="city-coords">${country} · ${data.coord?.lat?.toFixed(2) ?? "—"}°N, ${data.coord?.lon?.toFixed(2) ?? "—"}°E</div>
          </div>

          <div class="temp-display">
            <div class="temp-value" style="background: linear-gradient(135deg, ${tempColor}, var(--neon-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              ${temp}<span class="temp-unit" style="-webkit-text-fill-color: initial; color: var(--text-secondary);">°C</span>
            </div>
          </div>
        </div>

        <div class="weather-stats">
          <div class="stat-item">
            <span class="stat-icon">🌡️</span>
            <span class="stat-value">${feelsLike}°</span>
            <span class="stat-label">Feels Like</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">💧</span>
            <span class="stat-value">${humidity}%</span>
            <span class="stat-label">Humidity</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">💨</span>
            <span class="stat-value">${windSpeed} m/s</span>
            <span class="stat-label">Wind</span>
          </div>
        </div>

        <div class="weather-desc">
          <span class="desc-label">CONDITION</span>
          <span class="desc-value">${emoji} ${description.toUpperCase()}</span>
        </div>

      </div>
    `;

    responseBox.innerHTML = content;
    responseBox.classList.remove("hidden");
  } catch (err) {
    loadingBox.classList.add("hidden");

    const errorContent = `
      <div class="error-box">
        <span class="error-icon">⚠️</span>
        <div class="error-title">SCAN FAILED</div>
        <div class="error-msg">${err.message || "Unable to retrieve atmospheric data."}</div>
      </div>
    `;

    responseBox.innerHTML = errorContent;
    responseBox.classList.remove("hidden");
  }
};
