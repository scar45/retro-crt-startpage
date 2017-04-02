# Retro CRT Startpage
#### by George Merlocco / scar45 @ https://scar45.me

---

This repository contains an HTML5-based layout for creating (or using) a personalized startpage with a retro CRT feel.

## Features

- Links are read in from a JSON file that's easy to update (see ```links.dist.json``` for an example)
- Weather support with browser location using jQuery Simple Weather
- Google search form (can be changed to other search providers if you wish)
- 3 customizable design features:
  - Power On/Off with CRT effects
  - Animated Scanlines/Flicker effect (**Note**: Can be CPU-intensive! Consider disabling if your system is stressed)
  - Colour choice between Amber and Green
- Each of the settings above are saved as cookies, so the site will remember the state of what you've enabled/disabled

There are few ways to run this application:

#### Locally without any server
 - **Caveats:** Cookie and weather support is not included
 - Extract the .zip and open ```index.html``` with your preferred browser

#### Traditional web server
 - Apache, nginx, IIS, etc.
 - Extract the .zip file and upload to your hosted directory
  
#### Included Node.js http-server
 - Requires  [Node.js](http://nodejs.org) to be installed
 - Extract the .zip file, then run:
   - ```npm install```
   - ```npm start```
 - Then browse to ```http://127.0.0.1:8080```
 - If you wish, you can modify the ```scripts: {start}``` node in ```package.json``` to pass [extra parameters](https://www.npmjs.com/package/http-server) to ```http-server``` which allows you to run on a different port, use SSL, etc.

## Developing

If you just wish to use this startpage as your own, then you do not need to read this section. However, if you wish to modify the source (pull requests are encouraged!) then below is a brief outline of how this project has been put together.

## Requirements

- [Node.js](http://nodejs.org)

## Getting it running

**Install dependencies:**
```
npm install
```
...then rename ```links.dist.json``` to ```links.json```, and customize it to your heart's content.

Start a first build, then spawn webserver for live coding (browser-sync):
```
gulp
```

This will dump compiled/processed files in a ./build directory, which will then be served by browser-sync, with files being watched for changes. When changes occur, browser-sync will automagically refresh the browser.

[Browsersync](http://www.browsersync.io) is used for live coding (browser-sync) which vastly accelerates development time.

### Releasing

Run ```gulp``` with a parameter of ```release``` which will clean the ```./build``` directory, recompile all sources fresh, exclude unneeded files, and write a .zip file to ```dist/```:

```
gulp release
```
---
...and that's about it! I hope you enjoy this little nostalgic throwback to the terminals of old.

Thanks!

#### Colophon

* [CSS CRT screen effect - Lucas Bebber](https://codepen.io/lbebber/pen/XJRdrV)
* [CSS Scanlines - Mehdi](https://codepen.io/meduzen/pen/zxbwRV)
* [CSS Rocker Switches - Kris Tarling](https://codepen.io/kristarling/pen/WwPovb)
* [Tagsort - Will Haering](https://github.com/wchaering/tagsort)

_.end_
