const handleVote = (code) => {
  fetch("/vote", {
    method: "POST",
    body: JSON.stringify({
      code: Number(code),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const statsButton = document.querySelector(".statsButton");
  const buttonsBlock = document.querySelector(".buttons");
  const result = await fetch("/variants");
  const parsedResult = await result.json();
  let buttonsHtml = parsedResult
    .map((item) => {
      return `<button>${item.option} - ${item.code}</button>`;
    })
    .join("");
  buttonsBlock.innerHTML = buttonsHtml;

  buttonsBlock.addEventListener("click", async (e) => {
    await handleVote(e.target.innerText.split("- ")[1]);
    const result = await fetch("/stats");
    const parsedResult = await result.json();
    const statsBlock = document.querySelector(".stats");
    let statsHtml = parsedResult.stats
      .map((item) => {
        return `<span>${item[0]} - ${item[1]}</span><br>`;
      })
      .join("");
    statsBlock.innerHTML = statsHtml;
  });
});
