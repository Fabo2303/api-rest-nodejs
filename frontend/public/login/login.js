const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('input-login');

submitButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('jwt', data.token);
      window.location.href = '../principal/principal.html';
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
