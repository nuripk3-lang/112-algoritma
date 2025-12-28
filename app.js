/* =========================
   SAYFA GEÇİŞLERİ
========================= */
function showGroup(grup) {
  const sections = ["yetiskin", "cocuk", "cocukDoz"];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  document.getElementById("content").innerHTML = "";

  const hedef = document.getElementById(grup);
  if (hedef) hedef.style.display = "block";
}

/* =========================
   ALGORİTMALAR
========================= */
function showAlgo(type, grup) {
  let html = `<h2>${type.toUpperCase()} – ${grup}</h2><ul>`;

  const algos = {
    aks: ["ABC", "12 derivasyon EKG", "Aspirin", "Damar yolu"],
    astim: ["O₂", "Nebül salbutamol", "Steroid"],
    koah: ["Düşük akım O₂", "Nebül", "CO₂ retansiyonuna dikkat"],
    bradikardi: ["Monitör", "Atropin", "Pacing"],
    tasikardi: ["Ritim analizi", "Adenozin / Senkronize kardiyoversiyon"],
    arrest: ["CPR", "Defibrilasyon", "Adrenalin"],
    hipovolemi: ["SF bolus", "Kanama kontrolü"],
    vertigo: ["Nörolojik değerlendirme", "Glukoz ölç"],
    yanik: ["Yanık yüzdesi", "Soğutma", "Sıvı"],
    zehir: ["ABC", "Maruziyet kes", "Ulusal Zehir Danışma"]
  };

  algos[type].forEach(adim => {
    html += `<li>${adim}</li>`;
  });

  html += "</ul>";
  document.getElementById("content").innerHTML = html;
}

/* =========================
   ARAMA
========================= */
function searchAlgo() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const buttons = document.querySelectorAll("button");

  buttons.forEach(btn => {
    const text = btn.innerText.toLowerCase();
    if (
      text.includes(query) ||
      btn.getAttribute("onclick")?.includes(query)
    ) {
      btn.style.display = "block";
    } else if (
      text.includes("yetişkin") ||
      text.includes("çocuk")
    ) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
}

/* =========================
   CPR SAYACI
========================= */
let cprInterval;
let timeLeft = 120;

function startCPR() {
  clearInterval(cprInterval);
  timeLeft = 120;
  updateCPRDisplay();
  document.getElementById("cprAlert").innerText = "";

  cprInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      playBeep();

      if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
      }

      document.getElementById("cprAlert").innerText =
        "🔔 KOMPRESYON DEĞİŞTİR";
      timeLeft = 120;
    }

    updateCPRDisplay();
  }, 1000);
}

function stopCPR() {
  clearInterval(cprInterval);
  timeLeft = 120;
  updateCPRDisplay();
  document.getElementById("cprAlert").innerText = "";
}

function updateCPRDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  document.getElementById("cprTimer").innerText = `${min}:${sec}`;
}

function playBeep() {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
  );
  audio.play();
}

/* =========================
   👶 ÇOCUK DOZ HESAPLAMA
========================= */
function hesaplaCocukDoz() {
  const kilo = Number(document.getElementById("kiloInput").value);
  const sonuc = document.getElementById("dozSonuc");

  if (!kilo || kilo <= 0) {
    sonuc.innerHTML = "";
    return;
  }

  const adrenalinAnafilaksi = (0.01 * kilo).toFixed(2); // mg IM
  const adrenalinArrest = (0.01 * kilo).toFixed(2);     // mg IV/IO
  const midazolam = (0.1 * kilo).toFixed(2);            // mg
  const amiodaron = (5 * kilo).toFixed(0);              // mg

  sonuc.innerHTML = `
    <p>⚡ <strong>Adrenalin (Anafilaksi):</strong> ${adrenalinAnafilaksi} mg IM</p>
    <p>❤️ <strong>Adrenalin (Arrest):</strong> ${adrenalinArrest} mg IV/IO</p>
    <p>💉 <strong>Midazolam:</strong> ${midazolam} mg</p>
    <p>💊 <strong>Amiodaron:</strong> ${amiodaron} mg</p>
    <small style="color:#6b7280;">
      ⚠️ Eğitim amaçlıdır. Klinik karar ekip/hekim sorumluluğundadır.
    </small>
  `;
}
