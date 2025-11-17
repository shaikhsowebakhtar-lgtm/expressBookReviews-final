const axios = require('axios');

async function searchByAuthor(author) {
  try {
    const encodedAuthor = encodeURIComponent(author); // handle spaces or special chars
    const response = await axios.get(`http://localhost:5000/books/author/${encodedAuthor}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Replace with the author you want to search
searchByAuthor('Chinua Achebe');
