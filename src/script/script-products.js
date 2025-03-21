const apiUrlProducts = "https://dummyjson.com/products";


// Simulando um banco de dados local de produtos
let localProductList = [];

// Função para exibir alerta personalizado
function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Carregar produtos ao carregar a página
async function fetchProducts() {
    try {
        const response = await fetch(apiUrlProducts);
        const data = await response.json();

        // Atualizando a lista local com os produtos carregados da API
        localProductList = data.products;
        displayProducts();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        showAlert('Erro ao carregar produtos!');
    }
}

// Adicionar um novo produto (simulando com a lista local)
function addProduct(event) {
    event.preventDefault();

    const newProduct = {
        id: new Date().getTime(), // Usando um timestamp como id único
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        thumbnail: document.getElementById('thumbnail').value || "https://via.placeholder.com/50",
    };

    localProductList.push(newProduct);
    showAlert('Produto adicionado com sucesso!');
    displayProducts();

    // Limpar os campos após adicionar
    document.getElementById('addProductForm').reset();
}

// Remover um produto (simulando com a lista local)
function deleteProduct(productId) {
    localProductList = localProductList.filter(product => product.id !== productId);
    showAlert('Produto removido com sucesso!');
    displayProducts();
}

// Exibir os produtos a partir da lista local
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    localProductList.forEach((product) => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" style="width: 50px; height: 50px;">
            <strong>${product.title}</strong> - ${product.description} <br>
            <strong>R$${product.price.toFixed(2)}</strong> | Marca: ${product.brand} | Categoria: ${product.category}
            <button onclick="deleteProduct(${product.id})">Remover</button>
        `;
        productList.appendChild(productItem);
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

// Inicializar ações na página de produtos
document.getElementById('addProductForm').addEventListener('submit', addProduct);
fetchProducts();
