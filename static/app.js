const ul = document.querySelector("#memo-ul");

async function delMemo(e) {
  const id = e.target.dataset.id;
  if (window.confirm("삭제하시겠습니까?")) {
    const res = await fetch(`/memos/${id}`, {
      method: "DELETE",
    });
  }
  readMemo();
}

async function editMemo(e) {
  const id = e.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요~");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, content: editInput }),
  });
  readMemo();
}

function displayMemos(memo) {
  const li = document.createElement("li");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  li.innerText = `[id:${memo.id} ${memo.content}]`;

  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", delMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
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
