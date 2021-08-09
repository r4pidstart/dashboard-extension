const form=document.querySelector("#form");
const todoList=document.querySelector("#todoList");
const ddayList=document.querySelector("#ddayList");

let usingDate=false;
let todos=[];
let ddays=[];

function paintDday(newDday)
{
    let li=document.createElement("li");
    let span1=document.createElement("span");
    span1.innerText=newDday.text

    let span2=document.createElement("span");
    let dday=Math.floor((Date.parse(newDday.dday)-Date.now())/(1000*60*60*24));
    span2.innerText=dday>0 ? "D-"+dday:"D+"+-dday;
    if(!dday)
        span2.innerText="D-Day";

    let button=document.createElement("button");
    button.innerText="X";

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(button);
    ddayList.append(li);
}

function paintTodo(newTodo)
{
    let li=document.createElement("li");
    let span=document.createElement("span");
    span.innerText=newTodo.text;

    let button=document.createElement("button");
    button.innerText="X";

    li.appendChild(span);
    li.appendChild(button);
    todoList.append(li);
}

function appendDday()
{
    let newDday=
    {
        id: Date.now(),
        text: form.querySelector("input[type=text]").value,
        dday: form.querySelector("input[type=date]").value
    }

    ddays.push(newDday);
    localStorage.setItem("ddays", JSON.stringify(ddays));
    paintDday(newDday);
    toggleType();
}

function appendTodo()
{
    let newTodo=
    {
        id: Date.now(),
        text: form.querySelector("input[type=text]").value
    }

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    paintTodo(newTodo);
}

function submitHandler(e)
{
    e.preventDefault();

    if(usingDate)
        appendDday();
    else
        appendTodo();

    form.querySelector("input[type=text]").value="";
}

function toggleType(e)
{
    if(!usingDate)
    {
        let dateForm=document.createElement("input");
        dateForm.type="date";
        dateForm.className="dateForm";
        dateForm.required=true;
        form.appendChild(dateForm);
        form.querySelector("input[type=text]").placeholder="date sample text";
        form.querySelector("input[type=checkbox]").checked=true;
    }
    else
    {
        form.removeChild(form.querySelector("input[type=date]"));
        form.querySelector("input[type=text]").placeholder="todo sample text";
        form.querySelector("input[type=checkbox]").checked=false;
    }
    usingDate=!usingDate;
}

function loadData()
{
    todos=JSON.parse(localStorage.getItem("todos"));
    ddays=JSON.parse(localStorage.getItem("ddays"));

    if(todos)
        todos.forEach(paintTodo);
    if(ddays)
        ddays.forEach(paintDday);
}

function updateDday()
{
    ddayList.querySelectorAll("li").forEach(item => ddayList.removeChild(item));
    ddays.forEach(paintDday);
}

loadData();
setInterval(updateDday, 1000); // to update dday
form.querySelector("input[type=checkbox]").addEventListener("click", toggleType);
form.addEventListener("submit", submitHandler);

// https://dev.to/codeclown/styling-a-native-date-input-into-a-custom-no-library-datepicker-2in
// https://jsfiddle.net/24jw9sb5/1/ 