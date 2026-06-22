
document.getElementById("date")?.innerText =
  new Date().toLocaleDateString();

/* =========================
   AI 요약
========================= */
function makeSummary(title) {
  const t = (title || "").toLowerCase();

  if (t.includes("ai") || t.includes("openai")) {
    return {
      s1: "AI 산업 경쟁 강화",
      s2: "빅테크 투자 증가",
      s3: "GPU 수요 증가",
      impact: "AI 상승 모멘텀"
    };
  }

  if (t.includes("fed") || t.includes("금리")) {
    return {
      s1: "금리 정책 변화",
      s2: "시장 변동성 확대",
      s3: "투자 심리 영향",
      impact: "증시 변동성 증가"
    };
  }

  return {
    s1: "시장 뉴스",
    s2: "투자 관심 유지",
    s3: "산업 영향 가능",
    impact: "중립"
  };
}

/* =========================
   감정 분석
========================= */
function getSentiment(title) {
  const t = (title || "").toLowerCase();

  const up = ["ai", "rise", "growth", "surge", "record"];
  const down = ["crash", "fall", "risk", "inflation", "decline"];

  let s = 0;

  up.forEach(w => { if (t.includes(w)) s++; });
  down.forEach(w => { if (t.includes(w)) s--; });

  if (s > 0) return "📈 상승";
  if (s < 0) return "📉 하락";
  return "➖ 중립";
}

/* =========================
   렌더
========================= */
function render(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  items.forEach(i => {

    const sum = makeSummary(i.title);
    const sentiment = getSentiment(i.title);

    el.innerHTML += `
      <div class="card" onclick="openModal('${i.title}', '${i.source}')">
        <div class="score">🔥 ${i.score}</div>
        <div>${sentiment}</div>
        <div>${i.title}</div>

        <div style="font-size:12px; color:#aaa; margin-top:8px;">
          🧠 ${sum.s1}<br/>
          🧠 ${sum.s2}<br/>
          🧠 ${sum.s3}<br/>
          ⚡ ${sum.impact}
        </div>

        <small>${i.source}</small>
      </div>
    `;
  });
}

/* =========================
   뉴스 데이터
========================= */
const news = [
  { title: "OpenAI GPT 업데이트", score: 98, source: "AI" },
  { title: "NVIDIA AI 성장", score: 95, source: "Markets" },
  { title: "미국 금리 불확실성", score: 92, source: "Economy" },
  { title: "AI 투자 증가", score: 90, source: "Tech" },
  { title: "글로벌 경기 둔화", score: 85, source: "Reuters" }
];

/* =========================
   초기 렌더
========================= */
render("topNews", news);
render("aiNews", news);
render("ecoNews", news);
render("stockNews", news);
render("polNews", news);

/* =========================
   시장 데이터
========================= */
async function loadMarket() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
    const data = await res.json();

    document.getElementById("usd").innerText =
      data?.rates?.KRW ? Math.round(data.rates.KRW) + "₩" : "1,320₩";

  } catch (e) {}

  document.getElementById("sp").innerText = "4,800";
  document.getElementById("nasdaq").innerText = "16,200";
  document.getElementById("kospi").innerText = "2,600";
}

loadMarket();
setInterval(loadMarket, 60000);

/* =========================
   모달
========================= */
function openModal(title, source) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <h2>${title}</h2>
    <p>출처: ${source}</p>
    <button onclick="closeModal()">닫기</button>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
