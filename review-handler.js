document.getElementById('review-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevents the page from refreshing on submit

    // 1. Gather all data inputs from the form elements
    const type = document.getElementById('review-type').value;
    const title = document.getElementById('review-title').value.trim();
    const author = document.getElementById('review-author').value.trim();
    const category = document.getElementById('review-category').value.trim().toUpperCase();
    const image = document.getElementById('review-image').value.trim();
    const desc = document.getElementById('review-desc').value.trim();
    const contentRaw = document.getElementById('review-content').value.trim();

    // 2. Generate a URL-friendly dynamic ID string from the title (e.g., "The Hobbit" -> "the-hobbit")
    let baseId = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Strips out special characters like quotes
        .replace(/\s+/g, '-');   // Replaces empty spaces with hyphens

    //Fallback if the title slugifies to nothing (all symbols/emoji)
    if (!baseId) {
        baseId = `entry-${Date.now()}`;
    }

    //check both the original dataset and locally saved reviews
    //so a new if can never collide with an existing one
    const existingJson = await fetch('articles.json').then(res => res.json()).catch(() => []);
    const existingLocal = JSON.parse(localStorage.getItem('userReviews')) || [];
    const existingIds = new Set([...existingJson, ...existingLocal].map(item => item.id));

    let id = baseId;
    let counter = 2;
    while (existingIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
    }

    // 3. Process the raw text block into an array of clean paragraphs
    // Splits text wherever the user pressed "Enter" or "Return"
    const paragraphs = contentRaw
        .split('\n')
        .map(para => para.trim())
        .filter(para => para.length > 0); // Discards empty blank lines

    // 4. Generate today's date formatted perfectly for your magazine template
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const todayFormatted = new Date().toLocaleDateString('en-US', options);

    // 5. Structure the finalized custom book/poem entry object
    const newReviewEntry = {
        id: id,
        type: type,
        image: image,
        category: category,
        title: `"${title}"`, // Wraps it in standard title presentation quotes
        author: author,
        desc: desc,
        date: todayFormatted,
        paragraphs: paragraphs
    };

    // 6. Pull existing reviews array out of localStorage, or initialize empty if none exist
    const currentLocalReviews = JSON.parse(localStorage.getItem('userReviews')) || [];

    // 7. Push the new object into our persistent collection layer
    currentLocalReviews.push(newReviewEntry);

    // 8. Stringify and save the updated storage array back to the browser layer
    localStorage.setItem('userReviews', JSON.stringify(currentLocalReviews));

    // 9. Inform the user and send them right back to the updated homepage grid
    alert('🎉 Review successfully published to your local stream!');
    window.location.href = 'index.html';
});
