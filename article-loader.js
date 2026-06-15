const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');


// ⚡ REPLACE EVERYTHING FROM THE FETCH STATEMENT DOWN TO THE END OF THE FILE WITH THIS:
fetch('articles.json')
    .then(response => response.json())
    .then(jsonBooks => {
        const localReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        
        // Combines hardcoded JSON data with user reviews seamlessly
        const allItems = [...jsonBooks, ...localReviews];
        const currentBook = allItems.find(book => book.id === articleId);

        if (currentBook) {
            document.title = currentBook.title + " - The Fiction Review";
            
            // 🔒 SECURITY UPDATE: Changed to textContent
            document.getElementById('article-title').textContent = currentBook.title;
            document.getElementById('article-author').textContent = currentBook.author;
            document.getElementById('article-date').textContent = currentBook.date;
            document.getElementById('article-category').textContent = currentBook.category;

            const heroImg = document.getElementById('article-img');
            heroImg.src = currentBook.image;
            heroImg.alt = currentBook.title;

            // Sets up the dynamic glassmorphism backdrop setting
            const heroContainer = document.querySelector('.hero-image');
            if (heroContainer) {
                heroContainer.style.backgroundImage = `url('${currentBook.image}')`;
            }

            const textContainer = document.getElementById('article-content-wrapper');
            
            // 🔒 SECURITY FIX: Wipe fallback template states securely without innerHTML
            textContainer.textContent = ''; 

            currentBook.paragraphs.forEach((textString, index) => {
                const pTag = document.createElement('p');
                
                // 🔒 SECURITY UPDATE: Changed to textContent
                pTag.textContent = textString;

                if (index === 0) {
                    pTag.classList.add('drop-cap-para');
                }
                textContainer.appendChild(pTag);
            });
        } else {
            // 🔒 SECURITY UPDATE: Changed to textContent
            document.getElementById('article-title').textContent = "Review Entry Not Found";
        }
    })
    .catch(error => console.error("Error hydrating article interface layout:", error));
