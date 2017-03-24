# Retro CRT Startpage
#### by scar45/George Merlocco @ https://scar45.me

---

This repository contains an HTML5-based layout for creating a personalized startpage with a retro CRT feel. More information will be added to this file as I progress.

[Browsersync](http://www.browsersync.io) is used for live coding (browser-sync) which vastly accelerates development time.

## Requirements

- [Node.js](http://nodejs.org)

## Getting it running

**Install dependencies:**
```
npm install
```
### Developing

**Start a first build, then spawn webserver for live coding (browser-sync):**
```
gulp
```
- This will dump compiled/processed files in a ./build directory, which will then be served by browser-sync, with files being watched for changes. When changes occur, browser-sync will automagically refresh the browser.

### Releasing

**Run ```gulp``` with a parameter of ```release``` which will clean the ```./build``` directory and recompile all sources fresh**:

```
gulp release
```

### Running under Node http-server

```
npm install http-server -g
```

then:

```
http-server
```

You'll find everything in ```./build``` again, ready to be served from your preferred webserver. 

---

...and that's about it! Thanks!

#### Colophon

* [CSS CRT screen effect - Lucas Bebber](https://codepen.io/lbebber/pen/XJRdrV)
* [CSS Scanlines - Mehdi](https://codepen.io/meduzen/pen/zxbwRV)
* [CSS Rocker Switches - Kris Tarling](https://codepen.io/kristarling/pen/WwPovb)
* [Tagsort - Will Haering](https://github.com/wchaering/tagsort)

_.end_
