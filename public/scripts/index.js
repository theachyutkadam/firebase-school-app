const studentList = document.querySelector('#students-list');
const studentForm = document.querySelector('#add-student-form');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin')
const studentLists = document.querySelector('.students');

// create element & render cafe
// function renderStudents(doc){
//   let li = document.createElement('li');
//   let name = document.createElement('span');
//   let standard = document.createElement('span');
//   let cross = document.createElement('div');

//   li.setAttribute('data-id', doc.id);
//   name.textContent = doc.data().name;
//   standard.textContent = doc.data().standard;
//   cross.textContent = 'x';

//   li.appendChild(name);
//   li.appendChild(standard);
//   li.appendChild(cross);

//   studentList.appendChild(li);

//   cross.addEventListener('click', (e) => {
//     e.stopPropagation
//     let id = e.target.parentElement.getAttribute('data-id');
//     db.collection('students').doc(id).delete();
//   })
// }

// getting data
// db.collection('users').where('last_name', '==', 'kadam').get().then(snapshot => {
// db.collection('students').get().then(snapshot => {
//   snapshot.docs.forEach(doc => {
//     console.log(doc.data())
//     renderStudents(doc);
//   });
// });

// saving data
// studentForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   db.collection('students').add({
//     name: studentForm.name.value,
//     standard: studentForm.standard.value,
//   });
//   studentForm.name.value = '';
//   studentForm.standard.value = '';
// });

const setupUI = (user) => {
  if (user){
    if (user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div class="pink-text">${user.admin? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    })

    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    adminItems.forEach(item => item.style.display = 'none');
    accountDetails.innerHTML = '';
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// collect guidelist
const setupStudents = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const student = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${student.name} </div>
          <div class="collapsible-body white"> ${student.standard} </div>
        </li>
      `;
      html += li;
    });
    studentLists.innerHTML = html;
  }else{
    studentLists.innerHTML = '<h5 class="center align">Login to view students</h5>'
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
