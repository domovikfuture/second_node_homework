console.log(1);

document.addEventListener("DOMContentLoaded", () => {
  let variants = [];
  const buttons = document.querySelector(".buttons");
  fetch("/variants")
    .then((rawRes) => rawRes.json())
    .then((res) => {
      let buttonsHtml = res
        .map((item) => {
          return `<button>${item.option} - ${item.code}</button>`;
        })
        .join("");
      buttons.innerHTML = buttonsHtml;
    });
});
