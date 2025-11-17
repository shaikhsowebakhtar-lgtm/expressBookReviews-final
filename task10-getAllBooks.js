const axios = require('axios');

function getAllBooks(callback) {
  axios.get('http://localhost:5000/books')
    .then(response => callback(response.data))
    .catch(err => console.error(err));
}

getAllBooks(data => console.log(data));
