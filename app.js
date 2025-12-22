function show(id) {
  document.getElementById("yetiskin").style.display = "none";
  document.getElementById("cocuk").style.display = "none";
  document.getElementById(id).style.display = "block";
  document.getElementById("content").innerHTML = "";
}

function algo(type) {
  let html = "";

  if (type === "anafilaksi") {
    html = `
    <h2>⚡ Anafilaksi – Yetişkin</h2>
    <ul>
      <li>🔴 ABC + Yüksek akım O₂</li>
      <li>💉 Adrenalin 0.5 mg IM (1:1000)</li>
      <li>💧 IV damar yolu – SF</li>
      <li>⚠️ Stridor / hipotansiyon</li>
      <li>🕒 5 dk sonra tekrar değerlendir</li>
    </ul>`;
  }

  if (type === "arrest") {
    html = `
    <h2>❤️ Kardiyak Arrest – Yetişkin</h2>
    <ul>
      <li>🔴 Bilinç / solunum kontrolü</li>
      <li>🫀 CPR 30:2</li>
      <li>⚡ Defibrilasyon (gerekiyorsa)</li>
      <li>💉 Adrenalin 1 mg IV/IO (3–5 dk)</li>
    </ul>`;
  }

  if (type === "febril") {
    html = `
    <h2>🔥 Febril Konvülziyon – Çocuk</h2>
    <ul>
      <li>🔴 ABC değerlendirme</li>
      <li>🛌 Yan yatır</li>
      <li>💉 Midazolam (gerekiyorsa)</li>
      <li>🌡️ Ateş kontrolü</li>
    </ul>`;
  }

  document.getElementById("content").innerHTML = html;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
