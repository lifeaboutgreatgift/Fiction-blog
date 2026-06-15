// 1. Get the Poem ID from the address bar URL
const urlParams = new URLSearchParams(window.location.search);
const poemId = urlParams.get('id');

// 2. Fetch and merge datasets asynchronously
fetch('articles.json')
    .then(response => response.json())
    .then(jsonItems => {
        const localReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        
        // ⚡ Combines hardcoded JSON data with user reviews seamlessly
        const allItems = [...jsonItems, ...localReviews];
        const currentPoem = allItems.find(item => item.id === poemId);

        if (currentPoem) {
            // Update page title
            document.title = currentPoem.title + " - The Fiction Review";
            
            // 🔒 SECURITY UPDATE: Upgraded all text elements to textContent
            document.getElementById('poem-category').textContent = currentPoem.category;
            document.getElementById('poem-title').textContent = currentPoem.title;
            document.getElementById('poem-poet').textContent = currentPoem.author;
            document.getElementById('poem-date').textContent = currentPoem.date;

            // Handle the sharp centered front cover image
            const imageElement = document.getElementById('poem-img');
            imageElement.src = currentPoem.image;
            imageElement.alt = currentPoem.title;

            // Handle the dynamic glassmorphism blurred backdrop
            const containerElement = document.querySelector('.hero-image');
            if (containerElement) {
                containerElement.style.backgroundImage = `url('${currentPoem.image}')`;
                containerElement.style.backgroundPosition = currentPoem.backgroundPosition || 'center';
            }

            // Loop and render stanzas neatly
            const versesWrapper = document.getElementById('poem-verses-wrapper');
            
            // 🔒 SECURITY FIX: Wipe fallback template elements securely without innerHTML
            versesWrapper.textContent = ''; 

            currentPoem.paragraphs.forEach(verseString => {
                const pTag = document.createElement('p');
                
                // 🔒 SECURITY UPDATE: Upgraded to textContent
                pTag.textContent = verseString;
                pTag.classList.add('poem-line'); // Apply special poem styling
                versesWrapper.appendChild(pTag);
            });
        } else {
            // 🔒 SECURITY UPDATE: Upgraded to textContent
            document.getElementById('poem-title').textContent = "Poem Entry Not Found";
        }
    })
    .catch(error => console.error("Error building the poetry render layer:", error));