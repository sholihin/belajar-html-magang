<template>
  <div class="form-column">
    <h3>Form Siswa</h3>
    <form action="#" method="POST" class="form-column">
        <input type="text" id="name" class="text-control my-10" placeholder="Isi dengan nama">
        <input type="email" id="email" class="text-control my-10" placeholder="Isi dengan email">
        <button type="button" class="btn-dark" onclick="createData()">Simpan</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      students: {
        id: '',
        nama:  '',
        email:   ''
      },
      urlAPI : 'http://localhost:9000/user'
    }
  },
  methods: {
  	createPost() {
      axios
        .post(urlAPI, this.students)
        .then((response) => console.log(response))
    }
	},
  mounted() {
    axios
      .get(urlAPI)
      .then((response) => {
        this.students = response.data
      })
  }
}
</script>

<style>

.text-control {
    padding: 5px 10px;
    border-radius: 10px;
}

.my-10 {
    margin: 3px 0px;
}

.btn-dark {
    padding: 5px 10px;
    background: #333;
    color: white;
    border-radius: 10px;
}

.form-column {
    display: flex;
    flex-direction: column;
    width: 80%;
}
</style>
