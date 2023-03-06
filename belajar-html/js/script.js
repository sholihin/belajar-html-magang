const urlAPI = 'http://localhost:9000/user';

function loadPage(pageUrl) {
	// Buat objek XMLHttpRequest
	var xhttp = new XMLHttpRequest();
	
	// Ketika readyState berubah
	xhttp.onreadystatechange = function() {
		// Jika request sukses
		if (this.readyState == 4 && this.status == 200) {
			// Masukkan konten ke dalam elemen main
			document.getElementById("main-content").innerHTML = this.responseText;
		}
	};
	
	// Buat request GET ke file HTML yang dipilih
	xhttp.open("GET", pageUrl, true);
	xhttp.send();

	readData();
}

function readData() {
    fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('table');
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                const id = document.createElement('td');
                const name = document.createElement('td');
                const email = document.createElement('td');
                const action = document.createElement('td');
                id.innerText = item.id;
                name.innerText = item.name;
                email.innerText = item.email;
            
                action.innerHTML = '<button onclick="deleteData('+item.id+')">Delete</button><button>Edit</button>';
                row.appendChild(id);
                row.appendChild(name);
                row.appendChild(email);
                row.appendChild(action);
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}

function deleteData(id) {
    fetch(`${urlAPI}/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete data');
        }
        alert('Data deleted successfully');
		readData();
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}

function createData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const data = {
        name: name,
        email: email
    };
    fetch(urlAPI, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to create data');
        }
        alert('Data created successfully');
		readData();
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
    
}