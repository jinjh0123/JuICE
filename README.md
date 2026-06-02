# JuICE Project Website

## How to Run

### Prerequisite
* Node.js (tested on **23.2.0**) - Recommend to use [nvm](https://github.com/nvm-sh/nvm).

### Running Website on Development Mode
1. Install dependencies
   ```sh
   > npm install
   ```
2. Run development server
   ```sh
   > npm run dev
   ```
3. If a web browser does not open automatically, visit `http://localhost:3000`.

### Modifying Web Page Content
- Start editing `./app/App.tsx`. This React component defines the basic content structure of the main page.
- `./app/sections/` directory contains individual subsections of the main page.
- For any PDF files for your preprint, put them in `./public/`. The name can be artibrary. The build processor will automatically grab all PDF fils in that directory. On webpage, link them with a relative URL like `./public/[FILE_NAME]`. Refer to `./app/sections/Abstract.tsx` for example.

### Deploying Website to Github Pages
1. Change public url in `package.json`:
   ```json
    "build": "rm -rf dist && rm -rf .parcel-cache && rm -rf .cache && parcel build index.html ./public/*.pdf --public-url https://naver-ai.github.io/chacha",
   ```
   Replace the public-url argument value 'https://naver-ai.github.io/chacha' with the domain you are using.
2. Run deployment script:
   ```sh
   > npm run deploy
   ```

## Reference
This website is built based on https://naver-ai.github.io/chacha/ by Young-Ho Kim (NAVER AI Lab) yghokim@younghokim.net, http://younghokim.net
