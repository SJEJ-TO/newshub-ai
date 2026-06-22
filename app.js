
document.getElementById("date").innerText =
  new Date().toLocaleDateString();

/* =========================
   시장 데이터 (무조건 안전)
========================= */
function loadMarket() {
  document.getElementById("usd").innerText = "1,320₩";
  document.getElementById("sp").innerText = "4,800";
  document.getElementById("nasdaq").innerText = "16,200";
  document.getElementById("kospi").innerText = "2,600";
}

/* =========================
   뉴스 (고정 데이터 - 안정)
========================= */
const news = [
  { title: "OpenAI AI 시장 확장", score: 98, source: "AI" },
  { title: "NVIDIA 반도체 성장 지속", score: 95, source: "Markets" },
  { title: "미국 금리 정책 불확실성", score: 92, source: "Economy" },
  { title: "AI 투자 증가 지속", score: 90, source: "Tech" },
  { title: "글로벌 경기 둔화 우려", score: 85, source: "Reuters" }
];

/* =========================
   요약
========================= */
function makeSummary() {
  return {
    s1: "핵심 뉴스 요약",
    s2: "시장 영향 가능",
    s3: "투자자 관심",
    impact: "변동성 가능"
  };
}

/* =========================
   감정
========================= */
function getSentiment(t) {
  t = (t || "").toLowerCase();

  if (t.includes("ai")) return "📈 상승";
  if (t.includes("risk")) return "📉 하락";
  return "➖ 중립";
}

/* =========================
   렌더
========================= */
function render() {
  const el = document.getElementById("topNews");
  if (!el) return;

  el.innerHTML = "";

  news.forEach(i => {

    const sum = makeSummary();
    const sentiment = getSentiment(i.title);

    el.innerHTML += `
      <div class="card" onclick="openModal('${i.title}', '${i.source}')">
        <div class="score">🔥 ${i.score}</div>
        <div>${sentiment}</div>
        <div>${i.title}</div>

        <div style="font-size:12px; color:#aaa;">
          🧠 ${sum.s1}<br/>
          🧠 ${sum.s2}<br/>
          🧠 ${sum.s3}<br/>
          ⚡ ${sum.impact}
        </div>
      </div>
    `;
  });
}

/* =========================
   모달
========================= */
function openModal(title, source) {
  document.getElementById("modalContent").innerHTML = `
    <h2>${title}</h2>
    <p>출처: ${source}</p>
    <button onclick="closeModal()">닫기</button>
  `;

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* =========================
   시작
========================= */
loadMarket();
render();
