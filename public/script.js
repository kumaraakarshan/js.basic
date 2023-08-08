// Form Submission Logic
document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const timeForCall = document.getElementById("time_for_call").value;

    const formData = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time_for_call: timeForCall
    };

    axios.post('/api/save-data', formData)
        .then(response => {
            alert(response.data.message); // Display the success message from the server
            fetchAndDisplayUsers(); // Refresh the user list after data is saved
        })
        .catch(error => {
            console.error('Error saving data: ', error);
        });

        alert('appointment booked successfully successfully')
});

// User Deletion Functionality
function deleteUser(userId) {
    axios.delete(`/api/delete-user/${userId}`)
    
        .then(response => {
            
            alert(response.data.message);
            fetchAndDisplayUsers(); // Refresh the user list after deletion
        })
        .catch(error => {
            console.error('Error deleting user: ', error);
        });
       
       alert('deleted successfully') 
       
}

// Fetch and Display Users
function fetchAndDisplayUsers() {
    axios.get('/api/get-users')
        .then(response => {
            const users = response.data;
            const userList = document.getElementById('items');
            
            if (!userList) {
                console.error('Error: userList element not found.');
                return;
            }
            
            userList.innerHTML = ''; 
            
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}, Date: ${user.date}, Time for Call: ${user.timeForCall}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteUser(user.id));
                

                listItem.appendChild(deleteButton);
                userList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching users: ', error);
        });
}

// Call the fetchAndDisplayUsers function when the page is fully loaded
window.addEventListener('load', fetchAndDisplayUsers);
