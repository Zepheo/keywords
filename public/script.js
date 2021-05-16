const form = document.querySelector(".form");
const result = document.querySelector(".result");

const copyText = (string) => {
  const text = document.createElement("input");
  text.value = string;
  document.body.appendChild(text);
  text.select();
  document.execCommand("copy");
  text.remove();
};

const createLiElement = (array) => {
  const liElement = document.createElement("li");
  const text = document.createElement("span");
  const checkBox = document.createElement("input");
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  checkBox.type = "checkbox";
  text.textContent = array.join(" ");
  liElement.className = "list-item";
  liElement.appendChild(checkBox);
  liElement.appendChild(text);
  liElement.appendChild(copyBtn);
  copyBtn.addEventListener("click", () => {
    copyText(text.textContent);
  });
  return liElement;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.querySelector(".words").value;
  const number = document.querySelector(".r").value;
  try {
    const { data } = await axios.post("/getSentences", {
      words: input,
      r: number,
    });
    result.innerHTML = "";
    data.forEach((s) => {
      result.appendChild(createLiElement(s));
    });
  } catch (error) {
    console.error(error);
    result.innerHTML = "there was an error in the response";
  }
});
