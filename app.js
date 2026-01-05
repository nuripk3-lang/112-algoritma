// --- app.js (Yetişkin algoritmaları korunmuş, Çocuk algoritmaları ÇİLYAD detaylarıyla güncellenmiş tam sürüm) ---

const algorithmData = {
   yetiskin: {
    aks: { category: "cardiac", title: "🫀 Akut Koroner Sendrom (AKS)", steps: [
      {type:"step", text:"Güvenli çevre ve ABCDE değerlendirmesi yap."},
      {type:"action", text:"✅ Hemen 12 Derivasyonlu EKG çek ve ritmi yorumla (İlk 10 dakika hedefi)."},
      {type:"drug", text:"💊 Aspirin: 300 mg (Çiğnetilerek verilir; kontrendikasyon yoksa)."},
      {type:"drug", text:"💊 Nitrat (Sistolik KB > 90 ise): İsordil 5 mg SL veya Nitrolingual 0.4 mg sprey; 5 dk arayla max 3 doz."},
      {type:"warning", text:"⚠️ Sağ MI veya son 48 saatte PDE5 inhibitörü (ör. Viagra) kullanımı varsa NİTRAT VERME!"},
      {type:"drug", text:"💊 Ağrı kontrolü: Morfin 2-4 mg IV (Yavaş infüzyon, gerekiyorsa tekrarlanır)."},
      {type:"step", text:"🔹 STEMI ise: Uygun merkeze (PCI/Anjiyo merkezi) nakli başlat ve KKM ile iletişim kur."},
      {type:"note", text:"ÖNEMLİ: Oksijen yalnızca SpO2 <%94 veya solunum sıkıntısı varsa verilir."},
      {type:"note", text:"Sağ Ventrikül MI: İnferior MI (D2, D3, aVF) varsa sağ derivasyonları (V3R, V4R) kontrol et; hipotansiyon varsa SF ile sıvı yüklemesi düşün."},
      {type:"note", text:"Damar Yolu: Anjiyo girişimi genellikle sağ koldan yapıldığı için tercihen sol koldan damar yolu aç."}
    ]},
    astim: { category: "respiratory", title: "🫁 Astım Atağı", steps: [
      {type:"step", text:"SpO2 %94-98 olacak şekilde oksijen başla."},
      {type:"drug", text:"Salbutamol 2.5-5 mg Nebül; gerekirse tekrarla."},
      {type:"drug", text:"İpratropium 500 mcg Nebül (şiddetli atağa ek)."},
      {type:"drug", text:"Metilprednizolon 1-2 mg/kg IV (Maks 125 mg)."},
      {type:"drug", text:"Magnezyum sülfat 2 g IV (20 dk infüzyon) — ağır/ölümcül atakta düşün."},
      {type:"warning", text:"Sessiz Toraks veya bilinç bozukluğu varsa erken entübasyon düşün."}
    ]},
    koah: { category: "respiratory", title: "🌬️ KOAH Alevlenmesi", steps: [
      {type:"warning", text:"Hedef SpO2 %88-92 arası tutulmalıdır."},
      {type:"drug", text:"Salbutamol + İpratropium Kombine Nebül."},
      {type:"drug", text:"Prednol 40-80 mg IV."},
      {type:"step", text:"Solunum yetmezliği derinleşirse NIV veya entübasyon hazırlığı yap."}
    ]},
    bradikardi: { category: "cardiac", title: "💓 Bradikardi", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap. (Havayolu ve solunumu destekle, monitorize et)."},
      {type:"decision", title:"Perfüzyon Bozuk mu?", text:"✅ Perfüzyon Bozuk mu? Hipotansiyon, bilinç değişikliği, şok bulgusu, iskemik göğüs ağrısı veya akut kalp yetmezliği var mı?"},
      {type:"drug", text:"💊 Atropin: 0.5 mg IV (Her 3-5 dakikada bir tekrarlanabilir, maksimum 3 mg)."},
      {type:"step", text:"🔹 Atropin yanıtsızsa: Beklemeden Transkütan Pacing (TCP) hazırlığına başla veya inotrop destek düşün."},
      {type:"drug", text:"💊 Alternatif İnfüzyonlar: Dopamin 2-10 mcg/kg/dk veya Adrenalin 2-10 mcg/kg/dk infüzyonu."},
      {type:"step", text:"🔹 Nedene Yönelik Tedavi: Altta yatan nedeni (ilaç intoksikasyonu, elektrolit bozukluğu vb.) araştır ve uzman konsültasyonu iste."},
      {type:"warning", text:"🚨 Asistoli Riski: Eğer Mobitz Tip II AV Blok, 3. Derece Kalp Bloğu veya 3 saniyeden uzun ventriküler duraklama varsa, Atropin yanıtını beklemeden doğrudan Pacing hazırlığı yap."},
      {type:"warning", text:"Pacing ve Sedasyon: Transkütan Pacing (TCP) ağrılıdır; hasta uyanıksa sedasyon ve analjezi planla."},
      {type:"warning", text:"Atropin Dozu: Atropin'in 0.5 mg'dan az dozlarda uygulanması paradoksal bradikardiye yol açabilir."},
      {type:"warning", text:"İlaç Etkileşimleri: Kalp nakli yapılmış hastalarda Atropin etkisiz olabilir; bu durumda doğrudan pacing veya adrenalin/izoprenalin gibi ajanlar düşün."}
    ]},
    tasikardi: { category: "cardiac", title: "⚡ Taşikardi", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap. (Oksijen desteği sağla, monitorize et, damar yolu aç)."},
      {type:"decision", title:"Stabilite Kontrolü", text:"✅ Stabilite Kontrolü: Şok bulguları, Hipotansiyon, Akut Kalp Yetmezliği, İskemik Göğüs Ağrısı veya Bilinç değişikliği var mı?"},
      {type:"action", text:"⚡ UNSTABİL ise: Vakit kaybetmeden Senkronize Kardiyoversiyon uygula. (Cihazı 'Sync' moduna almayı unutma!)."},
      {type:"step", text:"🔹 Dar QRS & Düzenli (SVT Şüphesi): Hasta stabilse önce Vagal Manevralar uygula."},
      {type:"drug", text:"💊 Adenozin: 6 mg IV hızlı bolus; yanıt yoksa 12 mg; yine yanıt yoksa bir kez daha 12 mg uygula. (Her doz sonrası 20 cc SF hızlıca verilir)."},
      {type:"step", text:"🔹 Geniş QRS / VT Şüphesi: Hasta stabilse Amiodaron 300 mg IV (bazı protokollerde 150 mg ile başlanır; 10-20 dk içinde infüzyon yapılabilir)."},
      {type:"step", text:"🔹 Ritim Kontrolü: 12 derivasyonlu EKG çekerek ritmi (Atrial Fibrilasyon, Flutter vb.) netleştir ve uzman konsültasyonu iste."},
      {type:"note", text:"⚡ Senkronize Kardiyoversiyon Hazırlık: Hastayı bilgilendir ve mümkünse sedasyon/analjezi uygula."},
      {type:"note", text:"Sync Modu: Defibrilatörü aç ve 'SYNC' tuşuna bas. Monitörde her R dalgasının üzerinde bir işaret olduğunu doğrula."},
      {type:"note", text:"Enerji Seçimi: Dar Düzenli (SVT/A. Flutter): 50-100 J; Dar Düzensiz (A. Fibrilasyon): 120-200 J; Geniş Düzenli (VT): 100 J."},
      {type:"warning", text:"🚨 Senkronizasyon Şart: Eğer cihaz 'Sync' modunda değilse, şok T dalgası üzerine denk gelerek hastayı VF'ye sokabilir."},
      {type:"note", text:"Adenozin Uygulaması: Adenozin kısa yarı ömürlüdür; kalbe en yakın büyük venden (tercihen antekübital) uygulanmalı ve hemen arkasından hızlı flush yapılmalıdır."},
      {type:"warning", text:"Amiodaron: VT vakalarında Amiodaron uygulanırken tansiyon yakından izlenmelidir (hipotansiyon yapabilir)."},
      {type:"warning", text:"Nabızsız VT: Geniş kompleksli taşikardide nabız yoksa arrest protokolüne geç (şoklanabilir ritim protokolü)."}
    ]},
    arrest: { category: "cardiac", title: "⚡ Kardiyak Arrest", steps: [
      {type:"action", text:"✅ KPR 30:2 başlat: Göğüs kompresyonu derinliği 5-6 cm, hız 100-120/dk. Tam geri gelmeye izin ver; kesintileri minimize et."},
      {type:"action", text:"✅ Ritim Analizi: Defibrilatör bağlandığında ritmi değerlendir."},
      {type:"decision", title:"VF / Nabızsız VT (Şoklanabilir)", text:"Hemen Şok uygula (Monofazik 360 J; Bifazik 150-200 J). Şoktan hemen sonra beklemeden 2 dk KPR yap."},
      {type:"decision", title:"NEA / Asistoli (Şoklanamaz)", text:"Şok uygulama. Hemen 2 dk KPR yap ve en kısa sürede Adrenalin ver."},
      {type:"drug", text:"💊 Adrenalin: 1 mg IV/IO (Her 3-5 dakikada bir; KPR döngüsü sırasında uygulanır)."},
      {type:"drug", text:"💊 Amiodaron: VF/nVT devam ediyorsa 3. şok sonrası 300 mg IV/IO; hala devam ediyorsa 5. şok sonrası 150 mg IV/IO uygula."},
      {type:"step", text:"🔹 5H - 5T nedenlerini değerlendir ve düzelt: Hipovolemi, Hipoksi, Asidoz, Elektrolit bozuklukları (H/K), Hipotermi; Tansiyon pnömotoraks, Tamponad, Toksinler, Pulmoner tromboz, Koroner tromboz."},
      {type:"step", text:"✅ İleri Havayolu: Entübasyon veya SGA yerleştirilirse kompresyonu kesmeden dakikada 10 soluk (6 saniyede bir) ver."},
      {type:"note", text:"EtCO2 İzlemi: Kapnografi varsa ani EtCO2 yükselmesi (>40 mmHg) ROSC için güvenilir belirtidir."},
      {type:"warning", text:"🚨 Şoktan Sonra Nabız Bakma: Şok uygulandıktan hemen sonra nabız kontrolü yapma; doğrudan 2 dakika KPR'ye devam et. Nabız kontrolü yalnızca 2 dakikalık periyot sonunda ritim değişikliği varsa yapılır."},
      {type:"note", text:"Yüksek Kaliteli KPR: Her 2 dakikada bir kompresyon yapan kişiyi değiştir; kesintileri en aza indir."},
      {type:"note", text:"Adrenalin Zamanlaması: Şoklanamaz ritimlerde adrenalin mümkün olan en kısa sürede; şoklanabilir ritimlerde adrenalin genellikle 2. şoktan sonra başlanır."}
    ]},
    hipovolemi: { category: "shock", title: "💧 Hipovolemik Şok", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap: Travmanın birincil bakısını tamamla, kanama odağını belirle."},
      {type:"action", text:"✅ Kanamayı Durdur: Dış kanama varsa direkt bası, sıkı bandaj veya gerekirse turnike uygula."},
      {type:"decision", title:"Şok Belirtileri", text:"✅ Şok belirtilerini kontrol et: Bilinç değişikliği, taşikardi, soğuk-nemli cilt, uzamış kapiller dolum zamanı var mı?"},
      {type:"step", text:"🔹 Pozisyon ve Isı Kontrolü: Hastayı düz yatır (kontrendikasyon yoksa bacakları yükselt) ve hipotermiden korumak için üzerini ört."},
      {type:"action", text:"✅ Yüksek Akımlı Oksijen: Oksijen desteği sağla ve SpO2 takibi yap."},
      {type:"action", text:"💉 Damar Yolu: En az iki adet geniş çaplı (14-16 G) IV hat aç. IV açılamıyorsa IO (intraosseöz) yol dene."},
      {type:"drug", text:"💊 Sıvı Resüsitasyonu (Erişkin): Başlangıç olarak 1 litre ısıtılmış izotonik kristaloid (SF/RL) ver; yanıtı değerlendir. Gerektiğinde tekrarla, ancak aşırı sıvıdan kaçın."},
      {type:"drug", text:"💊 Sıvı Resüsitasyonu (Çocuk): 20 ml/kg izotonik kristaloid bolus uygula; yanıtı değerlendir ve gerektiğinde tekrarla."},
      {type:"note", text:"🔹 Permisif Hipotansiyon: Kanama kontrol altına alınana kadar tansiyonu çok yükseltme; hedef sistolik KB genellikle 80-90 mmHg civarıdır (duruma göre kurum protokolü ile uyumlu hareket et)."},
      {type:"warning", text:"🚨 Ölümcül Üçleme (Lethal Triad): Hipotermi, Asidoz ve Koagülopatiyi önlemek hayati önem taşır. Hastayı sıcak tutmak, kanama kontrolü ve uygun kan ürünleri yönetimi önceliklidir."},
      {type:"note", text:"🔹 Gizli Kanama Odakları: Dışarıda kan yoksa Göğüs, Batın, Pelvis ve Uzun Kemikler (Femur) odaklan. Pelvis kırığı şüphesinde pelvik kemer kullan."},
      {type:"note", text:"🔹 Nabız ve Tansiyon: Tansiyon düşmesi geç bir bulgudur; erken belirtiler taşikardi ve daralmış nabız basıncı olabilir."},
      {type:"warning", text:"⚠️ Kristaloid Sınırı: Aşırı kristaloid verilmesi dilüsyonel koagülopatiye yol açabilir. 'Kontrollü sıvı' ve kanama kontrolü stratejisini takip et; gerektiğinde kan ürünleri ve cerrahi/embolizasyon planla."}
    ]},
    crush: { category: "trauma", title: "🧱 Crush (Ezilme) Sendromu", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap: Olay yerinde ikincil çökme riskine karşı dikkatli ol."},
      {type:"action", text:"✅ Kurtarma Öncesi Sıvı Resüsitasyonu: Ezilme altındaki ekstremite serbestleşmeden önce damar yolunu aç ve erişkinde 1 L/saat hızla izotonik SF başlat; çocukta 15-20 ml/kg/saat hızla başlat."},
      {type:"action", text:"✅ Kompresyon Kaldırıldıktan Sonra: Bası kalktığı an açığa çıkacak toksinlerin (K+, miyoglobin vb.) dolaşıma karışacağını unutma; hızlı sıvı resüsitasyonuna agresif şekilde devam et."},
      {type:"action", text:"💊 Hiperkalemi Yönetimi: EKG takibi yap; sivri T dalgaları veya geniş QRS varsa Kalsiyum Glukonat %10 10 ml IV (kalbi korumak için) uygula. İnsülin + dekstroz protokollerini düşün."},
      {type:"action", text:"💊 Diğer Önlemler: Hiperkalemi riskine karşı sürekli EKG, idrar çıkışı takibi başlat (hedef erişkinde 100-200 ml/saat). Gerekirse idrar çıkışını artırmak için idrar sondası veya diüretik düşün."},
      {type:"note", text:"⚠️ Sıvı Seçimi: Hipovolemiyi düzeltmek için potasyum içeren (ör. Laktatlı Ringer) sıvılardan kaçın; sadece izotonik SF kullan."},
      {type:"warning", text:"🚨 Reperfüzyon Hasarı: Bası kalktığında dolaşıma karışacak toksinler ani metabolik bozukluklara yol açabilir; elektrolitleri, asidozu ve renal fonksiyonu yakından izle."},
      {type:"note", text:"🔹 Böbrek Koruması: Myoglobinüri ve akut böbrek yetmezliği riskine karşı idrar çıkışını hedefle (100-200 ml/saat erişkin hedefi); gerektiğinde nefroloji/yoğun bakım ile koordinasyon."},
      {type:"warning", text:"⚠️ İzlem ve Transfer: Ciddi ezilme vakalarında erken yoğun bakım ve nefroloji konsültasyonu; gerektiğinde hemodiyaliz hazırlığı yap." }
    ]},
    kafa: { category: "neuro", title: "🧠 Kafa Travması (Yetişkin)", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap: Olay yeri güvenliğini sağla, C-spine immobilizasyonunu düşün."},
      {type:"action", text:"✅ Havayolu ve C-spine: Bilinci azalmış veya GKS ≤ 8 olan hastada erken entübasyon düşün; entübasyon sırasında C-spine immobilizasyonunu koru."},
      {type:"decision", title:"GKS Değerlendirmesi", text:"GKS (Glasgow Coma Scale) hesapla; GKS ≤ 8 ise ileri havayolu ve hızlı nakil planla."},
      {type:"action", text:"✅ Pupiller ve Nöro Muayene: Pupillerin büyüklüğünü, simetrisini ve ışık refleksini kontrol et; fokal nörolojik bulgular için ayrıntılı muayene yap."},
      {type:"action", text:"✅ Vital ve Solunum Yönetimi: Oksijen ver; SpO2 hedefi ≥ 94% (entübasyon gerekiyorsa ventilasyon parametrelerine dikkat et). Hipoksi ve hipotansiyondan kaçın."},
      {type:"action", text:"✅ Kan Basıncı ve Perfüzyon: Sistolik KB < 90 mmHg ise hipotansiyonun düzeltilmesi önceliklidir; hipotansiyon beyin perfüzyonunu bozar ve mortaliteyi artırır."},
      {type:"step", text:"🔹 Kanama Kontrolü ve Yaralanma Değerlendirmesi: Aktif dış kanama varsa kontrol et; kafa derisi yaralanmaları kan kaybına neden olabilir."},
      {type:"action", text:"✅ Görüntüleme: Stabil hastada hızlı BT kafa (non-contrast CT) çekilmesi için hazırlık yap; instabil hastada stabilizasyon önceliklidir."},
      {type:"decision", title:"Cerrahi Gerekli mi?", text:"BT'de epidural/subdural hematom, büyük intrakraniyal kanama, kitlesel lezyon veya artan KİBAS bulguları varsa nöroşirürji konsültasyonu ve acil cerrahi değerlendirme gereklidir."},
      {type:"action", text:"💊 İlaç ve Metabolik Yönetim: Antikoagülan/antiplatelet öyküsü varsa tersine çevirme (protrombin kompleks konsantresi, vitamin K, taze donmuş plazma vb.) planla; hiperglisemi ve hiponatremiden kaçın."},
      {type:"action", text:"💊 KİBAS ve Herniasyon Bulguları: Ani pupiller asimetri, azalan bilinç, Cushing triadı (hipertansiyon, bradikardi, düzensiz solunum) varsa acil müdahale; gerekirse mannitol 0.5-1 g/kg IV veya hipertonik salin (3%) titrasyonla düşün (uzman yönlendirmesiyle)."},
      {type:"step", text:"🔹 Entübasyon Notları: Entübasyon sırasında hiperventilasyon (PaCO2 < 30 mmHg) rutin olarak önerilmez; sadece akut herniasyon şüphesinde kısa süreli kontrollü hiperventilasyon düşünülebilir."},
      {type:"note", text:"🔹 Transfer ve İzlem: Kafa travması olan hastalar için erken nöroşirürji/yoğun bakım koordinasyonu; stabilizasyon sonrası hızlı nakil planla."},
      {type:"warning", text:"⚠️ Antikoagülanlar: Antikoagülan veya trombosit inhibitörü kullanan hastalarda kanama riski yüksek; tersine çevirme ve hematom progresyonu için erken iletişim şart."},
      {type:"note", text:"🔹 Belgeleme: Olay mekanizması, bilinç kaybı süresi, nörolojik değişiklikler ve verilen ilaçlar/uygulamalar ayrıntılı olarak kaydedilmeli."}
    ]},
    vertigo: { category: "neuro", title: "🌀 Vertigo", steps: [
      {type:"step", text:"ABCDE, nörolojik muayene ve vital bulgular."},
      {type:"drug", text:"Metoklopramid 10 mg IV veya Ondansetron 4 mg IV."},
      {type:"warning", text:"Fokal nörolojik bulgu varsa inme ayırıcı tanısını düşün."}
    ]},
    yanik: { 
      category: "trauma", 
      title: "🔥 Yanık Algoritması", 
      image: "img/yanik_yuzdesi.jpg",
      steps: [
        {type:"action", text:"ABCDE, yanma sürecini durdur, elbiseleri ve takıları çıkar."},
        {type:"step", text:"Yanık yüzdesini Dokuzlar Kuralı ile belirle (1. dereceyi sayma)."},
        {type:"drug", text:"Parkland formülü: 4 ml x kg x %yanık (ilk 8 saatte toplamın yarısı)."},
        {type:"warning", text:"İnhalasyon yanığı şüphesi varsa entübasyon hazırlığı yap."},
        {type:"drug", text:"Ağrı kontrolü: Morfin 0.1 mg/kg veya Fentanil 1-2 mcg/kg IV."}
      ]
    },
 zehir: { 
      category: "toxicology", 
      title: "🧪 Zehirlenme ve Madde İntoksikasyonu", 
      steps: [
        {type:"warning", text:"⚠️ Güvenlik: Kontaminasyon varsa KKE giy ve hastayı yıka. KŞ ölç!"},
        {type:"step", text:"🔹 Opioid: Solunum baskılanmış ve miyozis varsa Nalokson (Yet: 0.4-2mg, Çoc: 0.01mg/kg) uygula."},
        {type:"step", text:"🔹 Organofosfat: Sekresyonlar kuruyana dek Atropin (Yet: 1-3mg, Çoc: 0.05mg/kg) tekrarla."},
        {type:"step", text:"🔹 Aktif Kömür: İlk 1 saat içinde gelen vakalarda (korozif madde ve hidrokarbon değilse) 1 gr/kg dozunda uygulanabilir.."},
        {type:"drug", text:"💊 Uyarıcı: Ajitasyon ve hipertansiyon için Diazepam kullan; Kokainde Beta-Blokör KULLANMA."},
        {type:"action", text:"✅ Hedef: ABCDE stabilizasyonu ve spesifik antidot ile sekresyon/solunum kontrolü."},
        {type:"action", text:"✅ UZEMİ ARA 114"},
        {type:"note", text: "🧪 SPESİFİK ANTİDOTLAR TABLOSU"},
        {type:"table", text: `<div style="overflow-x:auto;"><table style="width:100%; border-collapse: collapse; font-size: 12px; background: white; color: black;"><tr style="background: #1e293b; color: white;"><th style="padding: 6px; border: 1px solid #ddd;">Zehirlenme</th><th style="padding: 6px; border: 1px solid #ddd;">Antidot</th><th style="padding: 6px; border: 1px solid #ddd;">Not</th></tr><tr><td>Opioid</td><td>Nalokson</td><td>Solunum düzelene dek 2-3 dk bir.</td></tr><tr style="background:#f8fafc;"><td>Benzo</td><td>Flumazenil</td><td>Nöbet öyküsünde KONTRENDİKE!</td></tr><tr><td>Parasetamol</td><td>NAC</td><td>İlk 8 saat en etkili zaman.</td></tr><tr style="background:#f8fafc;"><td>Tarım İlacı</td><td>Atropin</td><td>Sekresyon kuruyana kadar 1-3mg.</td></tr><tr><td>Beta-Blokör</td><td>Glukagon</td><td>3-10mg IV yavaş.</td></tr><tr style="background:#f8fafc;"><td>Kalsiyum BK</td><td>Kalsiyum</td><td>%10 Kalsiyum Glukonat 10-20ml IV.</td></tr><tr><td>Metil Alkol</td><td>Etil Alkol</td><td>%10 Etil Alkol veya saf alkol.</td></tr><tr style="background:#f8fafc;"><td>Karbonmonoksit</td><td>%100 O2</td><td>Hiperbarik O2 gerekebilir.</td></tr><tr><td>Siyanür</td><td>Cyanokit</td><td>5g IV infüzyon uygulanır.</td></tr><tr style="background:#f8fafc;"><td>Demir</td><td>Deferoksamin</td><td>İdrarın pembeleşmesi etkinliktir.</td></tr></table></div>`}
      ]
    },

    nobet: { category: "neuro", title: "🧠 Nöbet / Status Epilepticus", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap: Hastanın çevresindeki tehlikeli eşyaları uzaklaştır, havayolu açıklığını sağla."},
      {type:"action", text:"✅ Travmadan koru, yan yatır, oksijen ver: Hastayı nazikçe yere yatır (mümkünse sol yan / recovery pozisyonu), başını koru, yüksek akımlı oksijen başlat."},
      {type:"action", text:"✅ Kan Şekeri Ölç: Hipoglisemi tetikleyebilir; kan şekeri düşükse protokole uygun dekstroz uygula."},
      {type:"drug", text:"💊 Midazolam: Damar yolu yoksa 10 mg IM (70 kg üstü yetişkin için). Damar yolu varsa 2.5-5 mg IV (yavaş uygulama)."},
      {type:"drug", text:"💊 Diazepam: 5-10 mg IV (yavaş uygulama, dakikada 2-5 mg hızında). Gerekirse 5-10 dk sonra doz tekrarlanabilir."},
      {type:"decision", title:"Status Epilepticus Tanısı", text:"⚠️ Nöbet 5 dakikayı geçerse veya hasta bilinci açılmadan üst üste nöbet geçiriyorsa Status kabul et; ileri havayolu/yoğun bakım hazırlığı yap."},
      {type:"warning", text:"⚠️ Solunum Depresyonu: Benzodiazepinler solunumu baskılayabilir. İlaç sonrası solunumu ve SpO2'yi yakından takip et; gerekirse BVM ile destek ver."},
      {type:"note", text:"Gebelik (Eklampsi): Eğer hasta gebeliğinin 20. haftasının üzerindeyse ve nöbet geçiriyorsa, öncelikli tedavi benzodiazepin değil Magnezyum Sülfat'tır (4-6 g IV, 15-20 dk infüzyon)."},
      {type:"step", text:"🔹 Eğer nöbet durmuyorsa: İleri antiepileptik (ör. levetirasetam, valproat, fenitoin) ve yoğun bakım/ nöroloji konsültasyonu düşün."}
    ]},
    anafilaksi: { category: "allergy", title: "⚠️ Anafilaksi", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap: Havayolunu (ödem riski!) ve solunumu hızla kontrol et."},
      {type:"action", text:"✅ Hızlı ABC, oksijen, damar yolu aç: Hastayı sırt üstü yatır ve bacaklarını kaldır (şok pozisyonu). Yüksek akımlı oksijen başlat."},
      {type:"drug", text:"💊 Adrenalin (Epinefrin) IM: 0.3 - 0.5 mg (1:1000) hemen; vastus lateralis (uyluğun üst dış yan yüzü) kas içine uygulanır. Gerekirse 5-15 dk aralıklarla tekrarlanır."},
      {type:"drug", text:"💊 Sıvı Resüsitasyonu: Hipotansiyon varsa 500-1000 ml kristaloid (SF/RL) hızlı infüzyonla ver."},
      {type:"drug", text:"💊 H1 Antihistaminik: Difenhidramin 25-50 mg IV/IM (semptomları gidermek için yardımcı tedavi)."},
      {type:"drug", text:"💊 H2 Antihistaminik: Famotidin 20 mg IV veya Ranitidin 50 mg IV (kurum protokolüne göre)."},
      {type:"drug", text:"💊 Steroid: Metilprednizolon 1-2 mg/kg IV (Maksimum ~125 mg) — geç faz reaksiyonlarını önlemek için."},
      {type:"warning", text:"⚠️ ÖNEMLİ: Antihistaminikler ve steroidler asla Adrenalin'in yerini almaz; tedaviyi geciktirmeyin."},
      {type:"warning", text:"🚨 Adrenalin Yolu: Anafilakside ilk seçenek IM uygulamadır. IV adrenalin sadece arrest gelişmişse veya uzman kontrolünde, çok ciddi şok tablosunda titre edilerek düşük dozlarda uygulanır."},
      {type:"warning", text:"⚠️ Hava Yolu Yönetimi: Dilde şişme, stridor veya ses kısıklığı varsa hava yolu hızla tıkanabilir; erken entübasyon veya cerrahi hava yolu hazırlığı yapın."},
      {type:"warning", text:"⚠️ Mavi Yanıt (Beta-bloker kullananlar): Beta bloker kullanan hastalarda adrenalin etkisiz kalabilir; bu durumda Glukagon 1-5 mg IV düşünülebilir."},
      {type:"note", text:"Gözlem Süresi: Başarılı müdahaleden sonra bile bifazik reaksiyon riski nedeniyle en az 4-12 saat hastanede gözlem önerilir." }
    ]},

dogum: { category: "obstetric", title: "🤰 Acil Doğum ve Komplikasyonlar", steps: [
      {type:"step", text:"🔹 **Hazırlık:** Steril eldiven, kordon klempleri, makas ve bebeği kurulamak için sıcak battaniye hazırla."},
      {type:"action", text:"✅ **Doğum:** Bebek başı göründüğünde nazikçe destekle; baş çıktıktan sonra omuzların kurtulmasına yardım et."},
      {type:"step", text:"🔹 **Kordon:** Bebek doğunca anne seviyesinde tut; kordon nabzı durunca (1-3 dk) klemple ve kes."},
      {type:"warning", text:"⚠️ **Plasenta:** Kendiliğinden ayrılmasını bekle (5-20 dk); plasentayı veya kordonu ASLA zorla çekme."},
      {type:"action", text:"✅ **Bebek Bakımı:** Bebeği hemen kurula, ağız/burnu (gerekirse) aspire et, anne ile ten teması sağla."},
      {type:"note", text: "--- POSTPARTUM HEMORAJİ (DOĞUM SONU KANAMA) ---"},
      {type:"action", text:"✅ **Fundus Masajı:** Rahmi dışarıdan sertçe ovuşturarak kasılmasını sağla (en önemli adım)."},
      {type:"step", text:"🔹 **Pozisyon:** Hastayı düz yatır, bacakları yükselt, yüksek akım oksijen başla."},
      {type:"drug", text:"💉 **Damar Yolu:** En az iki adet geniş çaplı (14-16 G) IV hat aç ve hızlı SF başla."},
      {type:"note", text: "--- GEBELİKTE KARDİYAK ARREST ---"},
      {type:"action", text:"✅ **LUD Manevrası:** Uterusu manuel olarak sola it (Left Uterine Displacement); resüsitasyon başarısı için şarttır."},
      {type:"step", text:"🔹 **KPR:** Göğüs basısı yerini uterus basısı nedeniyle normalden 1-2 parmak yukarıda tutabilirsin."}
    ]},
inme: { category: "neurologic", title: "🧠 İnme (Serebrovasküler Olay - SVH)", steps: [
      {type:"note", text: "HIZLI DEĞERLENDİRME VE TANI (FAST SKALASI)"},
      {type:"step", text:"🔹 **F (Face - Yüz):** Hastaya gülümsemesini söyle; yüzünde asimetri veya bir tarafta sarkma var mı?"},
      {type:"step", text:"🔹 **A (Arms - Kollar):** Her iki kolunu havaya kaldırmasını iste; bir kol aşağı düşüyor mu?"},
      {type:"step", text:"🔹 **S (Speech - Konuşma):** Basit bir cümle kurmasını iste; konuşması peltek veya anlamsız mı?"},
      {type:"step", text:"🔹 **T (Time - Zaman):** Semptomların başladığı tam saati (son normal görüldüğü an) belirle."},
      {type:"note", text: "ACİL MÜDAHALE VE STABİLİZASYON"},
      {type:"action", text:"✅ **ABCDE ve Oksijen:** Havayolunu koru; SpO2 <%94 ise oksijen başla."},
      {type:"action", text:"✅ **Kan Şekeri Ölçümü:** Mutlaka KŞ ölç! Hipoglisemi, inme bulgularını taklit edebilir."},
      {type:"step", text:"🔹 **Pozisyon:** Baş 30 derece yukarıda olacak şekilde yatır (KİBAS riskini azaltmak için)."},
      {type:"drug", text:"💉 **Damar Yolu:** En az bir adet geniş çaplı IV hat aç; hipotansiyon yoksa aşırı sıvı yüklemesinden kaçın."},
      {type:"warning", text:"⚠️ **Tansiyon Yönetimi:** Trombolitik (pıhtı eritici) verilecekse hedef KB <185/110 mmHg; verilmeyecekse 220/120 mmHg üzerine kadar müdahale etme."},
      {type:"warning", text:"💊 **Antiplatelet:** BT ile kanama dışlanmadan kesinlikle Aspirin veya Kan Sulandırıcı VERME!"}
    ]},

hipoglisemi: { category: "metabolic", title: "🩸 Hipoglisemi (Yetişkin)", steps: [
      {type:"note", text: "TANI VE BELİRTİLER"},
      {type:"warning", text:"⚠️ **Eşik Değer:** Kan şekerinin <60 mg/dL olması."},
      {type:"step", text:"🔹 **Belirtiler:** Terleme, titreme, çarpıntı, hızlı solunum, konfüzyon veya saldırganlık."},
      {type:"action", text:"✅ **Ölçüm:** Bilinç değişikliği sergileyen her hastada mutlaka kan şekeri ölçülmelidir."},
      {type:"note", text: "BİLİNÇ AÇIK / YUTMA REFLEKSİ VAR"},
      {type:"action", text:"✅ **15/15 Kuralı:** 15-20 gram hızlı etkili karbonhidrat (3-4 adet kesme şeker veya 150 ml meyve suyu) verilir."},
      {type:"step", text:"🔹 **Takip:** 15 dakika sonra şeker tekrar ölçülür; değer hala <70 ise işlem tekrarlanır."},
      {type:"step", text:"📝 **Öğün:** Şeker düzelince, tekrar düşüşü önlemek için kompleks karbonhidrat (sandviç vb.) yedirilir."},
      {type:"note", text: "BİLİNÇ KAPALI / YUTMA REFLEKSİ YOK"},
      {type:"drug", text:"💉 **Damar Yolu:** Vakit kaybetmeden geniş bir IV hat açılır."},
      {type:"drug", text:"💊 **Dekstroz:** %20 Dekstroz 100 ml IV veya %50 Dekstroz 50 ml IV (Yavaş puşe)."}
   
    ]},

    travma: { category: "trauma", title: "🚑 Travmalı Hasta", steps: [
      {type:"action", text:"Olay yeri güvenliği, immobilizasyon, ABCDE, kanama kontrolü yap."},
      {type:"step", text:"Şok bulgusu varsa hızlı sıvı desteği ve uygun merkeze öncelikli nakil."},
      {type:"warning", text:"Kafa travması, toraks travması veya instabil pelvis varsa özel protokoller uygula."}
    ]}
  },


  cocuk: {
    astim: { category: "respiratory", title: "🫁 Pediyatrik Astım (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 Hızlı Değerlendirme: Bilinç durumu, konuşma yeteneği (kelime kelime mi?), yardımcı solunum kası kullanımı ve SpO2 değerine bak."},
      {type:"action", text:"✅ Oksijen: SpO2 > %94 olacak şekilde nemlendirilmiş oksijen başla."},
      {type:"drug", text:"💊 Salbutamol: <20 kg için 2.5 mg; ≥20 kg için 5 mg Nebül (İlk saat 20 dk arayla 3 doz yapılabilir)."},
      {type:"drug", text:"💊 İpratropium Bromür: <20 kg için 250 mcg; ≥20 kg için 500 mcg Nebül (Orta ve ağır ataklarda ekle)."},
      {type:"drug", text:"💊 Metilprednizolon: 1-2 mg/kg IV veya IM (Maksimum 60 mg)."},
      {type:"warning", text:"⚠️ Magnezyum Sülfat: Ağır ve tedaviye yanıtsız atakta 40-50 mg/kg (Maks 2 g), 20 dk IV infüzyon (Monitörize)."},
      {type:"note", text:"📝 ÖNEMLİ: Sessiz Akciğer (ronküs duyulmaması) ağır atak belirtisi olabilir. Dehidratasyon yoksa aşırı sıvıdan kaçın."}
    ]},
    bradikardi: { category: "cardiac", title: "💓 Pediatrik Bradikardi (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 ABCDE & Havayolu: Havayolunu aç, oksijen ver ve gerekirse BVM ile solut. Çocukta bradikardi genellikle hipoksiktir."},
      {type:"action", text:"✅ KPR Kararı: Oksijen ve ventilasyona rağmen nabız < 60/dk ve perfüzyon bozukluğu (şok, bilinç değişikliği) varsa KPR BAŞLAT."},
      {type:"drug", text:"💊 Adrenalin (İlk Tercih): 0.01 mg/kg (1:10.000 formdan 0.1 ml/kg) IV/IO. Her 3-5 dakikada bir."},
      {type:"drug", text:"💊 Atropin: Vagal tonus artışı (entübasyon vb.) veya primer AV blok varsa 0.02 mg/kg IV/IO (Min: 0.1 mg, Maks Tek Doz: 0.5 mg)."},
      {type:"note", text:"📝 ÇİLYAD Analizi: Çocuklarda bradikardi yönetiminde Adrenalin, Atropin'den önce gelir. Önce mutlaka iyi havalandır."}
    ]},
    tasikardi: { category: "cardiac", title: "⚡ Pediatrik Taşikardi (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 Güvenli çevre ve ABCDE değerlendirmesi yap, oksijen sağla ve monitörize et."},
      {type:"decision", title:"Stabilite Kontrolü", text:"Şok bulgusu, bilinç değişikliği veya kalp yetmezliği var mı?"},
      {type:"action", text:"⚡ UNSTABİL (Şok/Bilinç Bozuk): Senkronize Kardiyoversiyon uygula. İlk doz 0.5-1 J/kg; yanıt yoksa 2 J/kg."},
      {type:"step", text:"🔹 STABİL Dar QRS (SVT): Vagal Manevralar (Yüze buz torbası veya ıkındırma)."},
      {type:"drug", text:"💊 Adenozin (Stabil SVT): 0.1 mg/kg hızlı bolus (Maks 6 mg). Yanıt yoksa 0.2 mg/kg (Maks 12 mg)."},
      {type:"drug", text:"💊 STABİL Geniş QRS (VT): Amiodaron 5 mg/kg (20-60 dk infüzyon)."},
      {type:"note", text:"📝 Adenozin Notu: Kalbe en yakın damardan, hızlı bolus ve arkasından SF puşesi ile uygulanmalıdır."}
    ]},
    arrest: { category: "cardiac", title: "⚡ Pediyatrik Arrest (ÇİLYAD)", steps: [
      {type:"action", text:"✅ KPR Başlat: Yanıt yok, solunum yok/anormal ise. İki kurtarıcı 15:2; tek kurtarıcı 30:2."},
      {type:"action", text:"✅ Nabız Kontrolü: Nabız < 60/dk ve perfüzyon bozuksa arrest kabul et ve KPR'ye başla."},
      {type:"decision", title:"Ritim Analizi", text:"VF / nVT (Şoklanabilir) ise Defibrilasyon uygula."},
      {type:"action", text:"⚡ Defibrilasyon: İlk şok 2 J/kg, ikinci şok 4 J/kg, sonraki şoklar 4-10 J/kg."},
      {type:"drug", text:"💊 Adrenalin: 0.01 mg/kg IV/IO (1:10.000 formdan 0.1 ml/kg). Her 3-5 dakikada bir."},
      {type:"drug", text:"💊 Amiodaron: VF/nVT devam ediyorsa 3. ve 5. şok sonrası 5 mg/kg IV/IO."},
      {type:"note", text:"📝 6H - 5T: Çocuklarda özellikle Hipoglisemi ve Hipoksi nedenlerini hemen tara."}
    ]},

p_hipoglisemi: { category: "pediatric_metabolic", title: "👶 Pediatrik Hipoglisemi (ÇİLYAD)", steps: [
      {type:"warning", text:"⚠️ **Eşik Değer:** Bebek ve çocuklarda Kan Şekeri <60 mg/dL ise müdahale edilir."},
      {type:"step", text:"🔹 **Belirtiler:** Huzursuzluk, uyuklama, beslenme güçlüğü, apne (nefes durması) veya nöbet."},
      {type:"action", text:"✅ **Öncelik:** Havayolu (ABC) güvenliğini sağla ve vakit kaybetmeden IV/IO hattı aç."},
      {type:"note", text: "DEKSTROZ UYGULAMASI (%10'LUK TERCİH EDİLİR)"},
      {type:"drug", text:"🍼 **Yeni Doğan:** %10 Dekstroz 2 ml/kg IV/IO (Yavaş puşe)."},
      {type:"drug", text:"👶 **Bebek ve Çocuk:** %10 Dekstroz 5 ml/kg IV/IO (Maksimum tek doz 250 ml)."},
      {type:"warning", text:"⚠️ **Konsantrasyon:** Çocuklarda damar sağlığı için %25 veya %50'lik dekstrozun seyreltilmeden verilmesi önerilmez (Doku nekrozu riski!)."},
      {type:"step", text:"🔹 **Takip:** 15-20 dakika sonra KŞ tekrar ölçülür; düzelme yoksa doz tekrarlanır."},
      {type:"action", text:"✅ **İdame:** Şeker yükselince tekrar düşüşü önlemek için %5-10 Dekstroz içeren infüzyon başlanmalıdır."}
    ]},

nrp: { category: "neonatal", title: "👶 Yenidoğan Resüsitasyonu (NRP)", steps: [
      {type:"note", text: "İLK 30 SANİYE: BAŞLANGIÇ ADIMLARI"},
      {type:"warning", text:"⚠️ **Hızlı Sorgulama:** Bebek miadında mı? Tonusu iyi mi? Ağlıyor mu? (Hayır ise başla)."},
      {type:"action", text:"✅ **Isıt ve Kurula:** Radyan ısıtıcı altında kurula, ıslak örtüleri at, taktil uyaran ver."},
      {type:"step", text:"🔹 **Pozisyon:** Başı 'Koklama Pozisyonuna' getir. Gerekirse ağız ve burnu aspire et."},
      {type:"note", text: "POZİTİF BASINÇLI VENTİLASYON (PBV)"},
      {type:"action", text:"✅ **PBV:** KAH <100 veya apne/gasping varsa balon-maske ile PBV (40-60 soluk/dk) başla."},
      {type:"step", text:"🔹 **MR. SOPA:** Göğüs kalkmıyorsa; Maske, Repozisyon, Aspirasyon, Ağız açma kontrol et."},
      {type:"warning", text:"⚠️ **Göğüs Basısı:** 30 sn etkin PBV'ye rağmen KAH <60 ise göğüs basısına geç!"},
      {type:"note", text: "KPR VE İLAÇLAR"},
      {type:"action", text:"✅ **KPR Oranı (3:1):** 90 bası, 30 soluk; dakikada toplam 120 olay gerçekleşmeli."},
      {type:"drug", text:"💊 **Adrenalin:** Etkin PBV/KPR'ye rağmen KAH <60 ise: 0.01-0.03 mg/kg (1:10.000'lik) IV/IO."},
      {type:"drug", text:"💧 **Sıvı:** Kan kaybı/Şok şüphesinde 10 ml/kg İzotonik SF (5-10 dk içinde)."}
    ]},

    hipovolemi: { category: "shock", title: "💧 Pediatrik Hipovolemik Şok (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 ABCDE & Klinik: Bilinç, kapiller dolum (>2 sn), nabız kalitesi ve idrar çıkışını kontrol et."},
      {type:"action", text:"✅ Sıvı Bolusu: 20 ml/kg İzotonik kristaloid (SF veya RL) 5-20 dk içinde hızlıca ver."},
      {type:"action", text:"✅ Değerlendirme: Yanıt yoksa bolusu 3 kez (toplam 60 ml/kg'a kadar) tekrarla."},
      {type:"drug", text:"💊 Kan Transfüzyonu: 40-60 ml/kg kristaloide rağmen instabilite (özellikle kanamada) sürüyorsa 10 ml/kg ES ver."},
      {type:"warning", text:"⚠️ DİKKAT: Hipotansiyon çocukta ŞOKUN ÇOK GEÇ BULGUSUDUR. Taşikardi ve perfüzyon bozukluğuna odaklan."},
      {type:"note", text:"📝 Kardiyojenik Şok şüphesi varsa (Hepatomegali, raller) bolusu 5-10 ml/kg tut ve yavaş ver."}
    ]},
    crush: { category: "trauma", title: "🧱 Pediatrik Crush Sendromu (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 Olay yeri güvenliği ve ABCDE. Enkaz altında müdahale hayatidir."},
      {type:"action", text:"✅ Kurtarma Öncesi: Ekstremite serbestleşmeden damar yolu aç, 15-20 ml/kg/saat (veya 1 L/saat) Isotonik SF başla."},
      {type:"action", text:"✅ Kompresyon Sonrası: Bası kalkınca toksinler yayılacaktır (Reperfüzyon). Sıvı tedavisine agresif devam et."},
      {type:"drug", text:"💊 Hiperkalemi: EKG'de sivri T veya geniş QRS varsa Kalsiyum Glukonat %10 10 ml IV uygula."},
      {type:"drug", text:"💊 Potasyum Yönetimi: İnsülin + Dekstroz veya Salbutamol nebül düşün."},
      {type:"note", text:"⚠️ Sadece İZOTONİK SF kullan; Potasyum içeren (RL vb.) sıvılar kesinlikle yasaktır."}
    ]},
    kafa: { category: "neuro", title: "🧠 Pediatrik Kafa Travması", steps: [
      {type:"step", text:"🔹 ABCDE ve Servikal Stabilizasyon. Çocuklarda baş büyük olduğu için 'Koklama Pozisyonu'na dikkat."},
      {type:"action", text:"✅ Nörolojik Değerlendirme: Pediatrik GKS skorla, pupilleri kontrol et. GKS ≤ 8 ise entübe et."},
      {type:"action", text:"✅ Hedefler: İkincil hasarı önlemek için Sistolik KB > 90-110 mmHg, SpO2 ≥ %94 tut."},
      {type:"warning", text:"⚠️ KİBAS: Fışkırır kusma, bradikardi, hipertansiyon varsa hızlı nakil. Cushing Triadı tehlikelidir."},
      {type:"note", text:"📝 Sıvı Seçimi: Beyin ödemini artırabileceği için Dekstrozlu sıvılardan (hipoglisemi yoksa) kaçın; SF tercih et."}
    ]},
    nobet: { category: "neuro", title: "🧠 Pediyatrik Nöbet (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 Güvenli çevre, ABCDE, havayolu açıklığı ve %100 oksijen başla."},
      {type:"action", text:"✅ Kan Şekeri: KŞ < 60 mg/dL ise bebekte %10 Dekstroz 2-5 ml/kg; çocukta %10-25 Dekstroz ver."},
      {type:"drug", text:"💊 IV Yol Varsa (0-5. dk): Midazolam 0.1-0.2 mg/kg (Maks 5 mg) veya Diazepam 0.2 mg/kg IV."},
      {type:"drug", text:"💊 IV Yol Yoksa: Rektal Diazepam 0.3-0.5 mg/kg veya IM/Bukkal/Nazal Midazolam 0.2 mg/kg."},
      {type:"action", text:"✅ 5. Dakikada Durmazsa: Benzodiazepin dozunu bir kez daha tekrarla."},
      {type:"drug", text:"💊 İkinci Basamak (Dirençli): Fenitoin 20 mg/kg (SF içinde, yavaş infüzyon)."},
      {type:"note", text:"📝 Status Epileptikus: 5 dakikadan uzun süren nöbet acildir. Ateş varsa agresif düşürülmelidir."}
    ]},
    anafilaksi: { category: "allergy", title: "⚠️ Pediatrik Anafilaksi (ÇİLYAD)", steps: [
      {type:"step", text:"🔹 Tanı: Ani başlayan deri bulguları + Solunum sıkıntısı/Stridor/Hipotansiyon/Kusma."},
      {type:"action", text:"✅ Pozisyon: Sırtüstü yatır, bacakları yükselt. %100 Oksijen başla."},
      {type:"drug", text:"💊 ADRENALİN (1/1000): 0.01 mg/kg (Maks 0.3 mg) İM (Uyluk üst-dış yanından)."},
      {type:"action", text:"✅ Tekrar: Düzelme yoksa 5 dakikada bir, en fazla 3 kez tekrarla."},
      {type:"drug", text:"💊 Sıvı: Hipotansiyon/Şok varsa 20 ml/kg İzotonik SF bolus yükle."},
      {type:"drug", text:"💊 Ek İlaçlar: Feniramin 1 mg/kg, Ranitidin 1 mg/kg ve Metilprednizolon 1-2 mg/kg IV."},
      {type:"warning", text:"🚨 DİKKAT: İM Adrenalin en güvenli ve hızlı yoldur. Antihistaminik adrenalin yerine geçmez!"}
    ]},
    yanik: { 
      category: "trauma", 
      title: "🔥 Pediatrik Yanık (ÇİLYAD)", 
      image: "img/yanik_cocuk.jpg",
      steps: [
        {type:"action", text:"🔹 Yanmayı durdur, elbiseleri/takıları çıkar. Çeşme suyuyla 10-20 dk soğut (Buz kullanma)."},
        {type:"step", text:"✅ Alan Hesabı: Modifiye Dokuzlar veya Avuç İçi kuralı (%1). 1. dereceyi sayma."},
        {type:"drug", text:"💊 Sıvı (Parkland): 4 ml x kg x %Yanık (İlk yarısı 8 saatte). Tercihen Ringer Laktat."},
        {type:"action", text:"✅ Yara Bakımı: Temiz, kuru örtüyle kapat. Kimyasal yanığı bol suyla yıka."},
        {type:"warning", text:"⚠️ Hipotermi Riski: Çocuklarda vücut yüzeyi geniştir, soğutma sonrası hemen ört ve sıcak tut."},
        {type:"note", text:"📝 İnhalasyon: Yüzde is, ses kısıklığı varsa erken entübasyon hazırlığı yap."}
      ]
    }
  }
};

// --- Yardımcı Fonksiyonlar ve UI Mantığı ---

function escapeHtml(str) {
  if (!str && str !== 0) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function searchAlgo() {
  const q = document.getElementById("searchInput") ? document.getElementById("searchInput").value.trim().toLowerCase() : '';
  document.querySelectorAll("button[onclick*='showAlgo']").forEach(btn => {
    const text = (btn.textContent || btn.innerText || '').toLowerCase();
    const match = !q || text.includes(q);
    btn.style.display = match ? 'inline-block' : 'none';
  });
}

function showAlgo(key, grupName) {
  try {
    const grupKey = (grupName && grupName.toLowerCase().startsWith('y')) ? 'yetiskin' : 'cocuk';
    const algo = (algorithmData[grupKey] || {})[key.toLowerCase().trim()];
    const contentEl = document.getElementById("content");
    if (!contentEl || !algo) return;

   let html = `<button class="back-btn" onclick="clearContent()">⬅️ Geri Dön</button>
                <h2 style="color:#b91c1c; margin-bottom:12px;">${escapeHtml(algo.title)}</h2>`;

   // Ses Paneli (Astım veya KOAH için)
    const currentKey = key.toLowerCase().trim();
    if (currentKey === 'astim' || currentKey === 'koah') {
        const sesBaslik = currentKey === 'astim' ? "Wheezing (Hırıltı)" : "Ronküs (Kaba Ses)";
        html += `
        <div style="margin-bottom:15px; background:#fef2f2; padding:15px; border-radius:12px; border:2px solid #fecaca; text-align:center;">
            <p style="margin:0 0 10px 0; font-size:15px; font-weight:bold; color:#b91c1c;">🫁 Oskültasyon: ${sesBaslik}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="back-btn" style="background:#ef4444; width:auto; padding:10px 20px; color:white; margin:0; border:none;" onclick="playSound('${currentKey}')">🔊 Dinle</button>
                <button class="back-btn" style="background:#64748b; width:auto; padding:10px 20px; color:white; margin:0; border:none;" onclick="stopAllSounds()">⏹️ Durdur</button>
            </div>
        </div>`;
    }

    html += `<div class="algo-container">`;

    algo.steps.forEach(step => {
      const typeClass = step.type + "-box";
      let icon = '🔹 ';
      if(step.type === 'drug') icon = '💊 ';
      else if(step.type === 'warning') icon = '⚠️ ';
      else if(step.type === 'action') icon = '✅ ';
      else if(step.type === 'note') icon = '📝 ';
      
      // --- DÜZELTİLEN KISIM BURASI ---
      if (step.type === 'table') {
        html += `<div class="${typeClass}" style="background:transparent; border:none; padding:0;">${step.text}</div>`;
      } else if (step.type === 'decision') {
        html += `<div class="${typeClass}"><strong>${escapeHtml(step.title)}</strong><div>${escapeHtml(step.text)}</div></div>`;
      } else {
        html += `<div class="${typeClass}">${icon + escapeHtml(step.text)}</div>`;
      }
      // -------------------------------
    });

    if (algo.image) {
      html += `<div class="algo-image" style="margin-top:20px; text-align:center;">
                <img src="${algo.image}" alt="${algo.title}" style="max-width:100%; height:auto; border-radius:8px; border: 2px solid #ddd;">
               </div>`;
    }

    html += `</div>`;
    contentEl.innerHTML = html;
    contentEl.style.display = "block";
    contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) { console.error(e); }
}
function tahminiKiloHesapla() {
  const tip = document.getElementById("yasTipi").value;
  const deger = parseFloat(document.getElementById("yasDeger").value);
  const kiloInput = document.getElementById("kiloInput");
  
  if (!deger || deger < 0) return;

  let hesaplananKilo = 0;

  if (tip === "ay") {
    // < 1 Yaş Formülü: (Ay + 9) / 2
    hesaplananKilo = (deger + 9) / 2;
  } else {
    // 1 - 5 Yaş: (Yaş × 2) + 8
    // 6 - 12 Yaş: (Yaş × 3) + 7
    if (deger >= 1 && deger <= 5) {
      hesaplananKilo = (deger * 2) + 8;
    } else if (deger > 5) {
      hesaplananKilo = (deger * 3) + 7;
    }
  }

  if (hesaplananKilo > 0) {
    kiloInput.value = hesaplananKilo.toFixed(1);
    hesaplaCocukDoz(); // Kiloyu bulduktan sonra dozları da güncelle
  }
}

function hesaplaCocukDoz() {
  const kg = parseFloat(document.getElementById("kiloInput").value);
  const res = document.getElementById("dozSonuc");
  if (!kg || kg <= 0) { res.innerHTML = ""; return; }

  let h = `<div style="text-align:left; margin-top:15px; display:flex; flex-direction:column; gap:15px;">`;

  // 1. Resüsitasyon (Arrest)
  h += `<div class="decision-box">
          <b class="decision-title">🚨 Resüsitasyon (Arrest)</b>
          • <b>Adrenalin (1:10.000):</b> ${(kg * 0.1).toFixed(1)} ml IV/IO <small>(0.01 mg/kg)</small><br>
          • <b>Amiodaron:</b> ${(kg * 5).toFixed(1)} mg <small>(5 mg/kg Bolus)</small><br>
          • <b>Magnezyum Sülfat:</b> ${Math.min(kg * 50, 2000).toFixed(0)} mg <small>(25-50 mg/kg, Max 2g)</small>
        </div>`;

  // 2. Nöbet Kontrolü
  h += `<div class="decision-box">
          <b class="decision-title">🧠 Nöbet Kontrolü</b>
          • <b>Midazolam (IV/IO):</b> ${(kg * 0.1).toFixed(2)} mg <small>(0.1 mg/kg)</small><br>
          • <b>Midazolam (IM/Bukkal/Nazal):</b> ${(kg * 0.2).toFixed(2)} mg <small>(0.2 mg/kg)</small><br>
          • <b>Diazepam (IV):</b> ${(kg * 0.2).toFixed(2)} mg | <b>Rektal:</b> ${(kg * 0.5).toFixed(2)} mg<br>
          • <b>Fenitoin:</b> ${(kg * 20).toFixed(0)} mg <small>(SF içinde, 20 dk infüzyon)</small>
        </div>`;

  // 3. Solunum ve Anafilaksi
  const salbutamol = kg < 20 ? "2.5 mg" : "5 mg";
  const adrAnafilaksi = Math.min(kg * 0.01, 0.3).toFixed(2);
  h += `<div class="decision-box">
          <b class="decision-title">🫁 Solunum ve Anafilaksi</b>
          • <b>Salbutamol Nebül:</b> ${salbutamol}<br>
          • <b>Adrenalin IM (1:1000):</b> ${adrAnafilaksi} mg <small>(0.01 mg/kg, Max 0.3 mg)</small><br>
          • <b>Metilprednizolon:</b> ${(kg * 1).toFixed(1)}-${(kg * 2).toFixed(1)} mg <small>(1-2 mg/kg)</small>
        </div>`;

  // 4. Şok ve Sıvı
  h += `<div class="decision-box">
          <b class="decision-title">💧 Sıvı ve Hipoglisemi</b>
          • <b>İzotonik (Normal Şok):</b> ${(kg * 20).toFixed(0)} ml <small>(Hızlı bolus)</small><br>
          • <b>İzotonik (Kardiyojenik):</b> ${(kg * 5).toFixed(0)}-${(kg * 10).toFixed(0)} ml <small>(Yavaş)</small><br>
          • <b>%10 Dekstroz:</b> ${(kg * 5).toFixed(0)} ml <small>(Yeni Doğan için 2 ml/kg)</small>
        </div>`;

  // 5. Analjezi ve Sedasyon
  h += `<div class="decision-box">
          <b class="decision-title">💊 Analjezi ve Sedasyon</b>
          • <b>Parasetamol:</b> ${(kg * 15).toFixed(0)} mg <small>(15 mg/kg)</small><br>
          • <b>Fentanil:</b> ${(kg * 1).toFixed(1)} mcg <small>(1 mcg/kg)</small><br>
          • <b>Ketamin:</b> ${(kg * 1).toFixed(1)}-${(kg * 2).toFixed(1)} mg <small>(1-2 mg/kg)</small>
        </div>`;

  h += `</div>`;
  res.innerHTML = h;
}

function clearContent() {
  stopAllSounds(); // Ses çalarken geri çıkılırsa sesi susturur
  const c = document.getElementById("content");
  if (c) { c.style.display = "none"; c.innerHTML = ''; }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showGroup(g) {
  // Tüm ana bölümleri gizle
  document.getElementById("yetiskin").style.display = "none";
  document.getElementById("cocuk").style.display = "none";
  document.getElementById("cocukDozSection").style.display = "none";
  document.getElementById("ilacTabloSection").style.display = "none"; // Yeni eklenen
  
  // Seçilen bölümü göster
  if (g === 'yetiskin') {
    document.getElementById("yetiskin").style.display = "block";
  } else if (g === 'cocuk') {
    document.getElementById("cocuk").style.display = "block";
  } else if (g === 'doz') {
    document.getElementById("cocukDozSection").style.display = "block";
  } else if (g === 'ilaclar') {
    document.getElementById("ilacTabloSection").style.display = "block";
    renderIlacTablosu(); // Tabloyu oluştur
  }
  
  clearContent();
}

// --- CPR Sayacı ve Ses Mantığı (TAMİR EDİLDİ) ---
let cprInterval = null;
let cprRemaining = 120;
let metronomeInterval = null;
const beepSound = new Audio('sound/beep.mp3');
beepSound.load(); // Dosyayı önceden belleğe al

// Ses sistemini (AudioContext) bir değişkende tutalım
let audioCtx = null;

function playTick() {
  // Eğer başlatılmamışsa oluştur (Mobil uyum için)
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') { audioCtx.resume(); }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1000, audioCtx.currentTime); // 1000Hz net tık sesi
  
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime); 
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
  
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.05);
}

function formatTime(s) {
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function updateCPRDisplay() {
  const timerEl = document.getElementById("cprTimer");
  const alertEl = document.getElementById("cprAlert");
  
  if (timerEl) timerEl.textContent = formatTime(cprRemaining);
  
  // Süre dolduğunda (00:00)
  if (cprRemaining <= 0) {
    // 1. Metronomu sustur
    stopCPR();

    // 2. Uyarı sesini çal
   // 2. Uyarı sesini çal (Sıfırlayarak oynat)
    beepSound.currentTime = 0;
    beepSound.play().catch(e => console.log("Süre sonu sesi başarısız:", e));
    // 3. Ekrana mesajı yaz
    if (alertEl) {
      alertEl.textContent = "🔔 2 dakika tamamlandı — ritim kontrolü ve ekip değişimi düşün.";
    }
    
    // 4. Titreşimi çalıştır
    if (navigator.vibrate) {
      try { navigator.vibrate([200, 100, 200]); } catch(e) {}
    }
  } else {
    // Süre dolmadıysa uyarı yazısını temizle
    if (alertEl) alertEl.textContent = "";
  }
}

function startCPR() {
  if (cprInterval) return;
  if (cprRemaining <= 0) cprRemaining = 120;
  
  // SES MOTORUNU VE DOSYAYI UYANDIR (Mobil Tarayıcılar İçin)
  if (!audioCtx) { 
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(); 
  }
  if (audioCtx.state === 'suspended') { audioCtx.resume(); }

  // Telefon kilidini açmak için beep sesini milisaniyelik oynat-durdur yapıyoruz
  beepSound.play().then(() => {
      beepSound.pause();
      beepSound.currentTime = 0;
  }).catch(e => console.log("Mobil ses uyandırma pas geçildi veya hata:", e));

  updateCPRDisplay();

  // 1. Saniye Sayacı
  cprInterval = setInterval(() => {
    cprRemaining--;
    updateCPRDisplay();
  }, 1000);

  // 2. Metronom (Dakikada 110 Tık)
  metronomeInterval = setInterval(() => {
    playTick();
  }, 545); 
}
function stopCPR() {
  if (cprInterval) {
    clearInterval(cprInterval);
    cprInterval = null;
  }
  if (metronomeInterval) {
    clearInterval(metronomeInterval);
    metronomeInterval = null;
  }
}

function resetCPR() {
  stopCPR();
  cprRemaining = 120;
  updateCPRDisplay();
}

// Sayfa yüklendiğinde CPR ekranını hazırla
document.addEventListener('DOMContentLoaded', () => {
  updateCPRDisplay();
});
function renderIlacTablosu() {
  const ilaclar = [
    {ad: "Amiodaron", form: "150mg/3ml<br>Doz: 300mg", not: "Sadece %5 Dekstroz ile. SF ile çöker! Arrestte 20ml %5D içinde puşe."},
    {ad: "Adrenalin", form: "1mg/1ml<br>Doz: 1mg", not: "Arrestte doğrudan. Anafilakside SADECE İM (1:1000)."},
    {ad: "Atropin", form: "0.5mg/1ml<br>Doz: 0.5-1mg", not: "Sulandırmadan doğrudan IV puşe."},
    {ad: "Aritmal %2", form: "100mg/5ml<br>1-1.5 mg/kg", not: "Doğrudan puşe edilebilir."},
    {ad: "Dopamin", form: "200mg/5ml", not: "500ml SF/%5D içine. İnfüzyonla verilir."},
    {ad: "Dobütamin", form: "250mg/20ml", not: "250/500ml SF/%5D içine. İnfüzyonla."},
    {ad: "Mag. Sülfat", form: "1.5g/10ml<br>Doz: 2g", not: "En az 100ml SF/%5D ile 15-20 dk'da. Puşe yapma (tansiyon düşürür)."},
    {ad: "Kalsiyum", form: "%10 Ampul<br>5-10 ml", not: "Çok yavaş. Damar dışına çıkarsa doku nekrozu yapar!"},
    {ad: "Beloc", form: "5mg/5ml<br>Doz: 5mg", not: "Sulandırmadan 2-5 dk'da çok yavaş. Nabız/TA takibi şart."},
    {ad: "Adenozin", form: "6mg/2ml<br>Doz: 6-12mg", not: "ÇOK HIZLI puşe + 20ml SF hızlıca arkasından."},
    {ad: "Diazepam", form: "10mg/2ml", not: "Sulandırılmaz. Plastik enjektörde bekletme. Yavaş IV."},
    {ad: "Dormicum", form: "5/15 mg", not: "SF ile sulandırılabilir. Titre ederek (yavaş) verilir."}
  ];

  let html = "";
  ilaclar.forEach((i, index) => {
    const bg = index % 2 === 0 ? "#ffffff" : "#f8fafc";
    html += `<tr style="background: ${bg}; border-bottom: 1px solid #eee;">
      <td style="padding: 10px; font-weight: bold; color: var(--danger); border: 1px solid #eee;">${i.ad}</td>
      <td style="padding: 10px; border: 1px solid #eee;">${i.form}</td>
      <td style="padding: 10px; border: 1px solid #eee;">${i.not}</td>
    </tr>`;
  });
  document.getElementById("ilacTabloGövde").innerHTML = html;
}

// --- AKCİĞER SESLERİ SİSTEMİ ---
const wheezingSound = new Audio('sound/wheezing.mp3');
const ronkusSound = new Audio('sound/ronkus.mp3'); // Senin kaydettiğin dosya adı

function playSound(type) {
    stopAllSounds(); // Önce çalan varsa durdur
    if(type === 'astim') wheezingSound.play().catch(e => console.log("Astım sesi hatası:", e));
    if(type === 'koah') ronkusSound.play().catch(e => console.log("KOAH sesi hatası:", e));
}

function stopAllSounds() {
    wheezingSound.pause(); wheezingSound.currentTime = 0;
    ronkusSound.pause(); ronkusSound.currentTime = 0;
}