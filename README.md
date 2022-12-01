# Weather Extension for Chrome

## Project Set-up

- This project is based on [React & TypeScript Chrome Extension Development [2022]
](https://www.udemy.com/course/chrome-extension/learn/lecture/25576178#content)

## How to start the project

```zsh
pnpm install
pnpm start
```

## How to build the project

```zsh
pnpm install
pnpm build
```

## How to run the project

- Start the project
- Open [the chrome extension list page](chrome://extensions/) with Chrome browser
- Turn on the developer mode
- Click "Load the extracted extension" button and select the `dist` folder
- Then, the extension will be installed and you can test it in your browser

## File Structure

- `background`: Codes for service-worker in chrome web extension
- `contentScript`: Codes for [Content Script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for manipulating DOM in web page

