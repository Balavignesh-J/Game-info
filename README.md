# 🎬 Movie Info Web App

A sleek and responsive web application to search for movie details using the [OMDb API](http://www.omdbapi.com/). Users can search by movie title (optionally by year), view detailed information, and maintain a local watchlist stored in their browser.

## 🌐 Live Demo

[🔗 Click here to see the live project](#) (Optional: Add link if deployed)

---

## 📌 Features

- 🔍 Search movies by name and optional release year.
- 🎞 Displays poster, cast, genre, ratings, box office collection, and more.
- 📖 Expand/collapse plot summary.
- ✅ Add movies to a "Want to Watch" list.
- 🗑 Remove movies from the list.
- 💾 Watchlist stored locally using localStorage.

---

## 🛠 Tech Stack

| Frontend     | Details                              |
|--------------|--------------------------------------|
| HTML5        | Markup structure                     |
| CSS3         | Custom styles, media queries         |
| JavaScript   | DOM manipulation, event handling     |
| OMDb API     | Movie database integration           |
| LocalStorage | Persistent user watchlist management |

---

## 📁 Project Structure

```bash
/
├── index.html         # Main HTML file
├── assets/
│   ├── styles.css     # Styling
│   ├── script.js      # JavaScript logic
│   └── img/
│       └── empty.png  # Placeholder image for empty state
```
🚀 Getting Started

1. Clone the repository

git clone https://github.com/your-username/movie-info-app.git
cd movie-info-app

2. Run Locally

Just open index.html in your preferred browser.

> 📝 No build step required – this is a fully static app.




---

🔑 API Key Setup

This project uses the OMDb API. The key is already included for testing. For production use, replace it with your own key from OMDb API Key.

Update the following line in script.js:

const key = "your-own-api-key";


---

⚙ Future Improvements

Add pagination and support for multiple search results.

Use a database and user authentication (for cross-device persistence).

Integrate trailer/video previews.

---

🧑‍💻 Author

Bala Vignesh
Frontend Developer | Aspiring Full-Stack Developer

---
