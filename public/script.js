const possibleDownloadFormats = [
  "application/json",
  "application/xml",
  "text/html",
];

document.addEventListener("DOMContentLoaded", async () => {
  const buttonsBlock = document.querySelector(".buttons");
  const downloadButtonsBlock = document.querySelector(".download_buttons");
  const result = await fetch("/variants");
  const parsedResult = await result.json();
  let buttonsHtml = parsedResult
    .map((item) => {
      return `<button>${item.option} - ${item.code}</button>`;
    })
    .join("");
  let downloadButtonsHtml = possibleDownloadFormats
    .map((item) => {
      return `<button>download ${item}</button>`;
    })
    .join("");
  buttonsBlock.innerHTML = buttonsHtml;
  downloadButtonsBlock.innerHTML = downloadButtonsHtml;

  downloadButtonsBlock.addEventListener("click", async (e) => {
    const accept = e.target.innerText.split(" ")[1];
    const res = await fetch("/download", {
      method: "POST",
      headers: {
        Accept: accept,
      },
    });
    const data = await res.blob();
    const fakeButton = document.createElement("a");
    fakeButton.href = window.URL.createObjectURL(new Blob([data]));
    fakeButton.click();
  });

  buttonsBlock.addEventListener("click", async (e) => {
    await fetch("/vote", {
      method: "POST",
      body: JSON.stringify({
        code: Number(e.target.innerText.split("- ")[1]),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await fetch("/stats", {
      method: "POST",
    });
    const parsedData = await data.json();
    const statsBlock = document.querySelector(".stats");
    let statsHtml = Object.keys(parsedData)
      .map((item) => {
        return `<span>${item} - ${parsedData[item]}</span><br>`;
      })
      .join("");
    statsBlock.innerHTML = statsHtml;
  });
});
