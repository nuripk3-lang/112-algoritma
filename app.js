// --- app.js (Tam sürüm: görsel kontrolü ve tüm iyileştirmeler dahil) ---

/* Algoritma verisi (mevcut içerik korunmuştur; gerektiğinde genişletilebilir) */
const algorithmData = {
  yetiskin: {
    aks: { title: "🫀 Akut Koroner Sendrom (AKS)", steps: [
      {type:"step", text:"Güvenli çevre ve ABCDE değerlendirmesi yap."},
      {type:"action", text:"Hemen 12 Derivasyonlu EKG çek ve ritmi yorumla."},
      {type:"drug", text:"Aspirin: 160-325 mg (Çiğnetilerek verilir)."},
      {type:"drug", text:"Nitrat (Sistolik KB > 90 ise): İsordil 5 mg SL veya Nitrolingual 0.4 mg spreyi; 3 doz sınırı."},
      {type:"warning", text:"Sağ MI veya son 48 saatte PDE5 inhibitörü kullanımı varsa NİTRAT VERME!"},
      {type:"drug", text:"Ağrı kontrolü: Morfin 2-4 mg IV (Gerekiyorsa, maksimum 10 mg)."},
      {type:"step", text:"STEMI ise uygun merkeze nakil; KKM ile iletişim kur."}
    ]},
    astim: { title: "🫁 Astım Atağı", steps: [
      {type:"step", text:"SpO2 %94-98 olacak şekilde oksijen başla."},
      {type:"drug", text:"Salbutamol 2.5-5 mg Nebül; gerekirse tekrarla."},
      {type:"drug", text:"İpratropium 500 mcg Nebül (şiddetli atağa ek)."},
      {type:"drug", text:"Metilprednizolon 1-2 mg/kg IV (Maks 125 mg)."},
      {type:"drug", text:"Magnezyum sülfat 2 g IV (20 dk infüzyon) — ağır/ölümcül atakta düşün."},
      {type:"warning", text:"Sessiz Toraks veya bilinç bozukluğu varsa erken entübasyon düşün."}
    ]},
    koah: { title: "🌬️ KOAH Alevlenmesi", steps: [
      {type:"warning", text:"Hedef SpO2 %88-92 arası tutulmalıdır."},
      {type:"drug", text:"Salbutamol + İpratropium Kombine Nebül."},
      {type:"drug", text:"Prednol 40-80 mg IV."},
      {type:"step", text:"Solunum yetmezliği derinleşirse NIV veya entübasyon hazırlığı yap."}
    ]},
    bradikardi: { title: "💓 Bradikardi", steps: [
      {type:"decision", title:"Perfüzyon Bozuk mu?", text:"Hipotansiyon, bilinç değişikliği, şok bulgusu var mı?"},
      {type:"drug", text:"Atropin 0.5-1 mg IV (Her 3-5 dk tekrarlanabilir, maksimum 3 mg)."},
      {type:"step", text:"Atropin yanıtsızsa transkütan pacing veya inotrop destek düşün."},
      {type:"drug", text:"Alternatif: Dopamin veya Adrenalin infüzyonu (2-10 mcg/kg/dk)."}
    ]},
    tasikardi: { title: "⚡ Taşikardi", steps: [
      {type:"decision", title:"Stabilite Kontrolü", text:"Şok, KY, göğüs ağrısı veya bilinç değişikliği varsa senkronize kardiyoversiyon."},
      {type:"step", text:"Dar QRS & düzenli (SVT): vagal manevra -> Adenozin 6 mg IV hızlı; gerekirse 12 mg."},
      {type:"drug", text:"Geniş QRS/VT şüphesi: Amiodaron 150 mg IV (10 dk infüzyon) veya ACLS protokolü uygula."}
    ]},
    arrest: { title: "⚡ Kardiyak Arrest", steps: [
      {type:"action", text:"KPR 30:2 başlat; kompresyon derinliği 5-6 cm, hız 100-120/dk."},
      {type:"decision", title:"Ritim Analizi", text:"VF/nVT ise defibrilasyon; NEA/Asistoli ise adrenalin ver."},
      {type:"drug", text:"Adrenalin 1 mg IV/IO (Her 3-5 dk)."},
      {type:"drug", text:"Amiodaron 300 mg IV (ilk yükleme, 3. şok sonrası), 150 mg tekrar."},
      {type:"step", text:"5H-5T nedenlerini değerlendir ve düzelt."}
    ]},
    hipovolemi: { title: "💧 Hipovolemik Şok", steps: [
      {type:"action", text:"ABCDE, kanama kontrolü ve hızlı değerlendirme yap."},
      {type:"drug", text:"IV geniş çaplı damar yolu aç; kristalloid bolus 500-1000 ml (hızlı) ver; gerekirse tekrarla."},
      {type:"warning", text:"Travma ile ilişkili aktif kanama varsa cerrahi/kan transfüzyonu planla."}
    ]},
    vertigo: { title: "🌀 Vertigo", steps: [
      {type:"step", text:"ABCDE, nörolojik muayene ve vital bulgular."},
      {type:"drug", text:"Metoklopramid 10 mg IV veya Ondansetron 4 mg IV."},
      {type:"warning", text:"Fokal nörolojik bulgu varsa inme ayırıcı tanısını düşün."}
    ]},
    yanik: { title: "🔥 Yanık Algoritması", steps: [
      {type:"action", text:"ABCDE, yanma sürecini durdur, elbiseleri ve takıları çıkar."},
      {type:"step", text:"Yanık yüzdesini Dokuzlar Kuralı ile belirle (1. dereceyi sayma)."},
      {type:"drug", text:"Parkland formülü: 4 ml x kg x %yanık (ilk 8 saatte toplamın yarısı)."},
      {type:"warning", text:"İnhalasyon yanığı şüphesi varsa entübasyon hazırlığı yap."},
      {type:"drug", text:"Ağrı kontrolü: Morfin 0.1 mg/kg veya Fentanil 1-2 mcg/kg IV."}
    ]},
    zehir: { title: "☠️ Zehirlenme", steps: [
      {type:"action", text:"ABCDE, maruziyet öyküsü, madde tespiti; KKM ile iletişim kur."},
      {type:"step", text:"Gerekirse dekontaminasyon (aktif karbon) ve destek tedavi uygula."},
      {type:"warning", text:"Özel zehirlenmeler için antidot ve ileri destek gerekebilir."}
    ]},
    nobet: { title: "🧠 Nöbet / Status Epilepticus", steps: [
      {type:"action", text:"Travmadan koru, yan yatır, oksijen ver, kan şekeri ölç."},
      {type:"drug", text:"Midazolam IM 5-10 mg (damar yoksa) veya 2.5-5 mg IV yavaş."},
      {type:"drug", text:"Diazepam 5-10 mg IV yavaş."},
      {type:"warning", text:"Nöbet 5 dakikayı geçerse status kabul edilir."}
    ]},
    anafilaksi: { title: "⚠️ Anafilaksi", steps: [
      {type:"action", text:"Hızlı ABC, oksijen, damar yolu aç."},
      {type:"drug", text:"Adrenalin IM 0.3-0.5 mg (1:1000) hemen; 5-15 dk aralıklarla tekrarlanabilir."},
      {type:"drug", text:"H1 Antihistaminik: Difenhidramin 25-50 mg IV/IM (adjunkt)."},
      {type:"drug", text:"H2 Antihistaminik: Famotidin 20 mg IV (adjunkt)."},
      {type:"drug", text:"Steroid: Metilprednizolon 1-2 mg/kg IV (maks ~125 mg)."},
      {type:"warning", text:"Antihistaminikler epinefrinin yerini almaz."}
    ]},
    travma: { title: "🚑 Travmalı Hasta", steps: [
      {type:"action", text:"Olay yeri güvenliği, immobilizasyon, ABCDE, kanama kontrolü yap."},
      {type:"step", text:"Şok bulgusu varsa hızlı sıvı desteği ve uygun merkeze öncelikli nakil."},
      {type:"warning", text:"Kafa travması, toraks travması veya instabil pelvis varsa özel protokoller uygula."}
    ]},
    crush: { title: "🧱 Crush Sendromu", steps: [
      {type:"action", text:"Kompresyon kaldırıldıysa hızlı sıvı resüsitasyonu başlat."},
      {type:"drug", text:"Hiperkalemi riski için EKG, kalsiyum glukonat 10% 10 ml IV (gerekirse), insülin + dekstroz protokollerini düşün."},
      {type:"warning", text:"Myoglobinüri ve böbrek yetmezliği riskine karşı idrar çıkışını takip et."}
    ]},
    kafa: { title: "🧠 Kafa Travması", steps: [
      {type:"action", text:"ABCDE, GKS değerlendirmesi, pupil muayenesi ve nörolojik takip yap."},
      {type:"warning", text:"GKS ≤ 8 ise entübasyon düşün; artan KİBAS bulgularında hızlı nakil."},
      {type:"step", text:"Antikoagülan kullanımı varsa kanama riski ve tersine çevirme planla."}
    ]}
  },

  cocuk: {
    aks: { title: "🫀 Pediatrik AKS (Nadir)", steps: [
      {type:"step", text:"ABCDE, EKG ve vital takip; ağrı kontrolü ve uygun merkeze nakil düşün."}
    ]},
    astim: { title: "🫁 Pediyatrik Astım", steps: [
      {type:"drug", text:"Salbutamol: <20 kg 2.5 mg; ≥20 kg 5 mg Nebül."},
      {type:"drug", text:"İpratropium: <20 kg 250 mcg; ≥20 kg 500 mcg Nebül."},
      {type:"drug", text:"Metilprednizolon 1 mg/kg IV veya IM (Maks 60 mg)."},
      {type:"warning", text:"Yanıt yoksa Magnezyum Sülfat 40-50 mg/kg (maks 2 g) 20 dk infüzyon düşünülebilir."}
    ]},
    koah: { title: "🌬️ Pediatrik KOAH", steps: [
      {type:"step", text:"SpO2 hedefi yaşa göre ayarla; destekleyici oksijen ve nebül tedavisi uygula."}
    ]},
    bradikardi: { title: "💓 Pediatrik Bradikardi", steps: [
      {type:"action", text:"ABCDE, oksijen, ventilasyon desteği; KŞ kontrolü."},
      {type:"drug", text:"Atropin 0.02 mg/kg IV (min 0.1 mg, maks 1 mg)."}
    ]},
    tasikardi: { title: "⚡ Pediatrik Taşikardi", steps: [
      {type:"decision", title:"Stabil mi?", text:"Şok, bilinç değişikliği, göğüs ağrısı varsa senkronize kardiyoversiyon."},
      {type:"drug", text:"Adenozin 0.1 mg/kg IV (maks 6 mg) hızlı bolus; gerekirse 0.2 mg/kg."}
    ]},
    arrest: { title: "⚡ Pediyatrik Arrest", steps: [
      {type:"action", text:"KPR 15:2 (iki kurtarıcı) veya 30:2 (tek kurtarıcı)."},
      {type:"step", text:"Defibrilasyon: 2 J/kg ilk şok, 4 J/kg ikinci, sonraki maks 10 J/kg."},
      {type:"drug", text:"Adrenalin 0.01 mg/kg IV/IO (1:10.000 formdan 0.1 ml/kg)."}
    ]},
    hipovolemi: { title: "💧 Pediatrik Hipovolemik Şok", steps: [
      {type:"action", text:"Kristalloid bolus 20 ml/kg IV hızlı; yanıt yoksa tekrarla ve kan transfüzyonu düşün." }
    ]},
    vertigo: { title: "🌀 Pediatrik Vertigo", steps: [
      {type:"drug", text:"Ondansetron 0.1 mg/kg IV (maks 4 mg) — bulantı varsa."}
    ]},
    yanik: { title: "🔥 Pediatrik Yanık", steps: [
      {type:"step", text:"Modifiye Dokuzlar ile alan hesabı yap; hipotermiye dikkat."},
      {type:"drug", text:"Sıvı: 3-4 ml x kg x %yanık (ilk 24 saatte, izotonik)."},
      {type:"warning", text:"Avuç içi kuralı: Çocuğun el ayası vücudunun ~%1'idir."}
    ]},
    zehir: { title: "☠️ Pediatrik Zehirlenme", steps: [
      {type:"action", text:"Maruziyet öyküsü, madde tespiti; ABCDE ve KŞ kontrolü."},
      {type:"drug", text:"Difenhidramin 1 mg/kg IV/IM (maks 50 mg) H1 olarak düşünülebilir; antidotlar KKM ile koordine edilir." }
    ]},
    anafilaksi: { title: "⚠️ Pediatrik Anafilaksi", steps: [
      {type:"action", text:"Hızlı ABC, oksijen, damar yolu aç."},
      {type:"drug", text:"Adrenalin IM 0.01 mg/kg (1:1000), maksimum 0.3 mg; tekrarlanabilir."},
      {type:"drug", text:"H1 Antihistaminik: Difenhidramin 1 mg/kg IV/IM (maks 50 mg)."},
      {type:"drug", text:"H2 Antihistaminik: Famotidin 0.5 mg/kg IV (kurum protokolüne göre)."},
      {type:"drug", text:"Steroid: Metilprednizolon 1 mg/kg IV (maks ~60 mg pediatrik)."}
    ]},
    travma: { title: "🚑 Pediatrik Travma", steps: [
      {type:"action", text:"Olay yeri güvenliği, immobilizasyon, ABCDE, kanama kontrolü yap."},
      {type:"warning", text:"Çocuklarda hipotermiye dikkat; ısıtma ve hızlı nakil planla."}
    ]},
    crush: { title: "🧱 Pediatrik Crush Sendromu", steps: [
      {type:"action", text:"Kompresyon kaldırıldıysa sıvı desteği başlat (20 ml/kg kristalloid)."},
      {type:"warning", text:"Hiperkalemi ve böbrek yetmezliği riskine karşı takip et."}
    ]},
    kafa: { title: "🧠 Pediatrik Kafa Travması", steps: [
      {type:"action", text:"GKS, pupil, nörolojik takip; ciddi ise entübasyon ve hızlı nakil."},
      {type:"warning", text:"Bebeklerde kusma, uyku hali, nöbet gibi bulgular önemlidir."}
    ]},
    nobet: { title: "🧠 Pediyatrik Nöbet", steps: [
      {type:"action", text:"ABCDE, havayolu güvenliği, KŞ ölçümü; KŞ <60 mg/dL ise dekstroz ver."},
      {type:"drug", text:"Diazepam 0.2 mg/kg IV veya 0.5 mg/kg rektal (maks 10 mg)."},
      {type:"drug", text:"Midazolam 0.1 mg/kg IV veya 0.2 mg/kg IM/bukkal."}
    ]}
  }
};

/* Yardımcı: HTML escape */
function escapeHtml(str) {
  if (!str && str !== 0) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* Görsel kontrolü: verilen yolun geçerli bir resim olup olmadığını test eder */
function imageExists(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = encodeURI(src);
  });
}

/* Arama: data-key, data-tags ve buton metnine göre filtreler */
function searchAlgo() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  document.querySelectorAll("button").forEach(btn => {
    const onclick = btn.getAttribute("onclick") || "";
    if (!onclick.includes("showAlgo")) return;
    const key = (btn.getAttribute("data-key") || '').toLowerCase();
    const tags = (btn.getAttribute("data-tags") || '').toLowerCase();
    const text = (btn.textContent || btn.innerText || '').toLowerCase();
    const match = !q || text.includes(q) || key.includes(q) || tags.includes(q);
    btn.style.display = match ? 'inline-block' : 'none';
  });
}

/* Algoritma gösterme: async olarak görsel kontrolü yapar ve içerik ekler */
async function showAlgo(key, grupName) {
  const grupKey = (grupName && grupName.toLowerCase().startsWith('y')) ? 'yetiskin' : 'cocuk';
  const algo = (algorithmData[grupKey] || {})[key];
  const contentEl = document.getElementById("content");
  if (!algo) {
    contentEl.innerHTML = `<button class="back-btn" onclick="clearContent()">⬅️ Geri Dön</button>
                           <div class="step-box">Bu algoritma için veri bulunamadı.</div>`;
    contentEl.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  let html = `<button class="back-btn" onclick="clearContent()">⬅️ Geri Dön</button>
              <h2 style="color:#b91c1c; margin-bottom:12px;">${escapeHtml(algo.title)}</h2>
              <div class="algo-container">`;

  algo.steps.forEach(step => {
    const titlePart = step.title ? `<span class="decision-title">${escapeHtml(step.title)}</span>` : '';
    if (step.type === 'drug') {
      html += `<div class="drug-box">💊 ${titlePart}${escapeHtml(step.text)}</div>`;
    } else if (step.type === 'warning') {
      html += `<div class="warning-box">⚠️ ${titlePart}${escapeHtml(step.text)}</div>`;
    } else if (step.type === 'decision') {
      html += `<div class="decision-box"><strong>${escapeHtml(step.title)}</strong><div style="margin-top:6px;">${escapeHtml(step.text)}</div></div>`;
    } else if (step.type === 'action') {
      html += `<div class="step-box">✅ ${titlePart}${escapeHtml(step.text)}</div>`;
    } else {
      html += `<div class="step-box">🔹 ${titlePart}${escapeHtml(step.text)}</div>`;
    }
  });

  // Yanık için görsel ekleme mantığı
  if (key === 'yanik') {
    // önerilen dosya adları (aşağıda ayrıca listelenecek)
    const resimYetişkin = "img/yanik_yuzdesi.jpg";
    const resimCocuk = "img/yanik_cocuk.jpg";
    const chosen = (grupKey === 'yetiskin') ? resimYetişkin : resimCocuk;
    const exists = await imageExists(chosen);
    if (exists) {
      html += `<div style="margin-top:14px; padding:12px; background:#fff; border-radius:12px; text-align:center;">
                 <h4 style="margin:0 0 8px 0; color:#1e40af;">📊 Alan Hesaplama Rehberi</h4>
                 <img src="${encodeURI(chosen)}" alt="Yanık Şeması" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #eee;">
               </div>`;
    } else {
      html += `<div style="margin-top:14px; padding:12px; background:#fff; border-radius:12px; text-align:center;">
                 <h4 style="margin:0 0 8px 0; color:#1e40af;">📊 Alan Hesaplama Rehberi</h4>
                 <div class="warning-box">Görsel bulunamadı. Lütfen 'img' klasörünü ve dosya adını kontrol edin.</div>
               </div>`;
    }
  }

  html += `</div>`;
  contentEl.innerHTML = html;
  contentEl.style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Çocuk doz hesaplayıcı */
function hesaplaCocukDoz() {
  const input = document.getElementById("kiloInput");
  const out = document.getElementById("dozSonuc");
  const k = Number(input.value);
  if (!input.value || isNaN(k) || k <= 0) {
    out.innerHTML = '';
    return;
  }
  if (k > 200) {
    out.innerHTML = `<div class="warning-box">Girilen kilo çok yüksek görünüyor. Lütfen kontrol edin.</div>`;
    return;
  }

  const diazepamIV = (0.2 * k);
  const diazepamRect = (0.5 * k);
  const adrenalinMg = (0.01 * k);
  const dekstrozMin = Math.round(2 * k);
  const dekstrozMax = Math.round(5 * k);
  const sfBolus = Math.round(20 * k);
  const parasetamol = Math.round(15 * k);

  out.innerHTML = `<div style="background:#fff; padding:12px; border-radius:12px; border-top:6px solid #b91c1c;">
    <h3 style="margin-top:0;">💉 ${k} kg İçin Kritik Dozlar (Hızlı Referans)</h3>
    <p><strong>Diazepam (IV):</strong> ${diazepamIV.toFixed(1)} mg</p>
    <p><strong>Diazepam (Rektal):</strong> ${diazepamRect.toFixed(1)} mg</p>
    <p><strong>Adrenalin (Arrest):</strong> ${adrenalinMg.toFixed(3)} mg (1:10.000 formdan 0.1 ml/kg)</p>
    <p><strong>Dekstroz %10:</strong> ${dekstrozMin} - ${dekstrozMax} ml IV</p>
    <p><strong>SF Bolus:</strong> ${sfBolus} ml (20 ml/kg)</p>
    <p><strong>Parasetamol:</strong> ${parasetamol} mg (tek doz)</p>
  </div>`;
}

/* Grup gösterme ve içerik temizleme */
function showGroup(g) {
  const yet = document.getElementById("yetiskin");
  const coc = document.getElementById("cocuk");
  const content = document.getElementById("content");
  if (yet) yet.style.display = "none";
  if (coc) coc.style.display = "none";
  const target = document.getElementById(g);
  if (target) target.style.display = "block";
  if (content) content.style.display = "none";
  document.getElementById("searchInput").value = "";
  searchAlgo();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearContent() {
  const content = document.getElementById("content");
  if (content) {
    content.style.display = "none";
    content.innerHTML = '';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* CPR sayaçları */
let cprInterval = null;
let cprRemaining = 120;

function formatTime(s) {
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function updateCPRDisplay() {
  const timerEl = document.getElementById("cprTimer");
  const alertEl = document.getElementById("cprAlert");
  if (timerEl) timerEl.textContent = formatTime(cprRemaining);
  if (cprRemaining <= 0 && alertEl) {
    alertEl.textContent = "🔔 2 dakika tamamlandı — ritim kontrolü ve ekip değişimi düşün.";
    stopCPR();
    if (navigator.vibrate) {
      try { navigator.vibrate([200,100,200]); } catch(e) {}
    }
  } else if (alertEl) {
    alertEl.textContent = "";
  }
}

function startCPR() {
  if (cprInterval) return;
  if (cprRemaining <= 0) cprRemaining = 120;
  updateCPRDisplay();
  cprInterval = setInterval(() => {
    cprRemaining--;
    updateCPRDisplay();
  }, 1000);
}

function stopCPR() {
  if (cprInterval) {
    clearInterval(cprInterval);
    cprInterval = null;
  }
}

function resetCPR() {
  stopCPR();
  cprRemaining = 120;
  updateCPRDisplay();
}

/* Başlangıç ayarları */
document.addEventListener('DOMContentLoaded', () => {
  updateCPRDisplay();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const s = document.getElementById('searchInput');
      if (s) { s.focus(); e.preventDefault(); }
    }
    if (e.key === 'Escape') {
      clearContent();
      const s = document.getElementById('searchInput');
      if (s) s.blur();
    }
  });
});
