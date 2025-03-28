// elementleri almak
const addİnput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todolist = document.querySelector(".list-group");
const cardbody1 = document.querySelectorAll(".card-body")[0];
const cardbody2 = document.querySelectorAll(".card-body")[1];
const clearbutton = document.querySelector("#clearButton");
const filterinput=document.querySelector("#todoSearch")


let todos = [];


runEvents();


function runEvents(e) {
    form.addEventListener("submit", addtodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    cardbody2.addEventListener("click",removeTodoToUI)
    clearbutton.addEventListener("click",removeAllTodos)
    filterinput.addEventListener("keyup",filter);

}

function filter(e){
    const filtervalue=e.target.value.toLowerCase().trim();
    const todolistesi=document.querySelectorAll(".list-group-item");
    if(todolistesi.length>0){
        todolistesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filtervalue)){
                todo.setAttribute("style","display : block");
            }
            else{
                todo.setAttribute("style","display : none !important")

            }
        })

    }else{
        showAlert("danger","en az bir todo olmalıdır")
    }
}

function removeAllTodos(){
    // arayüzden silme
    const todolar=document.querySelectorAll(".list-group-item")
    if(todolar.length>0){
        todolar.forEach(function(todo){
            todo.remove();
        })
        // storageden silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","todolar başarıyla silindi")
    }else showAlert("warning","en az bir todo olmalıdır")
}


function removeTodoToUI(e){

    // arayüzden silme
    if(e.target.className==="fa fa-remove"){
        const removingtodo=e.target.parentElement.parentElement
        removingtodo.remove();

        // storageden silme
        removeTodoFromStorage(removingtodo.textContent);
        showAlert("success","TODO başarıyla silindi")
    }

}

function removeTodoFromStorage(removetodo){
    checkTodosFromStorage()
    todos.forEach(function(todo,index){
        if(removetodo===todo){
            todos.splice(index,1);
        }
        localStorage.setItem("todos",JSON.stringify(todos));
    })
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);  
    })
}

function addtodo(e) {

    const inputtext = addİnput.value.trim();
    if (inputtext == null || inputtext == "") {
        showAlert("warning", "lütfen boş bırakmayınız!!!!")
    }
    else {
        // arayüz ekleme
        addTodoUI(inputtext)
        addTodotoStorage(inputtext)
        showAlert("success", "Başarıyla eklendi")
    }
    // storage ekleme
    e.preventDefault();

}


function addTodotoStorage(newtodo) {
    checkTodosFromStorage()
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else
        todos = JSON.parse(localStorage.getItem("todos"));

}

function addTodoUI(newtodo) {
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
    addİnput.value = "";
}

function showAlert(type, message) {
    //     <div class="alert alert-warning" role="alert">
    //   A simple warning alert—check it out!
    // </div>

    const div = document.createElement("div");
    div.className = `alert alert-${type}`
    div.textContent = message;
    div.style.marginTop = "25px"
    cardbody1.appendChild(div);

    setTimeout(function () {
        div.remove()

    }, 2500);
}