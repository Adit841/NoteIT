const addBtn = document.querySelector('.addbtn');
const modal = document.querySelector('.modal');
const saveBtn = document.querySelector('#saveNote');
const notesContainer = document.querySelector('.notes');

addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

saveBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const category = document.getElementById("category").value;

  const date = new Date().toLocaleDateString();

  const note = document.createElement("div");
  note.classList.add("note-card");

  note.innerHTML = `
    <div class="card-top">
      <span class="badge ${category}">
        ${category}
      </span>

      <div class="actions">
        <input type="checkbox">
        <span class="icon">✏️</span>
        <span class="delete-btn">🗑️</span>
      </div>
    </div>

    <h3>${title}</h3>
    <p>${desc}</p>

    <div class="date">${date}</div>
    `;

  notesContainer.appendChild(note);

  // DELETE
  const deleteBtn = note.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  // COMPLETE
  const checkbox = note.querySelector("input[type='checkbox']");

  checkbox.addEventListener("change", () => {
    note.classList.toggle("completed");
  });

  modal.classList.add("hidden");
});


