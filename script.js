const kissButton = document.getElementById("kissButton");
const kissMessage = document.getElementById("kissMessage");
const kissCountSpan = document.getElementById("kissCount");
const intensitySlider = document.getElementById("intensitySlider");
const intensityLabel = document.getElementById("intensityLabel");
const nameInput = document.getElementById("nameInput");
const nameKissBtn = document.getElementById("nameKissBtn");
const nameKissMessage = document.getElementById("nameKissMessage");
const darkModeToggle = document.getElementById("darkModeToggle");
const rainToggleBtn = document.getElementById("rainToggleBtn");
const kissCards = document.querySelectorAll(".kiss-card");

let kissCount = 0;
let heartRainEnabled = true;

const getIntensityText = (value) => {
    if (value <= 3) return "Soft, shy kisses";
    if (value <= 7) return "Medium kisses";
    return "Ultra dramatic kisses";
};

intensityLabel.textContent = getIntensityText(intensitySlider.value);

intensitySlider.addEventListener("input", () => {
    intensityLabel.textContent = getIntensityText(intensitySlider.value);
});

kissButton.addEventListener("click", () => {
    kissCount++;
    kissCountSpan.textContent = kissCount;

    const intensity = parseInt(intensitySlider.value, 10);
    const emojis =
        intensity < 400
            ? "💋💌"
            : intensity < 800
                ? "💋💋💋💋💋💋💋💋💋💋💘"
                : "💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💘💖";

    kissMessage.textContent = `You received ${emojis} kiss #${kissCount}!`;

    kissButton.classList.add("wiggle");
    setTimeout(() => kissButton.classList.remove("wiggle"), 180);

    if (heartRainEnabled) {
        spawnHeartRain();
    }
});

nameKissBtn.addEventListener("click", () => {
    const name = nameInput.value.trim() || "stranger";
    const randomSuffix = [
        "here's a VIP kiss just for you 💋",
        "you just unlocked a legendary kiss 💖",
        "extra sparkly kiss incoming 💫",
        "keep this kiss safe, it's rare 💎",
    ];
    const pick =
        randomSuffix[Math.floor(Math.random() * randomSuffix.length)];

    nameKissMessage.textContent = `${name}, ${pick}`;
});

kissCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.classList.add("active");
        const type = card.dataset.kiss || "A kiss";
        kissMessage.textContent = `${type} is floating your way 💋`;
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("active");
    });

    card.addEventListener("click", () => {
        kissCount++;
        kissCountSpan.textContent = kissCount;
        kissMessage.textContent = `You collected: ${card.dataset.kiss}`;
        if (heartRainEnabled) spawnHeartRain(5);
    });
});

darkModeToggle.addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
});

rainToggleBtn.addEventListener("click", () => {
    heartRainEnabled = !heartRainEnabled;
    rainToggleBtn.textContent = heartRainEnabled
        ? "Turn off heart rain 🌧️💖"
        : "Turn on heart rain 🌈💖";
});

function spawnHeartRain(amount = 10) {
    const emojis = ["💖", "💘", "💝", "💌", "💗"];
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("div");
        heart.className = "heart-rain";
        heart.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 2.5 + Math.random() * 2 + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4500);
    }
}
