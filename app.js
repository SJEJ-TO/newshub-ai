document.getElementById("date").innerText =
  new Date().toLocaleDateString();

// 안전 렌더링
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

// 점수 시스템
function score(title) {
  let s = 50;

  const keywords = {
    "AI": 25,
    "OpenAI": 30,
    "NVIDIA": 20,
    "Fed": 20,
    "inflation": 15,
    "Trump": 10
  };

  for (let k in keywords) {
    if (title.includes(k)) s += keywords[k];
  }

  return Math.min(100, s);
}

// RSS 가져오기 (실패해도 앱 안 죽음)
async function fetchRSS(url) {
  try {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=" + encodeURIComponent(url)
    );

    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const items = xml.querySelectorAll("item");

    return [...items].slice(0, 5).map(i => ({
      title: i.querySelector("title")?.textContent || "No title",
      source: url,
      score: score(i.querySelector("title")?.textContent || "")
    }));
  } catch (e) {
    console.log("RSS error:", url);
    return []; // ❗ 실패해도 빈 배열
  }
}

// 뉴스 소스 (최소 안정형)
const feeds = [
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://hnrss.org/frontpage"
];

async function loadNews() {
  let all = [];

  for (let f of feeds) {
    const items = await fetchRSS(f);
    all = all.concat(items);
  }

  if (all.length === 0) {
    all = [
      { title: "뉴스를 불러오는 중입니다...", score: 0, source: "system" }
    ];
  }

  all.sort((a, b) => b.score - a.score);

  render("topNews", all.slice(0, 10));
  render("aiNews", all.slice(0, 5));
  render("ecoNews", all.slice(0, 5));
  render("stockNews", all.slice(0, 5));
  render("polNews", all.slice(0, 5));
}

loadNews();
