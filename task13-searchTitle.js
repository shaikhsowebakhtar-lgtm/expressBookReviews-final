const axios = require('axios');

async function searchByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/books/title/${title}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

searchByTitle("Things Fall Apart"); // replace with a title in your DB
