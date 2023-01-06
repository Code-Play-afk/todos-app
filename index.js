// *Model
let toDos = JSON.parse(localStorage.getItem("task"));
if (toDos === null) {
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
}

// Create
function createToDo(task, description) {
  const newId = String(new Date().getTime());
  toDos.push({
    task: task,
    description: description,
    id: newId,
  });
  const todoString = JSON.stringify(toDos);
  localStorage.setItem("task", todoString);
}

// Delete
function removeToDo(idToDelete) {
  toDos = toDos.filter(function (todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  const todoString = JSON.stringify(toDos);
  localStorage.setItem("task", todoString);
}
// *View

renderToDo();
function renderToDo() {
  const container = document.getElementById("Container");
  container.innerHTML = "";
  toDos.forEach(function (toDo) {
    const container = document.getElementById("Container");
    let element = document.createElement("div");
    element.className = "Todo__Items";
    element.innerHTML = `<h3>${toDo.task}</h3><p>${toDo.description}</p>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("Delete__Btn");
    deleteBtn.innerText = "Delete Note";
    deleteBtn.addEventListener("click", deleteToDo);
    deleteBtn.id = toDo.id;
    container.appendChild(element);
    element.firstElementChild.append(deleteBtn);
  });
}

// *Controller

// add To Do
function addToDo() {
  const todoTitle = document.getElementById("Todo__Title");
  const title = todoTitle.value;
  const todoDescription = document.getElementById("Todo__Description");
  const date = todoDescription.value;
  if (title != "") {
    createToDo(title, date);
    renderToDo();
  }
}

// clear Input box
function clearInput() {
  const todoTitle = document.getElementById("Todo__Title");
  const todoDescription = document.getElementById("Todo__Description");
  todoTitle.value = "";
  todoDescription.value = "";
}

// delete todo task
function deleteToDo(e) {
  const deleteButton = e.target.id;
  console.log(deleteButton.id);
  removeToDo(deleteButton);
  renderToDo();
}

// Event handlers
const addToDoButton = document.querySelector("#Add__Todos__Btn");
const clearToDoButton = document.querySelector("#Clear__Todos__Btn");
addToDoButton.addEventListener("click", addToDo);
addToDoButton.addEventListener("click", clearInput);
clearToDoButton.addEventListener("click", clearInput);
