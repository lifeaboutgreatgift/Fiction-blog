// Reusable rendering function built with secure textContent construction
function renderGridCards(itemsList) {
    const container = document.getElementById('cards-container');
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    itemsList.forEach(item => {
        // 1. Create the link wrapper securely
        const link = document.createElement('a');
        link.classList.add('card-link');

        // Route dynamically based on content type
        if (item.type === 'poetry') {
            link.href = `poetry.html?id=${item.id}`;
        } else {
            link.href = `article.html?id=${item.id}`;
        }

        // 2. Create the card structural container
        const card = document.createElement('div');
        card.classList.add('card');

        // 3. Securely build the card image components
        const cardImageDiv = document.createElement('div');
        cardImageDiv.classList.add('card-image');
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        cardImageDiv.appendChild(img);

        // 4. Securely build the text content wrapper
        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('card-content');

        // 🔒 SECURITY PROTECTION: Using textContent to sanitize string rendering
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

        // Assemble text elements securely into the context box
        cardContentDiv.appendChild(pCategory);
        cardContentDiv.appendChild(h2Title);
        cardContentDiv.appendChild(pDesc);
        cardContentDiv.appendChild(pAuthor);

        // Assemble the completed layout structure
        card.appendChild(cardImageDiv);
        card.appendChild(cardContentDiv);
        link.appendChild(card);
        container.appendChild(link);
    });
}

// ⚡ ADDED: Global tracking variable to hold the combined data
let masterDataset = [];

// PRIMARY INITIALIZATION STREAM
fetch('articles.json')
    .then(response => response.json())
    .then(jsonBooks => {
        const localReviews = JSON.parse(localStorage.getItem('userReviews')) || [];

        // Merge both independent arrays into one master collection stream
        masterDataset = [...jsonBooks, ...localReviews];

        // filter for books only right on page load!
        const fictionOnlyList = masterDataset.filter(item => item.type === 'book');
        renderGridCards(fictionOnlyList);
        
        
        // ⚡ ADDED: Initialize navbar click listeners
    
    })
    .catch(error => console.error("Error loading fiction datasets:", error));


