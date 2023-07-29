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
    itemList.addEventListener('click', removeItem);

    // Loop through localStorage and display the data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        var deleteBtn = document.createElement('button');
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const combinedText = `${data.name} ${data.Email}-${data.Phone} (${data.date} at ${data.Time})`;
        li.appendChild(document.createTextNode(combinedText));
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.dataset.key = key; // Store the key as a dataset attribute
        deleteBtn.appendChild(document.createTextNode('delete'));
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    }
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            const key = e.target.dataset.key; // Get the key from the dataset attribute
            localStorage.removeItem(key);
            const li = e.target.parentElement;
            li.remove();
        }
    }
}
document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const timeForCall = document.getElementById("time_for_call").value;

    const uniqueKey = Date.now().toString();
    let myObj = {
        name: name,
        Email: email,
        Phone: phone,
        date: date,
        Time: timeForCall
    };
    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(uniqueKey, myObj_serialized);
    displayLocalStorageData();
    let myObj_deserialized = JSON.parse(localStorage.getItem(uniqueKey));
    console.log(myObj_deserialized);
});

displayLocalStorageData();
