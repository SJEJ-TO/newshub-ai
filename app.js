const feeds = [
  "https://hnrss.org/frontpage",
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://www.reuters.com/rssFeed/worldNews",
];

async function fetchRSS(url) {
  const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url));
  const data = await res.json();

  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, "text/xml");

  const items = xml.querySelectorAll("item");

  return [...items].slice(0, 5).map(item => ({
    title: item.querySelector("title")?.textContent,
    link: item.querySelector("link")?.textContent,
    source: url
  }));
}

function score(title) {
  let s = 50;

  const keywords = {
    "AI": 20,
    "OpenAI": 30,
    "Trump": 15,
    "Fed": 25,
    "inflation": 20,
    "NVIDIA": 25
  };

  for (let k in keywords) {
    if (title.includes(k)) s += keywords[k];
  }

  return Math.min(100, s);
}

async function loadNews() {
  let all = [];

  for (let feed of feeds) {
    const items = await fetchRSS(feed);
    all = all.concat(items);
  }

  all = all.map(n => ({
    ...n,
    score: score(n.title)
  })).sort((a, b) => b.score - a.score);

  render(all.slice(0, 10));
}

function render(items) {
  const container = document.getElementById("topNews");
  container.innerHTML = "";

  items.forEach(i => {
    container.innerHTML += `
      <div class="card">
        <div class="score">🔥 ${i.score}</div>
        <div>${i.title}</div>
        <small>${i.source}</small>
      </div>
    `;
  });
}

loadNews();

async function loadMarket() {
  try {
    // USD/KRW (exchangerate API)
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
    const data = await res.json();
    document.getElementById("usd").innerText =
      data.rates.KRW.toFixed(0) + "₩";

    // S&P500 (간단 대체 API)
    const sp = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC");
    const spData = await sp.json();
    const spPrice = spData.chart.result[0].meta.regularMarketPrice;
    document.getElementById("sp").innerText = spPrice.toFixed(0);

    // KOSPI (대체 데이터 - 무료 API 제한 때문에 간단 처리)
    document.getElementById("kospi").innerText = "2,6XX";
  } catch (e) {
    console.log("market error", e);
  }
}

loadMarket();
