
document.body.innerHTML = `
<div class = user-form>
<input class=" form-control add-user-name" placeholder="Enter your name" required>
<input class=" form-control  add-user-avatar " placeholder="Enter your pic url" required>
<button class="add-user-btn" onclick = "addUser()"><i class="fas fa-plus"></i> Add User </button>
</div>
<section class = "user-list"></section>`

async function getAllusers(){
  let data = await fetch("https://6166c57613aa1d00170a6776.mockapi.io/user")
  let users = await data.json();

  const userConatiner = document.querySelector(".user-list")

  userConatiner.innerHTML = "";
  users.forEach((user) => {
    userConatiner.innerHTML +=`
    <div class = "user-container">
    <img class = "user-avatar" src = "${user.avatar}" alt = ${user.name}/>
    <div>
    <p class = "user-name" >${user.name}</p>
    <button class = "btn btn-primary" onclick = "toggleEdit(${user.id})"><i class="fas fa-user-edit"></i> Edit</button>
    <button class = "btn btn-danger" onclick = "deleteUser(${user.id})"><i class="far fa-trash-alt"></i> Delete</button>
    <div class = " edit-user-form edit-${user.id}">
    <input value = "${user.name}" class=" Edit-name-input edit-${user.id}-user-name" placeholder="Enter your name" required>
    <input value = "${user.avatar}" class=" Edit-avatar-input edit-${user.id}-user-avatar" placeholder="Enter your pic url"required>
    <button class= "save-btn" onclick = "saveUser(${user.id})">save</button>
     </div>
    </div>
    </div>
    `
  });
}

getAllusers();

async function deleteUser(userId){
  let data = await fetch("https://6166c57613aa1d00170a6776.mockapi.io/user/" + userId ,{method: "DELETE"})
  let users = await data.json();
 
  getAllusers();
}



async function addUser(){
 const userName = document.querySelector(".add-user-name").value
 const userAvatar = document.querySelector(".add-user-avatar").value

 //Method Post
 let data = await fetch("https://6166c57613aa1d00170a6776.mockapi.io/user/" ,
 {
   method: "POST",
   headers: { "Content-Type": "application/json"},
   body : JSON.stringify({name :  userName , avatar : userAvatar}),
  })

  getAllusers()
}


function toggleEdit(userId){
     const editUserForm = document.querySelector(`.edit-${userId}`)
     editUserForm.style.display = editUserForm.style.display === "block" ? "none" : "block";
}

 async function saveUser(userId){
  const userEditName = document.querySelector(`.edit-${userId}-user-name`).value
  const userEditAvatar = document.querySelector(`.edit-${userId}-user-avatar`).value
  let data = await fetch("https://6166c57613aa1d00170a6776.mockapi.io/user/" + userId ,
  { 
    method: "PUT",  
    headers: { "Content-Type": "application/json"},
    body : JSON.stringify({name : userEditName , avatar :userEditAvatar}),
})
  
getAllusers()
}