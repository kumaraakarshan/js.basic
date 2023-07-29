// localStorage.setItem('name', 'Bob')
// //console.log(localStorage.getItem('name'))
// localStorage.removeItem('name');
// sessionStorage.setItem('name','john')
// sessionStorage.setItem('name','bob')
// //console.log(sessionStorage.getItem('name'))
// document.cookie = 'name=Kyle; expires=' + new Date(2030, 0, 1).toUTCString();


// document.cookie = 'lastname=aaku; expires=' + new Date(2030, 0, 1).toUTCString();
// console.log(document.cookie);

document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const timeForCall = document.getElementById("time_for_call").value;

    const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTime for Call: ${timeForCall}`;
    localStorage.setItem('Name',`${name}`);
    localStorage.setItem('Email',`${email}`);
    localStorage.setItem('Phone',`${phone}`);
    localStorage.setItem('Time For Call',`${timeForCall}`);
});