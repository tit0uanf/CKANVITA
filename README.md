# CKANVITA 🐝

CKANVITA is a Chrome Extension that notify users when Vitality players are streaming, when the next matches are starting, the latest results and the standings.

## Features ⚡

- Show streaming players and ambassadors on Twitch
- Display upcoming matches on League of Legends CS2, Fifa, Rocket League
- Display recent results
- Display league standings on LEC, LFL and VCT
- VHive Tezos wallet Twitter overlay (register on CKANVITA.com)

## Installation ⚙️

`npm install`
`npm start`
Load extension :

1.  Go to `chrome://extensions/`
2.  Check `Developer mode`
3.  Click `Load unpacked extension`
4.  Select `build` folder.

## Packing 🛠️

Run the command to build the extension

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

:point_right: The files with name `secrets.*.js` already are ignored on the repository.
