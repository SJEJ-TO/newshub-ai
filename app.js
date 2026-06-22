
document.getElementById("date").innerText =
  new Date().toLocaleDateString();

/* =========================
   AI 요약 엔진
========================= */
function makeSummary(title) {
  const t = (title || "").toLowerCase();

  if (t.includes("ai") || t.includes("openai")) {
    return {
      s1: "AI 산업 경쟁 강화",
      s2: "빅테크 투자 확대",
      s3: "GPU 수요 증가",
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
      s2: "AI 수요 지속 증가",
      s3: "실적 기대 반영",
      impact: "반도체 섹터 강세"
    };
  }

  return {
    s1: "시장 관련 뉴스",
    s2: "투자자 관심 유지",
    s3: "산업 영향 가능",
    impact: "중립적 영향"
  };
}

/* =========================
   감정 분석 (상승/하락)
========================= */
function getSentiment(title) {
  const t = (title || "").toLowerCase();

  const bullish = ["ai", "nvidia", "growth", "rise", "surge", "record"];
  const bearish = ["crash", "fall", "war", "inflation", "risk", "decline", "rate"];

  let score = 0;

  bullish.forEach(w => {
    if (t.includes(w)) score++;
  });

  bearish.forEach(w => {
    if (t.includes(w)) score--;
  });

  if (score > 0) return "📈 상승";
  if (score < 0) return "📉 하락";
  return "➖ 중립";
}

/* =========================
   렌더링
========================= */
function render(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  items.forEach(i => {

    const sum = makeSummary(i.title);
    const sentiment = getSentiment(i.title);

    el.innerHTML += `
      <div class="card" onclick='openModal("${i.title}", "${i.source}")'>
        <div class="score">🔥 ${i.score}</div>

        <div style="margin:4px 0;">
          ${sentiment}
        </div>

        <div>${i.title}</div>

        <div style="margin-top:8px; color:#9CA3AF; font-size:12px;">
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
   고정 뉴스 (안정 버전)
========================= */
const news = [
  { title: "OpenAI 신규 모델 발표 가능성", score: 98, source: "AI" },
  { title: "NVIDIA AI 반도체 성장 지속", score: 95, source: "Markets" },
  { title: "미국 금리 정책 불확실성 확대", score: 92, source: "Economy" },
  { title: "AI 투자 급증 지속", score: 90, source: "Tech" },
  { title: "글로벌 경제 둔화 우려", score: 85, source: "Reuters" }
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
   시장 데이터 (안전)
========================= */
async function loadMarket() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
    const data = await res.json();

    const usd = document.getElementById("usd");
    if (usd && data?.rates?.KRW) {
      usd.innerText = Math.round(data.rates.KRW) + "₩";
    } else {
      usd.innerText = "1,320₩";
    }

  } catch (e) {
    console.log("market error", e);
  }

  const sp = document.getElementById("sp");
  if (sp) sp.innerText = "4,800";

  const nasdaq = document.getElementById("nasdaq");
  if (nasdaq) nasdaq.innerText = "16,200";

  const kospi = document.getElementById("kospi");
  if (kospi) kospi.innerText = "2,600";
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
    <p style="margin-top:10px; color:#aaa;">
      📌 상세 본문은 다음 단계에서 실제 기사 연결 예정
    </p>

    <p style="margin-top:20px;">
      🧠 AI 분석 기반 요약 제공 중
    </p>

    <p style="margin-top:20px; color:#888;">
      출처: ${source}
    </p>

    <button onclick="closeModal()" style="margin-top:20px;">닫기</button>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
