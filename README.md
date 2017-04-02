# Retro CRT Startpage
#### by scar45/George Merlocco @ https://scar45.me

---

This repository contains an HTML5-based layout for creating (or using) a personalized startpage with a retro CRT feel.

## Features

- Links are read in from a JSON file that's easy to update (see ```links.dist.json``` for an example)
- Weather support with browser location using jQuery Simple Weather (nothing is logged/traced, check the source!)
- Google search form (can be changed to other search providers if you wish)
- 3 customizable design features:
  - Power On/Off with CRT effects
  - Animated Scanlines/Flicker effect (**Note**: Can be CPU-intensive! Consider disabling if your system is stressed)
  - Colour choice between Amber and Green
- Each of the settings above are saved as cookies, so the site will remember the state of what you've enabled/disabled

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

**Start a first build, then spawn webserver for live coding (browser-sync):**
```
gulp
```

This will dump compiled/processed files in a ./build directory, which will then be served by browser-sync, with files being watched for changes. When changes occur, browser-sync will automagically refresh the browser.

[Browsersync](http://www.browsersync.io) is used for live coding (browser-sync) which vastly accelerates development time.

### Releasing

**Run ```gulp``` with a parameter of ```release``` which will clean the ```./build``` directory and recompile all sources fresh**:

```
gulp release
```

You'll find everything in ```./build``` again, ready to be served from your preferred webserver. 

### Running under Node http-server

```
npm install http-server -g
```

then:

```
cd build/
http-server
```

You may want to [check the parameters on http-server](https://www.npmjs.com/package/http-server), which will allow you to customize the port/use SSL/etc. if you should prefer.

---

...and that's about it! I hope you enjoy this little nostalgic throwback to the terminals of old.

Thanks!

#### Colophon

* [CSS CRT screen effect - Lucas Bebber](https://codepen.io/lbebber/pen/XJRdrV)
* [CSS Scanlines - Mehdi](https://codepen.io/meduzen/pen/zxbwRV)
* [CSS Rocker Switches - Kris Tarling](https://codepen.io/kristarling/pen/WwPovb)
* [Tagsort - Will Haering](https://github.com/wchaering/tagsort)

_.end_
