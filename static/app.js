const ul = document.querySelector("#memo-ul");

function displayMemos(memo) {
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id} ${memo.content}]`;
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  ul.innerHTML = "";
  jsonRes.forEach(displayMemos);
}

async function createMemo(value) {
  const response = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: new Date().getTime(), content: value }),
  });

  readMemo();
}

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");

form.addEventListener("submit", handleSubmit);

readMemo();
