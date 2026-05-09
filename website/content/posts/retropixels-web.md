---
title: "Retropixels Web GUI"
date: 2021-05-25T00:00:00+02:00
draft: false
tags: ["coding","c64"]
---

There is now a graphical interface online for
[Retropixels](https://www.micheldebree.nl/retropixels), the tool I made for
converting images to Commodore 64 format. For now it 
supports multicolor and hires bitmaps, so no sprites or FLI/AFLI. For that you
still need the [command line
tool](https://github.com/micheldebree/retropixels/blob/master/cli/README.md).

A new feature in this version is the ability to disable certain colors from the
palette. This will make it to the command line version aswell, eventually.

The web version is 100% javascript running in your browser, there are no
server-side components, so the images you convert never leave your computer.

