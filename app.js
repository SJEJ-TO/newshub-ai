document.getElementById("date").innerText =
  new Date().toLocaleDateString();

function renderSimple(id, items) {
  const container = document.getElementById(id);
  if (!container) return;

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

// 👉 테스트용 고정 데이터 (무조건 뜸)
const news = [
  { title: "OpenAI 신규 모델 공개", score: 98, source: "Reuters" },
  { title: "미국 금리 정책 발표 예정", score: 95, source: "BBC" },
  { title: "NVIDIA 주가 상승", score: 92, source: "CNBC" },
  { title: "AI 투자 급증", score: 90, source: "TechCrunch" }
];

renderSimple("topNews", news);
renderSimple("aiNews", news);
renderSimple("ecoNews", news);
renderSimple("stockNews", news);
renderSimple("polNews", news);
