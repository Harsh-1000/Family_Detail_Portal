function Family(firstName,lastName,dob,age,relation,bg,maritalStatus,gender){
    this.firstName = firstName;
    this.lastName=lastName;
    this.dob=dob;
    this.age=age;
    this.relation=relation;
    this.bg=bg;
    this.maritalStatus=maritalStatus;
    this.gender=gender;   
}

// function User(firstName,lastName,age,email){
//     this.firstName = firstName,
//     this.lastName = lastName,
//     this.age = age,
//     this.email = email;
//     this.family = [];
// }

// User.prototype.addMember = function (member){
//     this.family.push(member);
// }


const loginEmail = localStorage.getItem('login');
const user = JSON.parse(localStorage.getItem(loginEmail))
console.log(user);

const form = document.getElementById('family-form');

form.addEventListener('submit',function(evet)
{

    evet.preventDefault();
    const formData = new FormData(form);

    const member = new Family(formData.get('fname'),
                              formData.get('lname'),
                              formData.get('dob'),
                              formData.get('age'),
                              formData.get('relation'),
                              formData.get('bloodGroup'),
                              formData.get('maritalStatus'),
                              formData.get('gender'));

    user.family.push(member);
    localStorage.setItem(user.email,JSON.stringify(user));
})

function showAllMemebers()
{
    let table = document.getElementById('family-member');
    let row = table.insertRow(0);
    
}