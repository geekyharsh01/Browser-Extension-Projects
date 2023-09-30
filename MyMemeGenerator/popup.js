document.addEventListener('DOMContentLoaded', function () {
  const generateButton = document.getElementById('generateButton');
  const memeImage = document.getElementById('memeImage');

  generateButton.addEventListener('click', async function () {
    try {
      const response = await fetch('https://meme-api.com/gimme');
      const data = await response.json();
      memeImage.src = data.url;
    } catch (error) {
      console.error('Error fetching meme:', error);
    }
  });
});
