const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    //Get value when user input
    let userEnteredValue = inputBox.value;
    //If the user enters a value (not a space)
    if(userEnteredValue.trim() != 0){
        //  Then my add button will light up
        // In case I enter all spaces ( space ), it won't light up
        addBtn.classList.add("active");
    } else {
        // Otherwise, it's not bright
        addBtn.classList.remove("active");
    }
}
showTasks();
// Now I will write a function to manipulate the Add button
addBtn.onclick = ()=>{
    // When the user clicks the Add button
    // Get the value that the user entered in the input box
    let userEnteredValue = inputBox.value;
    // Get localStorage (local storage variable)
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // If localStorage = null
        // Then will create an empty array
        listArray = [];
    } else {
        // Otherwise, it will convert JSON from string to Object
        listArray = JSON.parse(getLocalStorageData);
    }
    // Push new value into created array
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify(listArray)); // Convert JSON from Object to String
    showTasks();
    addBtn.classList.remove("active");
}
function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // If localStorage = null
        // Then will create an empty array
        listArray = [];
    } else {
        //Otherwise, it will convert JSON from string to Object
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New todo", JSON.stringify(listArray)); 
  showTasks(); 
}