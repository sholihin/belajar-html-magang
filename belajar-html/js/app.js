const apiUrl = 'http://localhost:8080/api/data';

function createData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const data = {
        id: id,
        name: name,
        email: email
    };
    fetch(apiUrl, {
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
        clearForm();
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}

function readData() {
    fetch(apiUrl)
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
                id.innerText = item.id;
                name.innerText = item.name;
                email.innerText = item.email;
                row.appendChild(id);
                row.appendChild(name);
                row.appendChild(email);
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}

function updateData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const data = {
        name: name,
        email: email
    };
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to update data');
        }
        alert('Data updated successfully');
        clearForm();
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}

function deleteData() {
    const id = document.getElementById('id').value;
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete data');
        }
        alert('Data deleted successfully');
        clearForm();
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}

function searchData() {
    const search = document.getElementById('search').value;
    fetch(`${apiUrl}?q=${search}`)
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
                id.innerText = item.id;
                name.innerText = item.name;
                email.innerText = item.email;
                row.appendChild(id);
                row.appendChild(name);
                row.appendChild(email);
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}

function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('search').value = '';
    readData();
}

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
}