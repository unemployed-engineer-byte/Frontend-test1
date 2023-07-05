// Initialize variables
var todoList = []; // to store todo items
var completeList = []; // to store completed items
var remList = []; // to store remaining items
//Fetching HTML elements via respective IDs
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Event listeners for add and delete buttons
//When the buttons are clicked, the associated functions will be executed.
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Event listeners for filter buttons
//This event listener is attached to the entire document
document.addEventListener('click', (e) => {
  if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
    completeTodo(e);
  }
  if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
    deleteTodo(e);
  }
  if (e.target.id == "all") {
    viewAll();
  }
  if (e.target.id == "rem") {
    viewRemaining();
  }
  if (e.target.id == "com") {
    viewCompleted();
  }
});

// Event listener for enter key press,attached to the todoInput element
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    add();
  }
});

// Updates the remaining and completed tasks count
function update() {
  completeList = todoList.filter((ele) => {
    return ele.complete;
  });
  remList = todoList.filter((ele) => {
    return !ele.complete;
  });
  //updates the inner text of an HTML element with the length of todoList array and completeList array
  document.getElementById("r-count").innerText = todoList.length.toString();
  document.getElementById("c-count").innerText = completeList.length.toString();
}

// Adds a new task to the todoList array
function add() {
  var value = todoInput.value; //retrieving values from input field and check if its empty
  if (value === '') {
    alert("Task cannot be empty");
    return;
  }
  //new ToDo item object created
  todoList.push({
    task: value,  
    id: Date.now().toString(), //unique ID generator
    complete: false,
  });
  todoInput.value = ""; //clearing input field
  update(); 
  addinmain(todoList);  //Update UI
}

// Renders the main list and displays tasks on the UI
function addinmain(todoList) {
  allTodos.innerHTML = "";
  //iterating over each element in todoList
  todoList.forEach(element => {
    //variable x is assigned a string value. The string represents an HTML template for a single to-do item in a list.
    var x = `<li id=${element.id} class="todo-item">
      <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
      <div class="todo-actions">
        <button class="complete btn btn-success">
          <i class=" ci bx bx-check bx-sm"></i>
        </button>
        <button class="delete btn btn-error" >
          <i class="di bx bx-trash bx-sm"></i>
        </button>
      </div>
    </li>`;
    //this code dynamically generates HTML markup for each to-do item in the todoList array and appends it to the allTodos container element.
    allTodos.innerHTML += x;
  });
}

// Deletes an individual task and updates the list
function deleteTodo(e) {
  //This line retrieves the id attribute of the parent <li> element of the clicked element
  var deleted = e.target.parentElement.parentElement.getAttribute('id');
  todoList = todoList.filter((ele) => {
    //This condition compares the id property of each element in todoList with the deleted value obtained earlier
    // If the id does not match, the element is included in the filtered array
    return ele.id != deleted; //it should be true
  });
  //todoList now has elements whose id did not match i.e that items which are not deleted

  //to update the UI
  update(); // It updates the count of total items and completed items.
  addinmain(todoList);  // it updates the UI to display the modified todoList.
}

// Marks an individual task as complete or incomplete and updates the list
function completeTodo(e) {
  ////This line retrieves the id attribute of the parent <li> element of the clicked element
  var completed = e.target.parentElement.parentElement.getAttribute('id');
  todoList.forEach((obj) => {
    //It compares the id of each object in todoList with the completed value to find the corresponding object
    if (obj.id == completed) {
       //checks complete property of current object
      if (obj.complete == false) {
        obj.complete = true; 
        e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
      } else {
        obj.complete = false;
        e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
      }
    }
  });
  update(); //This line calls the update() function, which updates the UI to reflect the changes made to the todoList array.
  addinmain(todoList);  // Renders the main list and displays tasks on the UI
}

// Deletes all tasks -- It empties the todoList array
function deleteAll() {
  todoList = [];
  update();
  addinmain(todoList); 
}

// Deletes only the completed tasks
function deleteS() {
  todoList = todoList.filter((ele) => {
    return !ele.complete;
  }); 
  update();
  addinmain(todoList);
}

// Filters and displays only the completed tasks by calling the addinmain function with the appropriate list 
function viewCompleted() {
  addinmain(completeList);
}

// Filters and displays only the remaining tasks
function viewRemaining() {
  addinmain(remList);
}

// Displays all tasks
function viewAll() {
  addinmain(todoList);
}
