# The Fiction Review 📚

A dynamic literary magazine website built with vanilla 
HTML, CSS, and JavaScript. Features JSON-driven content, 
client-side data persistence, and a responsive design 
inspired by editorial magazine layouts.

🔗 **Live site**: [https://lifeaboutgreatgift.github.io/Fiction-blog/](https://lifeaboutgreatgift.github.io/Fiction-blog/)

## Features

- Dynamic content loading from JSON (no hardcoded articles!)
- Separate hubs for Fiction and Poetry
- User review submission system (saved via localStorage)
- Responsive design with mobile hamburger menu
- Glassmorphism hero image effects
- Drop-cap typography for article openings

## How it works

1. `articles.json` stores all book/poem data
2. `script.js` fetches this data and generates cards dynamically
3. Each card links to `article.html?id=<book-id>`
4. `article-loader.js` reads the URL parameter and renders 
   the matching content

User submissions via the review form are saved to 
`localStorage` and merged with the JSON data on load:

````javascript
const localReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
const masterDataset = [...jsonBooks, ...localReviews];
````

## Project Structure

````
├── index.html          # Fiction homepage
├── poetry-home.html     # Poetry homepage  
├── review.html          # Submission form
├── article.html          # Article template
├── articles.json        # Content data
├── script.js             # Homepage logic
├── article-loader.js    # Article page logic
└── style.css             # Styles
````

## Running locally

````bash
git clone https://github.com/lifeaboutgreatgift/Fiction-blog.git
cd Fiction-blog
````

Open with VS Code Live Server (required for fetch() to work!)

---
Built by **Afroj** as part of a web development learning journey.