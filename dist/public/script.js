"use strict";
const user = document.getElementById("loginForm");
user.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
});
// Здесь вы можете отправить эти данные на сервер с помощью fetch или XMLHttpRequest
// Пример с fetch:
/*
  fetch('/api/login', {
    method: 'POST',
    headers: {1
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, rememberMe }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Обработайте ответ от сервера (например, перенаправление или отображение сообщения)
  })
  .catch((error) => {
    console.error('Error:', error);
    // Обработайте ошибку (например, отображение сообщения об ошибке)
  });
  */
