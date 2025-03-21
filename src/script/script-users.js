const apiUrlUsers = "https://dummyjson.com/users"; // Endpoint de usuários


// Lista local de usuários
let localUserList = [];

// Função para exibir alerta personalizado
function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Carregar usuários ao carregar a página
async function fetchUsers() {
    try {
        const response = await fetch(apiUrlUsers);
        const data = await response.json();
        localUserList = data.users;
        displayUsers();
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        showAlert('Erro ao carregar usuários!');
    }
}

// Adicionar um novo usuário (simulado)
function addUser(event) {
    event.preventDefault();

    const newUser = {
        id: new Date().getTime(),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value),
        image: document.getElementById('image').value || "https://via.placeholder.com/50",
    };

    localUserList.push(newUser);
    displayUsers();
    showAlert('Usuário adicionado com sucesso!');

    // Limpar campos após adicionar o usuário
    document.getElementById('addUserForm').reset();
}

// Remover um usuário (simulado)
function deleteUser(userId) {
    localUserList = localUserList.filter(user => user.id !== userId);
    displayUsers();
    showAlert('Usuário removido com sucesso!');
}

// Exibir os usuários na tela
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    localUserList.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('user-card');
        userItem.innerHTML = `
            <img src="${user.image}" alt="${user.firstName}" style="width: 50px; height: 50px;">
            <strong>${user.firstName} ${user.lastName}</strong> - ${user.email} (${user.age} anos)
            <button class="delete-user" onclick="deleteUser(${user.id})">Remover</button>
        `;
        userList.appendChild(userItem);
    });
}

// Função para controlar o menu hambúrguer
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
  });
});

// Carregar usuários ao iniciar a página
window.onload = fetchUsers;
