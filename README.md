# Genuary Gallery

A standalone, interactive gallery for displaying your [Genuary](https://genuary.art) creative coding projects.

This gallery is designed to work seamlessly with prompts.json from genuary.art and serves as the template for `npm create genuary`.

## Features

- **Clean, minimal interface** with keyboard navigation
- **Uses prompts.json from genuary.art** - includes all metadata needed for navigation
- **Customizable** titles and artist name via config.json
- **Hash-based URLs** for direct linking to specific days (#day1, #day14, etc.)
- **No build step required** - just HTML, CSS, and vanilla JavaScript

## Quick Start

1. Clone or download this repository
2. Replace `prompts.json` with the latest from [genuary.art](https://genuary.art)
3. Add your sketches to the `sketches/` folder
4. Customize `config.json` with your name and preferences
5. Run a local server:
   ```bash
   npm run serve
   ```
6. Open http://localhost:3000

## Project Structure

```
genuary-gallery/
├── index.html          # Gallery interface
├── config.json         # Customization settings
├── prompts.json        # Prompts from genuary.art (replace with current year)
├── package.json        # Project metadata and scripts
└── sketches/           # Your sketch folders
    ├── 01_particles/
    │   └── index.html
    ├── 02_no_palettes/
    │   └── index.html
    └── ...
```

## Sketch Folder Naming

The gallery automatically computes folder names from the prompts. The naming convention is:

```
{day_number}_{sanitized_shorthand}
```

For example:
- Day 1 "particles" → `01_particles/`
- Day 15 "use-a-physics-library" → `15_use_a_physics_library/`
- Day 23 "8×8" → `23_8x8/`

The sanitization process:
- Converts to lowercase
- Replaces non-alphanumeric characters with underscores
- Removes leading/trailing underscores

## prompts.json Format

The gallery uses prompts.json from genuary.art, which includes all necessary metadata:

```json
{
  "year": 2024,
  "genuaryPrompts": [
    {
      "date": "2024-01-01",
      "name": "Particles, lots of them.",
      "shorthand": "particles",
      "credit": ["Melissa Wiederrecht", "Nicolas Barradeau"],
      "creditUrl": ["https://...", "https://..."],
      "description": "Particles, lots of them.",
      "day": 1,
      "folderName": "01_particles"
    }
  ]
}
```

Key fields:
- **day**: Day number (1-31)
- **folderName**: Folder name for the sketch (e.g., `01_particles`)
- **name**: Display name for the prompt
- **shorthand**: Short identifier for the prompt
- **description**: Full description with markdown support
- **credit**: Array of prompt author names
- **creditUrl**: Array of URLs for prompt authors

## Configuration

Edit `config.json` to customize the gallery:

```json
{
  "artistName": "Your Name Here",
  "headerTitle": "",
  "windowTitle": ""
}
```

- **artistName**: Your name (displayed as "Genuary 2024 by Your Name")
- **headerTitle**: Custom header text (overrides default if set)
- **windowTitle**: Browser tab title (defaults to "Genuary {year}")

## Navigation

- **Arrow keys**: Navigate between sketches (← previous, → next)
- **Dropdown menu**: Jump to any day
- **URL hash**: Link directly to a day with `#day14`
- **Prev/Next buttons**: Click to navigate

## Running the Gallery

### Local Development Server

```bash
npm run serve
```

This starts a local server on port 3000. The gallery requires a local server because it uses `fetch()` to load JSON files, which doesn't work with the `file://` protocol.

### Alternative Servers

If you prefer, use any static file server:

```bash
# Python 3
python -m http.server 3000

# Node.js (http-server)
npx http-server -p 3000

# PHP
php -S localhost:3000
```

## Creating Sketches

Each sketch should be a self-contained folder with an `index.html` file:

```html
<!-- sketches/01_particles/index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Particles</title>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    // Your sketch code here
  </script>
</body>
</html>
```

The gallery loads each sketch in an iframe, so they're isolated and can use their own libraries and styles.

## Deployment

To deploy your gallery:

1. Push to a Git repository
2. Enable GitHub Pages (or Netlify, Vercel, etc.)
3. The gallery is static HTML and will work anywhere

No build process needed!

## Tips

- **Missing sketches**: If a sketch folder doesn't exist, the iframe will show a 404 error
- **CORS issues**: Always use a local server during development
- **Browser cache**: The gallery uses `cache: 'no-store'` for prompts.json and config.json to ensure fresh data
- **Keyboard shortcuts**: Arrow keys work from anywhere on the page

## Updating for a New Year

1. Download the new `prompts.json` from genuary.art
2. Replace the existing `prompts.json` file
3. Create new sketch folders matching the new prompts
4. That's it! The gallery automatically adapts to the new year

## Using as a Template for `npm create genuary`

This gallery is designed to be used as the template for the `create-genuary` scaffold tool:

1. **Template is downloaded**: When running `npm create genuary`, this gallery is downloaded
2. **prompts.json is fetched**: The latest prompts.json from genuary.art is downloaded (includes `day` and `folderName` fields)
3. **Sketches are generated**: The scaffold creates sketch folders using the `folderName` from prompts.json (e.g., `01_particles/`, `02_no_palettes/`)
4. **Files are replaced**: The template's `sketches/` folder is replaced with the scaffolded sketches

Since genuary.art's prompts.json already includes the folder names (`folderName`), the gallery navigation automatically matches the generated folder structure with no additional processing needed.

## License

MIT

## Credits

Gallery system designed for [Genuary](https://genuary.art) - a month-long creative coding challenge.
