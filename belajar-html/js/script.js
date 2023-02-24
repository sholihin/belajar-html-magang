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