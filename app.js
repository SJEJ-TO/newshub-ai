document.getElementById("date").innerText =
  new Date().toLocaleDateString();

function render(id, items) {
  const container = document.getElementById(id);
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

// 샘플 뉴스 데이터
render("topNews", [
  { title: "OpenAI 신규 모델 공개", score: 98, source: "Reuters" },
  { title: "미국 금리 발표 임박", score: 95, source: "BBC" }
]);

render("aiNews", [
  { title: "xAI Grok 업데이트", score: 88, source: "TechCrunch" }
]);

render("ecoNews", [
  { title: "미국 CPI 상승", score: 90, source: "Reuters" }
]);

render("stockNews", [
  { title: "NVIDIA 신고가", score: 92, source: "CNBC" }
]);

render("polNews", [
  { title: "미중 긴장 지속", score: 85, source: "AP" }
]);
