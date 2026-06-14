fetch('articles.json')
    .then(response => response.json())
    .then(books => {

        const container = document.getElementById('cards-container');

        books.forEach(book => {

            // create the link wrapper
            const link = document.createElement('a');
            link.href = `article.html?id=${book.id}`;
            link.classList.add('card-link');

            // create the card
            const card = document.createElement('div');
            card.classList.add('card');

            // build inner HTML of card
            card.innerHTML = `
                <div class="card-image">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="card-content">
                    <p class="card-category">${book.category}</p>
                    <h2 class="card-title">${book.title}</h2>
                    <p class="card-desc">${book.desc}</p>
                    <p class="card-author">${book.author}</p>
                </div>
            `;

            // put card inside link
            link.appendChild(card);

            // put link inside container
            container.appendChild(link);

        });

    })
    .catch(error => console.error("Error loading books:", error));