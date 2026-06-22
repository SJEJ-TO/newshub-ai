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
const news = [
  { title: "OpenAI GPT 업데이트 가능성", score: 98, source: "AI" },
  { title: "NVIDIA 실적 기대 상승", score: 95, source: "Markets" },
  { title: "미국 금리 정책 불확실성", score: 92, source: "Economy" },
  { title: "AI 투자 급증 지속", score: 90, source: "Tech" },
  { title: "글로벌 경제 둔화 우려", score: 85, source: "Reuters" }
];

render("topNews", news);
render("aiNews", news);
render("ecoNews", news);
render("stockNews", news);
render("polNews", news);
