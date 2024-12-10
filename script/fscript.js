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

var isFormOpen = false;

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
    showMemeber(formData.get('fname') +' '+formData.get('lname'),formData.get('relation'),formData.get('age'));

    document.getElementById('add-member').style.display='none';
    form.reset();
})

function showMemeber(name,relation,age)
{
    let table = document.getElementById('table-body');
    let row = table.insertRow(0);
    row.classList.add('table-tr');
    let cell_name = row.insertCell(0);
    let cell_relation = row.insertCell(1);
    let cell_age = row.insertCell(2);

    cell_name.innerHTML = name;
    cell_relation.innerHTML = relation;
    cell_age.innerHTML = age;

    showMemeberDetail();
}

window.addEventListener('load',function()
{
    let familyMembers = user.family;
    
    for(let member of familyMembers)
    {
        showMemeber(member.firstName + ' ' + member.lastName,
            member.relation,member.age)
    }

    showMemeberDetail();
})


function showMemeberDetail()
{
    const tableRows = document.querySelectorAll("tbody tr");

    const showDetail = document.getElementById('show-detail');

    tableRows.forEach(row => {
        row.addEventListener("mouseover", () => {
            showDetail.style.display = 'block';
            console.log(`Row index: ${row.rowIndex}`);
            document.getElementById('add-member').style.display='none';
            getMemberDetail(row.rowIndex);
        });
        row.addEventListener("mouseout", () => {
            showDetail.style.display = 'none';
            if(isFormOpen)
            {
                document.getElementById('add-member').style.display='block';
            }
        });
    });
}

function getMemberDetail(rowIndex)
{
    let familyIndex = user.family.length-rowIndex; 
    document.getElementById('first-name').innerHTML=user.family.at(familyIndex).firstName;
    document.getElementById('family-name').innerHTML=user.family.at(familyIndex).lastName;
    document.getElementById('dob').innerHTML=user.family.at(familyIndex).dob;
    document.getElementById('age').innerHTML=user.family.at(familyIndex).age;
    document.getElementById('relation').innerHTML=user.family.at(familyIndex).relation;
    document.getElementById('blood-group').innerHTML=user.family.at(familyIndex).bg;
    document.getElementById('marital-status').innerHTML=user.family.at(familyIndex).maritalStatus;
    document.getElementById('gender').innerHTML=user.family.at(familyIndex).gender;
}

function logout()
{
    localStorage.removeItem('login');
    window.location.href = './index.html';
}

function addMember()
{
    document.getElementById('add-member').style.display='block';
    isFormOpen=true;
}

function close()
{
    document.getElementById('add-member').style.display='none';
}
