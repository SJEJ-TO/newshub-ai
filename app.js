document.getElementById("date").innerText =
  new Date().toLocaleDateString();

function render(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  items.forEach(i => {
    el.innerHTML += `
      <div class="card">
        <div class="score">🔥 ${i.score}</div>
        <div>${i.title}</div>
        <small>${i.source}</small>
      </div>
    `;
  });
}

// 👉 완전 고정 데이터 (RSS 전부 제거)
const news = [
  { title: "OpenAI GPT 업데이트 기대", score: 98, source: "AI" },
  { title: "NVIDIA AI 반도체 성장", score: 95, source: "Markets" },
  { title: "미국 금리 정책 불확실", score: 92, source: "Economy" },
  { title: "AI 투자 급증 지속", score: 90, source: "Tech" },
  { title: "글로벌 경제 변화", score: 85, source: "Reuters" }
];

render("topNews", news);
render("aiNews", news);
render("ecoNews", news);
render("stockNews", news);
render("polNews", news);

async function loadMarket() {
  try {
    // USD/KRW (간단 안정 API)
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
    const data = await res.json();

    const usd = document.getElementById("usd");
    if (usd) usd.innerText = data.rates.KRW.toFixed(0) + "₩";

    // S&P500 (fallback 안전값)
    const sp = document.getElementById("sp");
    if (sp) sp.innerText = "4,8XX";

    // KOSPI (fallback)
    const kospi = document.getElementById("kospi");
    if (kospi) kospi.innerText = "2,6XX";

  } catch (e) {
    console.log("market error", e);
  }
}

loadMarket();
