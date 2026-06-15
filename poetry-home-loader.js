// Reusable rendering function built with secure textContent construction
function renderPoetryCards(itemsList) {
    const container = document.getElementById('cards-container');
    
    // 🔒 SECURITY PROTECTION: Clear container cleanly without innerHTML
    container.textContent = ''; 

    itemsList.forEach(item => {
        const link = document.createElement('a');
        link.classList.add('card-link');
        
        // Always points to your specific poetry layout shell player page
        link.href = `poetry.html?id=${item.id}`;

        const card = document.createElement('div');
        card.classList.add('card');

        // Build image block element node
        const cardImageDiv = document.createElement('div');
        cardImageDiv.classList.add('card-image');
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        cardImageDiv.appendChild(img);

        // Build content text elements
        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('card-content');

        const pCategory = document.createElement('p');
        pCategory.classList.add('card-category');
        pCategory.textContent = item.category;

        const h2Title = document.createElement('h2');
        h2Title.classList.add('card-title');
        h2Title.textContent = item.title;

        const pDesc = document.createElement('p');
        pDesc.classList.add('card-desc');
        pDesc.textContent = item.desc;

        const pAuthor = document.createElement('p');
        pAuthor.classList.add('card-author');
        pAuthor.textContent = item.author;

        // Assemble nodes securely
        cardContentDiv.appendChild(pCategory);
        cardContentDiv.appendChild(h2Title);
        cardContentDiv.appendChild(pDesc);
        cardContentDiv.appendChild(pAuthor);

        card.appendChild(cardImageDiv);
        card.appendChild(cardContentDiv);
        link.appendChild(card);
        container.appendChild(link);
    });
}

// FETCH AND ISOLATE POETRY DATASETS
fetch('articles.json')
    .then(response => response.json())
    .then(jsonItems => {
        const localReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        
        // Combine your static database file and hidden pocket storage reviews
        const masterDataset = [...jsonItems, ...localReviews];

        // ⚡ THE IMPORTANT FILTER: Keep only elements tagged as poetry
        const poetryOnlyList = masterDataset.filter(item => item.type === 'poetry');

        // Fire rendering loop grid matching your visual theme constraints
        renderPoetryCards(poetryOnlyList);
    })
    .catch(error => console.error("Error loading poetry collection grid:", error));
