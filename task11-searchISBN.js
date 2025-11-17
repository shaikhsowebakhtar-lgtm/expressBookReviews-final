const axios = require('axios');

const isbn = "1"; // replace with the ISBN you want to search

axios.get(`http://localhost:5000/books/isbn/${isbn}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
