/**
 * isFormOpen - this boolean variable is use to maintain wether Add Member form is open or not
 * isFormOpen = true : Form is open
 * isFormOpen = false : Form is closed
 */
var isFormOpen = false;

/**
 * loginEmail - to get the email of login user
 */
const loginEmail = localStorage.getItem('login');
/**
 * user - to get login user detail
 */
const user = JSON.parse(localStorage.getItem(loginEmail))
const form = document.getElementById('family-form');

/**
 * Family - to store the family member record
 * 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} dob 
 * @param {*} age 
 * @param {*} relation 
 * @param {*} bg 
 * @param {*} maritalStatus 
 * @param {*} gender 
 * 
 * 
 */
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

/**
 * window onLoad - it displays all family member in table format and login user detail
 */
window.addEventListener('load',function()
{
    let familyMembers = user.family;
    
    for(let member of familyMembers) {
        addMemberToDisplyTable(member.firstName + ' ' + member.lastName,
            member.relation,member.age)
    }
    showLoginUserDetail();
    showMemeberDetail();
})

/**
 * form submit - it is use to get family memeber detail and store it in local storage
 */
form.addEventListener('submit',function(evet){
    evet.preventDefault();
    const formData = new FormData(form);
    const age = calculateAge(formData.get('dob'));
    const member = new Family(formData.get('fname'),
                              formData.get('lname'),
                              formData.get('dob'),
                              age,
                              formData.get('relation'),
                              formData.get('bloodGroup'),
                              formData.get('maritalStatus'),
                              formData.get('gender'));

    user.family.push(member);
    localStorage.setItem(user.email,JSON.stringify(user));
    addMemberToDisplyTable(formData.get('fname') +' '+formData.get('lname'),formData.get('relation'),age);
    isFormOpen=true;
    document.getElementById('fname').focus();
    form.reset();
})

/**
 * close-btn event - to close the form and set the isFormOpen boolean to false
 */
document.getElementById('close-btn').addEventListener('click', function()
{
    document.getElementById('add-member').style.display='none';
    document.getElementById('about-website').style.display='block';
    isFormOpen=false;
})

/**
 * 
 * addMemberToDisplyTable - to add new row at the top of the table to show new added memeber
 *                          and call showMemeberDetail() to add event listner
 * 
 * @param {*} name 
 * @param {*} relation 
 * @param {*} age 
 * 
 */
function addMemberToDisplyTable(name,relation,age)
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

/**
 * show the detail of the member on the hover of the corresponding row in the table
 * @param {*} rowIndex 
 */
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

/**
 * implement the hover functionality to show member detail on hover
 */
function showMemeberDetail()
{
        const tableRows = document.querySelectorAll("tbody tr");
        const showDetail = document.getElementById('show-detail');
   
        tableRows.forEach(row => {
            row.addEventListener("mouseover", () => {
                if(!isFormOpen){
                    console.log(isFormOpen);        
                    showDetail.style.display = 'block';
                    console.log(`Row index: ${row.rowIndex}`);
                    document.getElementById('about-website').style.display='none';
                    getMemberDetail(row.rowIndex);
                }
            });
            row.addEventListener("mouseout", () => {
                if(!isFormOpen){
                    showDetail.style.display = 'none';
                    document.getElementById('about-website').style.display='block';
                }
            });
        });
}

/**
 * open add member form
 */
function addMember()
{
    document.getElementById('add-member').style.display='block';
    document.getElementById('about-website').style.display='none';
    document.getElementById('fname').focus();
    isFormOpen=true;
}

/**
 * show login user details
 */
function showLoginUserDetail(){
    document.getElementById('user-name').innerHTML = user.firstName + ' ' + user.lastName;
    document.getElementById('user-age').innerHTML = user.age;
    document.getElementById('user-email').innerHTML = user.email;
}

/**
 * logout login user
 */
function logout()
{
    localStorage.removeItem('login');
    window.location.href = './index.html';
}

/**
 * calculate age using dob
 * @param {*} dob 
 * @returns age
 */
function calculateAge(dob)
{
    let today = new Date();
    let birthDate = new Date(dob);
    let diff = new Date (today.getTime() - birthDate.getTime());
    let age = Math.abs(diff.getUTCFullYear() - 1970);
    return age;
}

