let getLocalData = JSON.parse(localStorage.getItem("local_storage_data")) || [] // purification of data gotten from the local storage
let container = document.getElementById("list_container") // assignment of the list_container id element to a variable
const inputTag = document.getElementById("todo_input") // assignment of the todo_input id element to a variable
var newDiv = "<div>" // assignment of a opening div tag to a variable

// a function to check if a data is empty 
function checkEmpty(data, yes){
  return data.length ? yes : `<p class="text-center">No Task</p>` // checking the data length if it is not empty it returns the yes parameter but if it is empty returns the string p tag
}

// a function to be called when the edit button on the list card is clicked 
function handleEdit(){
  const active = document.activeElement.id // assigning the active element id to a variable
  inputTag.value = active // setting the value of the input tag targeted above to the id of the active element
  const newList = getLocalData.filter((value) => value !== active) // creating a new array from filtering the list and returning only elements that is not the targeted id
  getLocalData = newList // changing the data gotten from the local storage to the new array created while filtering
  localStorage.setItem("local_storage_data", JSON.stringify(newList)) // stringify the new array created then saving it to the local storage with a key named local_storage_data 
  for(i = 0; i < getLocalData.length; i++){
    newDiv += listDiv(getLocalData[i]) // looping through the data gotten from the local storage, calling a function to assign each element to already existing data of the newDiv variable holding the opening div tag 
  }
  newDiv += "</div>" // closing the earlier opened div tag
  container.innerHTML = checkEmpty(getLocalData, newDiv) // setting the constructed div to the container element that was targeted and assigned to a variable earlier
  newDiv = "<div>"  // resetting the variable back to the opening div tag
}

// a function to be called when the delete button on the list card is clicked 
function handleDelete(){
  const active = document.activeElement.id // assigning the active element id to a variable
  const newList = getLocalData.filter((value) => value !== active) // creating a new array from filtering the list and returning only elements that is not the targeted id
  getLocalData = newList // changing the data gotten from the local storage to the new array created while filtering
  localStorage.setItem("local_storage_data", JSON.stringify(newList)) // stringify the new array created then saving it to the local storage with a key named local_storage_data 
  for(i = 0; i < getLocalData.length; i++){
    newDiv += listDiv(getLocalData[i]) // looping through the data gotten from the local storage, calling a function to assign each element to already existing data of the newDiv variable holding the opening div tag 
  }
  newDiv += "</div>" // closing the earlier opened div tag
  container.innerHTML = checkEmpty(getLocalData, newDiv) // setting the constructed div to the container element that was targeted and assigned to a variable earlier
  newDiv = "<div>" // resetting the variable back to the opening div tag
}

// a function to return the task list card containing the input value
function listDiv(task){
  return `
    <div key="${task}" class="border rounded-3 px-3 py-2 my-2 d-flex justify-content-between">
      <p class="m-0 fs-5 text-capitalize">${task}</p>
      <div>
        <button id="${task}" onclick="handleEdit()" class="btn btn-info text-white fa fa-edit"></button>
        <button id="${task}" onclick="handleDelete()" class="btn btn-danger fa fa-trash"></button>
      </div>
    </div>
  `
};

// a function that add input value to the list to be displayed
function addTodo(){
  const inputValue = inputTag.value.toLowerCase() // input value transformed to lower case assigned to a variable

  if(inputValue.length){ // if statement checking if the input value is not empty
    if(getLocalData?.includes(inputValue)){ // if statement checking if the list data stored to local storage contains the input value
      alert("task already exist!") // alerting method to display if the statement is true
    }else{ // else if the list data stored to local storage doesn't contain the input value
      getLocalData.push(inputValue) // push the input value to the data list gotten from the local storage
      localStorage.setItem("local_storage_data", JSON.stringify(getLocalData)) // stringify the pushed input value created then saving it to the local storage with a key named local_storage_data
      for(i = 0; i < getLocalData.length; i++){
        newDiv += listDiv(getLocalData[i]) // looping through the data gotten from the local storage, calling a function to assign each element to already existing data of the newDiv variable holding the opening div tag 
      }
      newDiv += "</div>" // closing the earlier opened div tag
      container.innerHTML = newDiv // setting the constructed div to the container element that was targeted and assigned to a variable earlier
      newDiv = "<div>" // resetting the variable back to the opening div tag
    }
  }else{ // if statement checking if the input value is empty
    alert("input a task") // alerting method to display if the statement is empty
  }
  inputTag.value = "" // assigning an empty string to the value of the input targeted
}

// javascript event method used to execute codes if the page/file is loaded 
onload = () => {
  for(i = 0; i < getLocalData.length; i++){
    newDiv += listDiv(getLocalData[i]) // looping through the data gotten from the local storage, calling a function to assign each element to already existing data of the newDiv variable holding the opening div tag 
  }
  newDiv += "</div>" // closing the earlier opened div tag
  container.innerHTML = checkEmpty(getLocalData, newDiv) // setting the constructed div to the container element that was targeted and assigned to a variable earlier
}