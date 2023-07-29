
function displayLocalStorageData() {
    const itemList = document.getElementById('items');
    itemList.innerHTML = ''; // Clear the existing list items
    itemList.addEventListener('click', handleItemClick);

    // Loop through localStorage and display the data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        var deleteBtn = document.createElement('button');
        var editBtn = document.createElement('button');
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const combinedText = `${data.name} ${data.Email}-${data.Phone} (${data.date} at ${data.Time})`;
        li.appendChild(document.createTextNode(combinedText));
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.dataset.key = key;
        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.className = 'btn btn-warning btn-sm float-right edit';
        editBtn.dataset.key = key;
        editBtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        itemList.appendChild(li);
    }
}

function handleItemClick(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this item?')) {
            const key = e.target.dataset.key;
            localStorage.removeItem(key);
            const li = e.target.parentElement;
            li.remove();
        }
    } else if (e.target.classList.contains('edit')) {
        const key = e.target.dataset.key;
       
        const data = JSON.parse(localStorage.getItem(key));
        localStorage.removeItem(key);
        const li = e.target.parentElement;
        li.remove();
        document.getElementById("name").value = data.name;
        document.getElementById("email").value = data.Email;
        document.getElementById("phone").value = data.Phone;
        document.getElementById("date").value = data.date;
        document.getElementById("time_for_call").value = data.Time;
        document.getElementById("submitBtn").textContent = "Save";
        
        document.getElementById("submitBtn").dataset.key = key;
    }
}

document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const timeForCall = document.getElementById("time_for_call").value;
    const key = document.getElementById("submitBtn").dataset.key;

    if (key) {
        // If key exists, it means we are editing an existing item
        let myObj = {
            name: name,
            Email: email,
            Phone: phone,
            date: date,
            Time: timeForCall
        };
        let myObj_serialized = JSON.stringify(myObj);
        localStorage.setItem(key, myObj_serialized);
        document.getElementById("submitBtn").textContent = "Add Data";
        document.getElementById("submitBtn").removeAttribute("data-key");
    } else {
        // If key doesn't exist, it means we are adding a new item
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
    }

    displayLocalStorageData();
    clearInputFields();
});

function clearInputFields() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("date").value = '';
    document.getElementById("time_for_call").value = '';
}

displayLocalStorageData();

