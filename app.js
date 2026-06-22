
document.getElementById("date").innerText =
  new Date().toLocaleDateString();

/* =========================
   안전 렌더 함수
========================= */
function render(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  items.forEach(i => {

    const sum = makeSummary(i.title);

    el.innerHTML += `
  <div class="card" onclick='openModal("${i.title}", "${i.source}")'>
    <div class="score">🔥 ${i.score}</div>
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
   AI 요약 엔진 (규칙 기반)
========================= */
function makeSummary(title) {
  const t = (title || "").toLowerCase();

  if (t.includes("ai") || t.includes("openai")) {
    return {
      s1: "AI 산업 경쟁이 강화됨",
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
    s3: "관련 산업 영향 가능",
    impact: "중립적 영향"
  };
}

/* =========================
   고정 뉴스 데이터 (안정 버전)
========================= */
const news = [
  { title: "OpenAI 신규 모델 발표 가능성", score: 98, source: "AI" },
  { title: "NVIDIA AI 반도체 성장 지속", score: 95, source: "Markets" },
  { title: "미국 금리 정책 불확실성 확대", score: 92, source: "Economy" },
  { title: "AI 투자 급증 계속", score: 90, source: "Tech" },
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
    if (usd) usd.innerText = data.rates.KRW.toFixed(0) + "₩";

    const sp = document.getElementById("sp");
    if (sp) sp.innerText = "4,8XX";

    const kospi = document.getElementById("kospi");
    if (kospi) kospi.innerText = "2,6XX";

  } catch (e) {
    console.log("market error", e);
  }
}

loadMarket();

async function openModal(title, source) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <h2>${title}</h2>
    <p style="color:#aaa;">로딩 중...</p>
  `;

  modal.style.display = "block";

  try {
    // ⚠️ 실제 기사 대신 RSS 기반이면 링크가 없어서 fallback
    content.innerHTML = `
      <h2>${title}</h2>
      <p style="margin-top:10px; color:#aaa;">
        📌 실제 뉴스 본문은 API 제한 때문에 일부만 표시됩니다
      </p>

      <div style="margin-top:20px;">
        🧠 이 뉴스는 시장 영향 분석 중심으로 제공됩니다
      </div>

      <p style="margin-top:20px; color:#888;">
        출처: ${source}
      </p>

      <button onclick="closeModal()" style="margin-top:20px;">닫기</button>
    `;

  } catch (e) {
    content.innerHTML = `
      <h2>${title}</h2>
      <p>본문 로딩 실패</p>
      <button onclick="closeModal()">닫기</button>
    `;
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
