Penjelasan:

# Function `createData()`:
```javascript
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
```

Fungsi `createData()` ini digunakan untuk membuat data baru dengan mengirimkan permintaan HTTP POST ke API pada `apiUrl`. Data yang akan dikirimkan dalam format JSON, yang terdiri dari id, name, dan email yang diambil dari inputan dengan id `id`, `name`, dan `email`.

Setelah membuat objek data, fungsi `fetch()` dipanggil untuk mengirim permintaan POST ke `apiUrl`. Data JSON yang dibuat tadi dikirimkan dalam body permintaan, dan header permintaan ditetapkan sebagai `'Content-Type': 'application/json'`.

Setelah permintaan berhasil dikirim, fungsi `.then()` dijalankan, dimana response yang diterima dari server dicek dengan `response.ok` apakah berhasil atau tidak. Jika gagal, maka `throw new Error('Failed to create data')` akan membuat pesan error dan menampilkan alert dengan pesan tersebut.

Jika berhasil, maka akan ditampilkan alert yang menyatakan bahwa data berhasil dibuat dan memanggil fungsi `clearForm()` yang digunakan untuk menghapus inputan yang telah diisi dan menampilkan data yang sudah terbaru di tampilan. Jika terdapat error pada permintaan, maka fungsi `.catch()` akan menampilkan error yang dihasilkan pada console dan juga menampilkan alert dengan pesan error tersebut.

# Function `readData()`:
```javascript
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
```

Script ini berfungsi untuk mengambil data dari sebuah API, kemudian menampilkan data tersebut dalam bentuk tabel di halaman web. Berikut adalah penjelasan lebih detailnya:

1. `fetch(apiUrl)`: melakukan permintaan GET ke URL yang ditentukan dalam variabel `apiUrl` untuk mengambil data dari API.

2. `.then(response => response.json())`: mengambil data respons dari API dalam bentuk JSON.

3. `.then(data => {...})`: mengambil data JSON yang telah diubah pada langkah sebelumnya, kemudian menampilkan data tersebut dalam bentuk tabel di halaman web. Berikut adalah penjelasan untuk setiap baris kode dalam blok ini:

4. `const table = document.querySelector('table')`: mengambil elemen HTML `<table>` dari halaman web.

5. `const tbody = table.querySelector('tbody')`: mengambil elemen HTML `<tbody>` dari tabel untuk menambahkan baris baru ke tabel.

6. `tbody.innerHTML = ''`: membersihkan isi dari elemen HTML `<tbody>` agar data yang ditampilkan selalu terbaru.

7. `data.forEach(item => {...})`: melakukan iterasi pada setiap item dalam array data JSON yang telah diambil.

8. `const row = document.createElement('tr')`: membuat elemen HTML `<tr>` untuk menambahkan baris ke dalam tabel.

9. `const id = document.createElement('td')`: membuat elemen HTML `<td>` untuk menambahkan data ID ke dalam baris.

10. `const name = document.createElement('td')`: membuat elemen HTML `<td>` untuk menambahkan data nama ke dalam baris.

11. `const email = document.createElement('td')`: membuat elemen HTML `<td>` untuk menambahkan data email ke dalam baris.

12. `id.innerText = item.id`: menambahkan data ID ke dalam elemen HTML `<td>` yang telah dibuat.

13. `name.innerText = item.name`: menambahkan data nama ke dalam elemen HTML `<td>` yang telah dibuat.

14. `email.innerText = item.email`: menambahkan data email ke dalam elemen HTML `<td>` yang telah dibuat.

15. `row.appendChild(id)`: menambahkan elemen HTML `<td>` yang berisi data ID ke dalam elemen HTML `<tr>`.

16. `row.appendChild(name)`: menambahkan elemen HTML `<td>` yang berisi data nama ke dalam elemen HTML `<tr>`.

17. `row.appendChild(email)`: menambahkan elemen HTML `<td>` yang berisi data email ke dalam elemen HTML `<tr>`.

18. `tbody.appendChild(row)`: menambahkan elemen HTML `<tr>` yang telah dibuat ke dalam elemen HTML `<tbody>` pada halaman web.

19. `.catch(error => {...})`: menangani kesalahan saat mengambil data dari API. Jika terdapat kesalahan, akan ditampilkan pesan error pada konsol dan dalam bentuk pop-up di halaman web.



# Function `updateData()`:

```javascript
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
```

Script `updateData()` di atas berfungsi untuk mengirimkan permintaan ke API untuk mengubah data yang sudah ada. Berikut adalah penjelasan lebih detailnya:

1. Pertama-tama, nilai dari input id, name, dan email diambil menggunakan `document.getElementById('id').value`, `document.getElementById('name').value`, dan `document.getElementById('email').value`.

2. Nilai dari name dan email kemudian disimpan ke dalam objek data dengan properti yang sesuai.

3. Kemudian, dilakukan `fetch` pada URL yang sudah ditentukan (`${apiUrl}/${id}`) dengan method PUT. Data yang akan diubah kemudian dikirimkan dalam bentuk JSON menggunakan `JSON.stringify(data)` dan tipe konten yang dikirimkan juga diatur ke application/json.

4. Jika permintaan berhasil dilakukan, maka akan muncul alert "Data updated successfully", dan form akan di-reset menggunakan fungsi `clearForm()`.

5. Jika terjadi kesalahan pada saat permintaan dilakukan, maka akan muncul alert dengan pesan kesalahan yang diterima dari server. Pesan kesalahan ini diambil menggunakan `error.message`, dan ditampilkan pada alert menggunakan `alert(error.message)`. Jika terjadi kesalahan, maka pesan kesalahan juga akan ditampilkan di console menggunakan `console.error(error)`.

# Function `deleteData()` :

```javascript
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
```

Script tersebut berfungsi untuk menghapus data dari API menggunakan metode HTTP DELETE. Berikut adalah penjelasan lebih detailnya:

1. `const id = document.getElementById('id').value;`: Mengambil nilai dari elemen dengan id 'id' yang ada pada halaman web, kemudian menyimpannya ke dalam variabel id.

2. `fetch(${apiUrl}/${id}, {method: 'DELETE'})` : Mengirimkan permintaan HTTP DELETE ke API dengan URL yang ditentukan, yaitu apiUrl/id.

3. `.then(response => {...})` : Menangani respons dari API setelah permintaan di atas berhasil dikirimkan. Pada bagian ini, terdapat beberapa proses yang dilakukan, yaitu:

a. Memeriksa status respons dari API menggunakan `if (!response.ok)`, jika status respons tidak ok (bernilai false), maka akan dilemparkan error dengan pesan "Failed to delete data".

b. Jika status respons ok, maka akan muncul pesan "Data deleted successfully" dan melakukan fungsi `clearForm()` untuk membersihkan nilai pada form.

4. `.catch(error => {...})` : Menangani error yang terjadi selama pengiriman permintaan ke API. Jika terjadi error, maka akan menampilkan pesan error pada console dan halaman web.


# Function `searchData()` :

```javascript
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
```

Script `searchData()` digunakan untuk melakukan pencarian data pada API dengan menggunakan query string. Berikut adalah penjelasan lebih detailnya:

1. `const search = document.getElementById('search').value;`: Mendapatkan nilai yang diinputkan pada elemen input dengan id 'search'.
   
2. `fetch(${apiUrl}?q=${search})`: Mengambil data dari API dengan menggunakan metode HTTP GET pada URL yang ditentukan dengan menambahkan query string "?q=" yang berisi nilai pencarian.

3. `.then(response => response.json())`: Mengubah data yang diterima dari API ke dalam format JSON.

4. `.then(data => {...})`: Menangani data JSON yang diterima dan melakukan proses penambahan elemen tabel pada halaman web seperti yang telah dijelaskan pada penjelasan sebelumnya.

5. `.catch(error => {...})`: Menangani kesalahan yang terjadi saat mengambil data dari API dan menampilkan pesan kesalahan pada halaman web.

# Function `clearForm()`:

```javascript
function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('search').value = '';
    readData();
}
```

Fungsi `clearForm()` adalah untuk menghapus isi dari input field pada form dan mengisi kembali tabel dengan data yang terbaru. Berikut adalah penjelasan lebih detailnya:

1. Mengambil elemen input field dengan id 'id', 'name', 'email', dan 'search' menggunakan document.`getElementById()`.
   
2. Mengosongkan nilai value dari setiap input field dengan menetapkan nilai value mereka menjadi string kosong ('').
   
3. Memanggil fungsi `readData()` untuk mengambil data terbaru dari API dan menampilkan data tersebut dalam tabel.

# Function `loadPage()`:

```javascript
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
```

1. Pada elemen anchor di navbar, kita menambahkan atribut `onclick` yang memanggil function `loadPage` dengan argumen URL file HTML yang akan diload ke halaman.

2. Fungsi `loadPage` akan membuat objek `XMLHttpRequest` untuk memuat konten HTML yang dipilih.

3. Ketika `readyState` berubah, fungsi akan memeriksa apakah request sukses (`readyState = 4` dan status = 200).

4. Jika sukses, konten HTML akan dimasukkan ke dalam elemen main-content menggunakan innerHTML.