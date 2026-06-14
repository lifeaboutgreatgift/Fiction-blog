const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

console.log("Article ID from URL:", articleId); // ← ADD THIS!

fetch('articles.json')
    .then(response => {
        console.log("Fetch response:", response); // ← ADD THIS!
        return response.json();
    })
    
    .then(books => {
        console.log("Books loaded:", books); // ← ADD THIS!
        console.log("Number of books:", books.length); // ← ADD THIS!

        const currentBook = books.find(book => book.id === articleId);

        console.log("Current book found:", currentBook); // ← ADD THIS!

        if (currentBook) {

            document.title = currentBook.title + " - The Fiction Review";
            document.getElementById('article-title').innerText = currentBook.title;
            document.getElementById('article-author').innerText = currentBook.author;
            document.getElementById('article-date').innerText = currentBook.date;
            document.getElementById('article-category').innerText = currentBook.category;

            const heroImg = document.getElementById('article-img');
            heroImg.src = currentBook.image;
            heroImg.alt = currentBook.title;

            const textContainer = document.getElementById('article-content-wrapper');

            currentBook.paragraphs.forEach((textString, index) => {
                const pTag =document.createElement('p');
                pTag.innerText = textString;

                if (index === 0) {
                    pTag.classList.add('drop-cap-para');
                }

                textContainer.appendChild(pTag);
            });
        }else {
            document.getElementById('article-title').innerText = "Review Entry Not Found";
        }
    })
    .catch(error => console.error("Error building the article content layer:", error));