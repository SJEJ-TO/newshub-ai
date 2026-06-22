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

// 👉 안정용 하드 데이터 (무조건 동작)
const feeds = [
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://hnrss.org/frontpage"
];

render("topNews", news);
render("aiNews", news);
render("ecoNews", news);
render("stockNews", news);
render("polNews", news);

const keywords = {
  "AI": 25,
  "OpenAI": 30,
  "NVIDIA": 20,
  "금리": 25,
  "Fed": 25,
  "환율": 20,
  "삼성": 15,
  "반도체": 20,
  "트럼프": 10
};
