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

function makeSummary(title) {
  const t = title.toLowerCase();

  if (t.includes("ai") || t.includes("openai")) {
    return {
      s1: "AI 산업 경쟁이 강화되고 있음",
      s2: "대형 빅테크 기업 중심 투자 증가",
      s3: "GPU 및 데이터센터 수요 증가",
      impact: "AI 관련주 상승 가능성"
    };
  }

  if (t.includes("fed") || t.includes("금리")) {
    return {
      s1: "금리 정책 변화 가능성",
      s2: "시장 변동성 확대",
      s3: "투자 심리 영향",
      impact: "주식 시장 변동성 증가"
    };
  }

  if (t.includes("nvidia")) {
    return {
      s1: "GPU 시장 지배력 유지",
      s2: "AI 수요 증가 수혜",
      s3: "실적 기대감 반영",
      impact: "반도체 섹터 강세"
    };
  }

  return {
    s1: "시장 관련 주요 뉴스",
    s2: "투자자 관심 증가",
    s3: "관련 산업 영향 가능",
    impact: "시장 중립 영향"
  };
}
