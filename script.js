// localStorage.setItem('name', 'Bob')
// //console.log(localStorage.getItem('name'))
// localStorage.removeItem('name');
// sessionStorage.setItem('name','john')
// sessionStorage.setItem('name','bob')
// //console.log(sessionStorage.getItem('name'))
// document.cookie = 'name=Kyle; expires=' + new Date(2030, 0, 1).toUTCString();


// document.cookie = 'lastname=aaku; expires=' + new Date(2030, 0, 1).toUTCString();
// console.log(document.cookie);


function displayLocalStorageData() {
    const itemList = document.getElementById('items');
    itemList.innerHTML = ''; // Clear the existing list items

    // Loop through localStorage and display the data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const data = JSON.parse(localStorage.getItem(key));

      const li = document.createElement('li');
      li.className = 'list-group-item';
      const combinedText = `${data.name} ${data.Email}-${data.Phone} (${data.date} at ${data.Time})`;
      li.appendChild(document.createTextNode(combinedText));

      itemList.appendChild(li);
    }
  }



document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const timeForCall = document.getElementById("time_for_call").value;

    // const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTime for Call: ${timeForCall}`;
    // localStorage.setItem('Name',`${name}`);
    // localStorage.setItem('Email',`${email}`);
    // localStorage.setItem('Phone',`${phone}`);
    // localStorage.setItem('Time For Call',`${timeForCall}`);
    const uniqueKey = Date.now().toString();
    let myObj ={
        name  : name,
        Email : email,
        Phone : phone,
        date  : date,
        Time  : timeForCall

    };

    let myObj_serialized =JSON.stringify(myObj);
    
    localStorage.setItem(uniqueKey,myObj_serialized);
    
    displayLocalStorageData();

    let myObj_deserialized=JSON.parse(localStorage.getItem("myObj"));
    console.log(myObj_deserialized);
    
});
displayLocalStorageData();

