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
            
                action.innerHTML = '<button onclick="deleteData('+item.id+')">Delete</button><button onclick="editData('+item.id+')">Edit</button>';
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

function searchData() {
    var keyword =  document.getElementById('textSearch').value;

    if(keyword === ''){
        readData();
    }else{
        fetch(`${urlAPI}/${keyword}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                const table = document.querySelector('table');
                const tbody = table.querySelector('tbody');
                tbody.innerHTML = '';
                const item = data;
                // data.forEach(item => {
                    const row = document.createElement('tr');
                    const id = document.createElement('td');
                    const name = document.createElement('td');
                    const email = document.createElement('td');
                    const action = document.createElement('td');
                    id.innerText = item.id;
                    name.innerText = item.name;
                    email.innerText = item.email;
                
                    action.innerHTML = '<button onclick="deleteData('+item.id+')">Delete</button><button onclick="editData('+item.id+')">Edit</button>';
                    row.appendChild(id);
                    row.appendChild(name);
                    row.appendChild(email);
                    row.appendChild(action);
                    tbody.appendChild(row);
                // });
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    }
    
}

function editData(id){

    if(id === ''){
        alert('Id tidak tersedia!');
    }else{
        fetch(`${urlAPI}/${id}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                document.getElementById('id').value = data.id;
                document.getElementById('name').value = data.name;
                document.getElementById('email').value = data.email;
                document.getElementById('btnSave').setAttribute('onclick', 'updateData()');
                document.getElementById('btnSave').innerHTML = "Update";
                
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    }
}

function updateData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const data = {
        name: name,
        email: email
    };
    fetch(`${urlAPI}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to update data');
        }
        alert('Data update successfully');
		readData();
        clearForm();
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
    
}

function clearForm(){
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('btnSave').setAttribute('onclick', 'createData()');
    document.getElementById('btnSave').innerHTML = "Save";
}