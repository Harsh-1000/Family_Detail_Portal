let form = document.getElementById('login-form');

function User(firstName,lastName,age,email){
    this.firstName = firstName,
    this.lastName = lastName,
    this.age = age,
    this.email = email;
    this.family = [];
    
}

form.addEventListener('submit', function(event) {
    const formData = new FormData(form); 
    const user = new User(formData.get('fname'),formData.get('lname'),formData.get('age'),formData.get('email'));
    console.log(user.firstName +"  "+user.lastName +"  " + user.age + "  " + user.email);
    if(localStorage.getItem(user.email)===null){
        localStorage.setItem(user.email,JSON.stringify(user));
    }
    localStorage.setItem("login",user.email);
})



