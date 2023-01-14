// *Model
let notes = JSON.parse(localStorage.getItem("task"));
if (notes === null) {
  localStorage.setItem(
    "task",
    JSON.stringify([
      {
        id: String(new Date().getTime()),
        task: "Buy a panda",
        description: "Really Need to buy a panda",
      },
    ])
  );
  notes = JSON.parse(localStorage.getItem("task"));
}

// Create
function createNote(task, description) {
  const newId = String(new Date().getTime());
  notes.push({
    task: task,
    description: description,
    id: newId,
  });
  const notestring = JSON.stringify(notes);
  localStorage.setItem("task", notestring);
}

// Delete
function removeNote(idToDelete) {
  notes = notes.filter(function (note) {
    if (note.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  const notestring = JSON.stringify(notes);
  localStorage.setItem("task", notestring);
}
// *View

// render notes
function renderNote() {
  const container = document.getElementById("Active__Notes");
  container.innerHTML = "";
  notes.forEach(function (note) {
    const container = document.getElementById("Active__Notes");
    let element = document.createElement("div");
    element.className = "Notes__Items";
    element.innerHTML = `<h3 class="Title">${note.task}</h3><p>${note.description}</p>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("Delete__Btn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener("click", deleteNote);
    deleteBtn.id = note.id;
    container.appendChild(element);
    element.lastElementChild.append(deleteBtn);
  });
}

function renderNoteAccordian(e) {
  document.getElementById("Add__Notes").classList.toggle("active");
  console.log(e.target);
}

function renderActiveNoteAccordian(e) {
  console.log(e.target);
  e.target.parentElement.classList.toggle("active");
}

// *Controller

// add To Do
function addNote() {
  const noteTitle = document.getElementById("Notes__Title");
  const title = noteTitle.value;
  const noteDescription = document.getElementById("Notes__Description");
  const date = noteDescription.value;
  if (title != "") {
    createNote(title, date);
    renderNote();
  }
}

// clear Input box
function clearInput() {
  const noteTitle = document.getElementById("Notes__Title");
  const noteDescription = document.getElementById("Notes__Description");
  noteTitle.value = "";
  noteDescription.value = "";
}

// delete note task
function deleteNote(e) {
  const deleteButton = e.target.parentElement.id;
  console.log(deleteButton.id);
  removeNote(deleteButton);
  renderNote();
}

// Event handlers
const addNoteButton = document.querySelector("#Add__Notes__Btn");
const clearNoteButton = document.querySelector("#Clear__Notes__Btn");
const toggleNotes = document.getElementById("Hide__Btn");
const activeNotes = document.getElementsByClassName("Title");
console.log(activeNotes);
addNoteButton.addEventListener("click", addNote);
addNoteButton.addEventListener("click", clearInput);
clearNoteButton.addEventListener("click", clearInput);
renderNote();
toggleNotes.addEventListener("click", renderNoteAccordian);
for (i = 0; i < activeNotes.length; i++) {
  activeNotes[i].addEventListener("click", renderActiveNoteAccordian);
}
