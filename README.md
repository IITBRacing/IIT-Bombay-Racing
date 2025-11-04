# IIT Bombay Racing Website

A professional website for IIT Bombay Racing team.

## Structure

```
Websites/
├── index.html          # Home page
├── team.html           # Team page
├── achievements.html   # Achievements page
├── cars.html           # Cars page
├── media.html          # Media & Blog page
├── partners.html       # Partners page
├── about.html          # About Us page
├── css/
│   └── style.css       # Main stylesheet
├── images/             # Images folder (add your images here)
│   ├── logo.png        # Logo (to be added)
│   └── hero-bg.jpg     # Hero background (to be added)
└── README.md           # This file
```

## How to Host on Local Server

### Option 1: Python Simple HTTP Server
If you have Python installed:

```bash
# For Python 3.x
cd d:\Websites
python -m http.server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 2: Node.js http-server
If you have Node.js installed:

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Run the server
cd d:\Websites
http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 3: PHP Built-in Server
If you have PHP installed:

```bash
cd d:\Websites
php -S localhost:8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 4: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: XAMPP/WAMP
1. Install XAMPP or WAMP
2. Copy the Websites folder to htdocs (XAMPP) or www (WAMP)
3. Start Apache server
4. Go to `http://localhost/Websites`

## Next Steps

1. **Add Logo**: Place your logo image as `images/logo.png`
2. **Add Hero Background**: Place your hero image as `images/hero-bg.jpg` (or use the provided racing image)
3. **Customize Content**: Update each page with your specific content
4. **Add More Images**: Place additional images in the `images/` folder

## Notes

- The website is fully responsive and works on all devices
- All navigation is working between pages
- The design is clean and professional
- Easy to customize and extend
- No dependencies required - pure HTML and CSS
