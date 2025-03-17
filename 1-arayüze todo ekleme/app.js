// elementleri almak
const addİnput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todolist = document.querySelector(".list-group");
const cardbody1 = document.querySelectorAll(".card-body")[0];
const cardbody2 = document.querySelectorAll(".card-body")[1];
const clearbutton = document.querySelector("#clearButton");

runEvents();


function runEvents(e) {
    form.addEventListener("submit", addtodo);

}


function addtodo(e) {
    
    const inputtext = addİnput.value.trim();
    if (inputtext == null || inputtext == "") {
        alert("bir değer girniz")
    }
    else {
        // arayüz ekleme
        addTodoUI(inputtext)
    }
    // storage ekleme
    e.preventDefault();
  
}



function addTodoUI(newtodo){
    const li = document.createElement("li");
    li.textContent = newtodo;
    li.className = "list-group-item d-flex justify-content-between";

    const a = document.createElement("a");
    a.href = "#"
    a.className = "delete-item"
    const i = document.createElement("i");
    i.className = "fa fa-remove";



    a.appendChild(i);
    li.appendChild(a);
    todolist.appendChild(li);
    addİnput.value="";
}