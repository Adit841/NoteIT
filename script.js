const addBtn = document.querySelector(".addbtn");
const modal = document.querySelector(".modal");
const saveBtn = document.querySelector("#saveNote");
const notesContainer = document.querySelector(".notes");
const exitBtn = document.querySelector("#exit");
const themeToggle = document.querySelector("#themeToggle"); 
let selectedCategory = 'all';
const tabs = document.querySelectorAll(".tab span");

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));

    tab.classList.add('active');
    selectedCategory = tab.textContent.toLowerCase();

    renderFilteredNotes();
  })
})

let notes = JSON.parse(localStorage.getItem("notes")) || [];

exitBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

if(localStorage.getItem('theme') === "dark"){
  document.body.classList.add('dark');
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle("dark");
  
  if(document.body.classList.contains('dark')){
    localStorage.setItem('theme', 'dark');
    
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderFilteredNotes() {
    notesContainer.innerHTML  = "";

    let filteredNotes;

    if(selectedCategory === "all"){
      filteredNotes = notes;
    }else{
      filteredNotes = notes.filter(note => note.category === selectedCategory);
    }

    filteredNotes.forEach(renderNote);
}

function renderNote(noteData) {
  const note = document.createElement("div");
  note.classList.add("note_card");

  note.innerHTML = `
    <div class = "top">
      <span class = 'badge ${noteData.category}'>
      ${noteData.category}
      </span>
      
      <div class = "actions">
        <input type="checkbox" ${noteData.completed ? "checked" : ""}>
        <span class="icon">✏️</span>
        <span class="delete_btn">🗑️</span>
      </div>
    </div>
    <h3>${noteData.title}</h3>
    <p>${noteData.desc}</p>
    <div class ="date">${noteData.date}</div>
  `;

  notesContainer.appendChild(note);

  const deleteBtn = note.querySelector(".delete_btn");

  deleteBtn.addEventListener("click", () => {
    note.remove();
    notes = notes.filter((n) => n.id !== noteData.id);
    saveToLocalStorage();
  });

  const checkbox = note.querySelector("input");

  checkbox.addEventListener("change", () => {
    note.classList.toggle("completed");
    noteData.completed = checkbox.checked;
    saveToLocalStorage();
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

  if (title.trim() === "" || desc.trim() === "") {
    alert("please fill all fields");
    return;
  }
  const noteData = {
    id: Date.now(),
    title,
    desc,
    category,
    date,
    completed: false,
  };

  notes.push(noteData);
  saveToLocalStorage();
  renderNote(noteData);
  modal.classList.add("hidden");

  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
});
// notes.forEach(renderNote);
renderFilteredNotes();
