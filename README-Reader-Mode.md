# Reader Mode Implementation Guide

## Overview
This Reader Mode system provides Spanish-language content for your school website without modifying any existing code, styles, or structure. It's completely additive and won't interfere with your current site.

## Files Created
- `reader-mode.css` - Styles for Reader Mode (completely isolated)
- `reader-mode.js` - JavaScript functionality (completely isolated)
- `reader-mode-html.html` - HTML structure to add to your pages

## Implementation Steps

### Step 1: Add CSS and JavaScript to Your Site Head
Add these two lines to the `<head>` section of your pages:

```html
<link rel="stylesheet" href="reader-mode.css">
<script src="reader-mode.js"></script>
```

### Step 2: Add the Reader Mode Button
Add this button to your site header/navigation area:

```html
<button onclick="toggleReaderMode('es')" class="reader-mode-btn"> Leer en Español</button>
```

### Step 3: Add the Reader Mode HTML Structure
Add this HTML structure at the end of your `<body>` tag, before the closing `</body>`:

```html
<div id="reader-mode-overlay" class="reader-mode-overlay">
    <div class="reader-mode-header">
        <h1>Antelope Valley High School - Modo Lector</h1>
        <button onclick="closeReaderMode()" class="reader-mode-close-btn">×</button>
    </div>
    
    <div class="reader-mode-nav">
        <ul>
            <li><a href="#" onclick="loadReaderContent('es')">Académicos</a></li>
            <li><a href="#" onclick="loadReaderContent('es')">Transcripciones</a></li>
            <li><a href="#" onclick="loadReaderContent('es')">Graduación</a></li>
            <li><a href="#" onclick="loadReaderContent('es')">Contacto</a></li>
        </ul>
    </div>
    
    <div id="reader-mode-content" class="reader-mode-content">
        <!-- Content will be loaded here by JavaScript -->
    </div>
</div>
```

## How It Works

1. **User clicks "Leer en Español" button**
2. **Reader Mode overlay appears** with clean, focused design
3. **Spanish content loads** automatically
4. **User can navigate** within the Spanish content
5. **User can close** Reader Mode to return to main site

## Features

- **Clean Reading Experience**: Safari Reader-like interface
- **Spanish Navigation**: Easy navigation within Spanish content
- **Keyboard Shortcuts**: Press ESC to close
- **Responsive Design**: Works on all devices
- **No Conflicts**: Completely isolated from existing site

## Customization

### Adding More Content
Edit the `getSpanishContent()` function in `reader-mode.js` to add more Spanish content.

### Changing Colors
Modify the CSS variables in `reader-mode.css` to match your school colors.

### Adding More Languages
Extend the `loadReaderContent()` function to support additional languages.

## Testing

1. **Add the files** to your site
2. **Test the button** appears in your header
3. **Click the button** to open Reader Mode
4. **Verify Spanish content** loads correctly
5. **Test navigation** within Reader Mode
6. **Test closing** Reader Mode
7. **Verify your existing site** works exactly the same

## Troubleshooting

### Button Not Appearing
- Check that the button HTML was added to your header
- Verify the CSS file is linked correctly

### Reader Mode Not Opening
- Check browser console for JavaScript errors
- Verify the JavaScript file is linked correctly
- Ensure the HTML structure was added to your page

### Styles Not Working
- Check that the CSS file path is correct
- Verify the CSS file is linked in your head section

## Rollback Plan

If you need to remove Reader Mode:

1. **Remove the CSS and JS links** from your head section
2. **Remove the button** from your header
3. **Remove the HTML structure** from your body
4. **Delete the three files** (reader-mode.css, reader-mode.js, reader-mode-html.html)

Your site will return to exactly what it was before.

## Support

This Reader Mode system is designed to be completely non-intrusive. If you experience any issues with your existing site functionality, the Reader Mode is not the cause - it's completely isolated.

## Next Steps

Once Reader Mode is working:
1. **Add more Spanish content** to the content functions
2. **Customize the styling** to match your brand
3. **Add more languages** as needed
4. **Integrate with your n8n automation** for dynamic content
