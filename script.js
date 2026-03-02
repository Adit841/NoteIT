const addBtn = document.querySelector(".addbtn");
const modal = document.querySelector(".modal");
const saveBtn = document.querySelector("#saveNote");
const notesContainer = document.querySelector(".notes");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});
function saveTolocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNote(noteData) {
  const note = document.createElement("div");
  note.classList.add("note_card");

  note.innerHTML = `
    <div class="top">
      <span class="badge ${noteData.category}">
        ${noteData.category}
      </span>

      <div class="actions">
        <input type="checkbox" ${noteData.completed ? "checked" : ""}>
        <span class="icon">✏️</span>
        <span class="delete_btn">🗑️</span>
      </div>
    </div>

    <h3>${noteData.title}</h3>
    <p>${noteData.desc}</p>
    <div class="date">${noteData.date}</div>
  `;

  notesContainer.appendChild(note);

  const deleteBtn = note.querySelector(".delete_btn");

  deleteBtn.addEventListener("click", () => {
    note.remove();
    notes = notes.filter((n) => n !== noteData);
    saveTolocalStorage();
  });

  const checkbox = note.querySelector("input");

  checkbox.addEventListener("change", () => {
    note.classList.toggle("completed");
    noteData.completed = checkbox.checked;
    saveTolocalStorage();
  });

  if (noteData.completed) {
    note.classList.add("completed");
  }
}
saveBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const category = document.getElementById("category").value;
  const date = new Date().toLocaleDateString();

  const noteData = {
    title,
    desc,
    category,
    date,
    completed: false,
  };

  notes.push(noteData);
  saveTolocalStorage();

  renderNote(noteData);

  modal.classList.add("hidden");

  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
});

notes.forEach(renderNote);
