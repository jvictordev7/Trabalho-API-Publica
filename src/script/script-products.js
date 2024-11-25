const apiUrlProducts = "https://dummyjson.com/products";

// Simulando um banco de dados local de produtos
let localProductList = [];

// Carregar produtos ao carregar a página
async function fetchProducts() {
    try {
        const response = await fetch(apiUrlProducts);
        const data = await response.json();
        
        // Atualizando a lista local com os produtos carregados da API
        localProductList = data.products;

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
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
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

    // Adicionando o produto na lista local
    localProductList.push(newProduct);
    alert('Produto adicionado com sucesso!');

    // Atualizando a exibição de produtos
    displayProducts();
}

// Remover um produto (simulando com a lista local)
function deleteProduct(productId) {
    localProductList = localProductList.filter(product => product.id !== productId);
    alert('Produto removido com sucesso!');
    
    // Atualizando a exibição de produtos
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

// Inicializar ações na página de produtos
document.getElementById('addProductForm').addEventListener('submit', addProduct);
fetchProducts();
