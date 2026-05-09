---
title: 'Retropixels 0.8.0'
date: 2021-01-23T08:24:49+02:00
draft: false
tags: ['c64', 'coding']
---

![Screenshot](retropixels.gif)

Retropixels is a cross-platform command line tool to convert images to a format
that is supported by the legendary Commodore 64 (c-64) home computer. It can
output images in the style of the c-64, and also executables that can be run on
a real c-64.

Retropixels can be found on
[Github](https://github.com/micheldebree/retropixels) and in the [npm
repository](https://www.npmjs.com/package/retropixels)

## Moving towards a developer tool

In this release, which is **not backwards compatible**, retropixels is moving
more towards a developer tool for Commodore 64 fanatics. Some of the things that
are supported:

- Sprites
- Output of hires pictures in Artstudio format
- Pixel-perfect conversion (no scaling, no dithering)
- Default output is Commodore 64 compatible data. `.png` and `.prg` are
  fancy extra's. `.prg` support will probably be removed altogether soon
  and supported with a separate tool.
