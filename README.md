# Recipe-Blog
A web application that allows users to browse, search, and manage cooking recipes in a clean and intuitive interface.

## 🧩 Components
1. **recipe-list** – Displays all recipes in cards.  
2. **recipe-card** – Individual recipe card (nested inside recipe-list).  
3. **recipe-details** – Shows full details of a recipe.  
4. **recipe-form** – Form for adding/editing recipes (with validation).  

Install Tailwind CSS and dependencies :
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

Install JSON-Server :
npm install -g json-server

run it : json-server --watch db.json --port 3000
