# DevPortfolio: A Discord-Inspired Developer Portfolio

This is an open-source developer portfolio website inspired by the Discord Developer Portal. It's built with HTML, CSS, and JavaScript, featuring a responsive design with light/dark mode, sidebar navigation, and multi-page structure. Users can showcase their dashboard, projects, code samples, and community connections.

The project is free to download and customize. Feel free to fork, modify, and deploy your own version!

## Features
- **Responsive Design**: Fully mobile-friendly with sidebar toggle on small screens.
- **Theme Toggle**: Light and dark mode support, persisting via local storage.
- **Multi-Page Navigation**: Separate pages for Dashboard, Projects, Code Samples, and Discord Community.
- **Animations**: Smooth slide-in for menu items and hover effects.
- **Discord Widget Integration**: Embed your Discord server widget (replace SERVER_ID in script.js).
- **Professional Layout**: Cards for stats, projects, and code snippets.

## Preview
Here are some screenshots of the website in action:












## Installation
1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/devportfolio.git
   cd devportfolio
   ```

2. **Open Locally**:
   - Simply open `index.html` in your browser to view the site.
   - No build tools or servers required for development.

3. **Customize**:
   - Edit HTML files to add your content (e.g., projects, code samples).
   - Update `script.js` with your Discord SERVER_ID for the widget.
   - Modify `styles.css` for custom styling.

## Deployment to Vercel (Free Hobby Tier)
1. **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2. **Import Repository**: Connect your GitHub repo to Vercel.
3. **Configure Root Directory** (if files are in a subfolder like "Here"):
   - In Vercel dashboard > Settings > General, set Root Directory to "Here" (or your folder name).
   - Alternatively, add `vercel.json` to the repo root:
     ```json
     {
       "rootDirectory": "Here"
     }
     ```
4. **Deploy**: Vercel will auto-deploy. Access your site at the provided URL.

## Usage
- Navigate via sidebar links.
- Toggle theme with the moon/sun icon in the header.
- On mobile, use the menu button to open/close sidebar.

## Contributing
Contributions are welcome! Fork the repo, make changes, and submit a pull request.

## License
MIT License - Free to use, modify, and distribute.

For questions, open an issue on GitHub. Enjoy building your portfolio! 🚀
