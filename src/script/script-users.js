const apiUrlUsers = "https://dummyjson.com/users"; // Endpoint de usuários

// Lista local de usuários
let localUserList = [];

// Carregar usuários ao carregar a página
async function fetchUsers() {
  try {
    const response = await fetch(apiUrlUsers);
    const data = await response.json();
    
    // Atualizar lista local com os dados da API
    localUserList = data.users;

    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpar lista antes de renderizar

    // Exibir os usuários no formato de cartões
    localUserList.forEach((user) => {
      const userItem = document.createElement('li');
      userItem.classList.add('user-card');
      userItem.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" style="width: 50px; height: 50px;">
        <strong>${user.firstName} ${user.lastName}</strong> - ${user.email} (${user.age} anos)
        <button class="delete-user" onclick="deleteUser(${user.id})">Remover</button>
      `;
      userList.appendChild(userItem);
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}

// Adicionar um novo usuário (simulado)
function addUser(event) {
  event.preventDefault();

  const newUser = {
    id: new Date().getTime(), // Gerar um ID único com base no timestamp
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    age: parseInt(document.getElementById('age').value),
    image: document.getElementById('image').value || "https://via.placeholder.com/50",
  };

  // Simular a adição do usuário
  alert('Usuário adicionado com sucesso!');
  localUserList.push(newUser); // Adicionar o novo usuário localmente
  displayUsers(); // Atualizar a lista de usuários
}

// Remover um usuário (simulado)
function deleteUser(userId) {
  // Remover usuário da lista local
  localUserList = localUserList.filter(user => user.id !== userId);
  
  alert('Usuário removido com sucesso!');
  displayUsers(); // Atualizar a lista de usuários na interface
}

// Exibir os usuários na tela
function displayUsers() {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Limpar a lista

  localUserList.forEach((user) => {
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

// Carregar usuários ao carregar a página
window.onload = fetchUsers;
