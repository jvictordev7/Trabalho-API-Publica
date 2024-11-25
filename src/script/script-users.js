const apiUrlUsers = "https://dummyjson.com/users"; // Endpoint de usuários
const apiUrlProducts = "https://dummyjson.com/products"; // Endpoint de produtos

// Carregar usuários ao carregar a página
async function fetchUsers() {
  try {
    const response = await fetch(apiUrlUsers);
    const data = await response.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpar lista antes de renderizar

    // Exibir os usuários no formato de cartões
    data.users.forEach((user) => {
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

// Adicionar um novo usuário (simulado, já que não há suporte para POST real)
async function addUser(event) {
  event.preventDefault();

  const newUser = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    age: parseInt(document.getElementById('age').value),
    image: document.getElementById('image').value || "https://via.placeholder.com/50",
  };

  // Simular a adição do usuário (na verdade, só atualizamos a lista)
  alert('Usuário adicionado (simulado)!');
  fetchUsers(); // Atualizar a lista de usuários
}

// Remover um usuário (simulado)
async function deleteUser(userId) {
  try {
    // Simular a exclusão (não é possível excluir na API pública, então atualizamos a lista)
    alert('Usuário removido (simulado)!');
    fetchUsers(); // Atualizar a lista de usuários
  } catch (error) {
    console.error('Erro ao remover o usuário:', error);
  }
}

// Carregar usuários ao carregar a página
window.onload = fetchUsers;
