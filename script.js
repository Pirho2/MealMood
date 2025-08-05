function updateClockDateGreeting() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  document.getElementById("clock").textContent = `${hh}:${mm}:${ss}`;
  document.getElementById("date").textContent = `${day}.${month}.${year}`;

  const totalMinutes = hours * 60 + minutes;
  const greetingText =
    totalMinutes >= 1080 || totalMinutes <= 240 // 18:00+ lub <= 4:00
      ? "Dobry Wieczór, Karolka"
      : "Dzień Dobry, Karolka";

  document.getElementById("powitanie").textContent = greetingText;
}

setInterval(updateClockDateGreeting, 1000);
updateClockDateGreeting();
const btn = document.getElementById("nastroj");
const moodBox = document.getElementById("moodBox");
const select = document.getElementById("moodSelect");

btn.addEventListener('click', () => {
  btn.style.display = 'none';
  moodBox.style.display = 'block';
});

select.addEventListener('change', (e) => {
  e.preventDefault(); // 👈 BLOKUJE odświeżenie
  const mood = encodeURIComponent(select.value);
  window.location.href = `mood.html?nastroj=${mood}`;
});
function getSeason(month) {
  if ([11, 0, 1].includes(month)) return 'zimowy';
  if ([2, 3, 4].includes(month)) return 'wiosenny';
  if ([5, 6, 7].includes(month)) return 'letni';
  if ([8, 9, 10].includes(month)) return 'jesienny';
}
const season = getSeason(new Date().getMonth());
const searchQuery = `${season} przepis dla ${mood}`;
