# COCODRILIO - Embroidery & Geek Stuff

A modern, responsive website for COCODRILIO - a creative hub specializing in custom embroidery, 3D printing, and retro computer club services.

## 🌟 Features

- **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Multi-language Support** - English, Polish, and Ukrainian translations
- **Config-Driven Content** - All site content managed through a single config file
- **Neon Cyberpunk Theme** - Retro gaming aesthetic with modern web technologies
- **Dynamic Content Loading** - Images, text, and settings loaded from config.js
- **Smooth Animations** - CSS transitions and hover effects

## 📁 Project Structure

```
haft-web/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── script.js       # JavaScript functionality
├── config/
│   └── config.js       # Site configuration and content
├── imeges/             # Local image assets
│   ├── logo.png
│   ├── emb.png
│   ├── 3d.png
│   └── arcade.png
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- Git (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cocodrilio-website.git
   cd cocodrilio-website
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - No build process required!

## ⚙️ Configuration

All site content is managed through `config/config.js`. You can easily customize:

### Site Information
```javascript
site: {
    title: "COCODRILIO | Embroidery & Geek Stuff",
    description: "Custom embroidery on clothes...",
    established: "2026",
    email: "hello@cocodrilio.com",
    location: "Wroclaw, Poland"
}
```

### Images
Replace files in the `images/` folder and update paths in config:
```javascript
images: {
    logo: "images/logo.png",
    embroidery: "images/emb.png",
    printing3d: "images/3d.png",
    computerClub: "images/arcade.png"
}
```

### Colors & Styling
```javascript
colors: {

    neon: {
        cyan: '#00e5ff',
        pink: '#ff00ff',
        green: '#00ff88'
    }
}
```

### Translations
Add or modify translations in the `translations` object for EN, PL, and UA.

## 🎨 Customization

*New feature:* gallery images are now discovered automatically from the filesystem. See the section above for details on running the generator script.*

> **Note:** the gallery is loaded via `fetch` from `config/gallery.json`, so you need to serve the site over HTTP (for example using `npx serve` or a simple Python/Node server) instead of opening `index.html` via the `file://` protocol.

## 🎨 Customization

### Changing Colors
Update the color values in `config.js` and they will be applied throughout the site.

### Adding Languages
1. Add new language code to `config.translations`
2. Add language button in HTML
3. Update `setLanguage()` function if needed

### Modifying Services
Update the `services` array in config to change service information dynamically.

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No frameworks, lightweight
- **Google Fonts** - Inter and Press Start 2P fonts
- **Responsive Design** - Mobile-first approach

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**COCODRILIO Team**
- Website: [cocodrilio.com](https://cocodrilio.com)
- Email: hello@cocodrilio.com

## 🙏 Acknowledgments

- Retro gaming community inspiration
- Tailwind CSS for amazing utility classes
- Unsplash for background images
- Font Awesome for icons

---

**Made with 💖 and ⚡**