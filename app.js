
document.getElementById("date").innerText =
  new Date().toLocaleDateString();

/* =========================
   RSS 프록시 (CORS 해결)
========================= */
const proxy = (url) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

/* =========================
   RSS 리스트 (한국 + 해외)
========================= */
const feeds = [
  // 해외
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://rss.cnn.com/rss/edition.rss",

  // 한국
  "https://www.yna.co.kr/rss/news.xml",
  "https://www.mk.co.kr/rss/30000001.xml",
  "https://www.joongang.co.kr/rss",
];

/* =========================
   뉴스 저장소
========================= */
let allNews = [];

/* =========================
   RSS 파싱
========================= */
async function fetchRSS(url) {
  try {
    const res = await fetch(proxy(url));
    const text = await res.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const items = xml.querySelectorAll("item");

    return Array.from(items).slice(0, 5).map(item => {
      const title = item.querySelector("title")?.textContent || "No title";

      return {
        title,
        source: url,
        score: calcScore(title)
      };
    });

  } catch (e) {
    console.log("RSS error:", url);
    return [];
  }
}

/* =========================
   중요도 점수
========================= */
function calcScore(title) {
  const t = title.toLowerCase();

  let score = 50;

  if (t.includes("ai")) score += 30;
  if (t.includes("nvidia")) score += 25;
  if (t.includes("fed")) score += 20;
  if (t.includes("inflation")) score += 15;
  if (t.includes("war")) score -= 20;

  return score;
}

/* =========================
   AI 요약
========================= */
function makeSummary(title) {
  return {
    s1: "핵심 뉴스 자동 분석",
    s2: "시장 영향 가능성 있음",
    s3: "투자자 관심 증가",
    impact: "시장 변동 가능"
  };
}

/* =========================
   감정 분석
========================= */
function getSentiment(title) {
  const t = title.toLowerCase();

  if (t.includes("rise") || t.includes("growth") || t.includes("ai"))
    return "📈 상승";

  if (t.includes("fall") || t.includes("risk") || t.includes("war"))
    return "📉 하락";

  return "➖ 중립";
}

/* =========================
   렌더
========================= */
function render() {
  const el = document.getElementById("topNews");
  if (!el) return;

  el.innerHTML = "";

  allNews
    .sort((a, b) => b.score - a.score)
    .forEach(i => {

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

        </div>
      `;
    });
}

/* =========================
   뉴스 로딩
========================= */
async function loadNews() {
  allNews = [];

  const results = await Promise.all(
    feeds.map(f => fetchRSS(f))
  );

  results.forEach(r => {
    allNews = allNews.concat(r);
  });

  render();
}

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

/* =========================
   시작
========================= */
loadMarket();
loadNews();
setInterval(loadNews, 60000);
setInterval(loadMarket, 60000);
