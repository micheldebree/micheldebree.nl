+++ 
draft = true
date = 1994-07-07T18:06:31+01:00
title = "DYCP and music routine on a 386"
description = ""
slug = "" 
tags = ["c64","coding","music"]
categories = []
externalLink = ""
series = []
+++
Coming from the Commodore 64 and being used to coding in assembler, I tried to do the same on my dad's 386 PC. I decided on a [DYCP](http://www.antimon.org/dl/c64/code/dycp.txt) effect, a popular effect in the Commodore 64 demoscene.

The DYCP itself (the bouncy scroller) wasn't too hard; most effort and fun
went into the music routine for the
[Soundblaster](https://en.wikipedia.org/wiki/Sound_Blaster)'s [OPL2 (Yamaha
YM3812)](https://en.wikipedia.org/wiki/Yamaha_YM3812) chip. This is the chip
on the Soundblaster that was has a little [FM
synthesizer](https://en.wikipedia.org/wiki/Frequency_modulation_synthesis) in
it.

Getting sound out of it involved sending the right number to the various
registers of the chip (for pitch, ADSR, operators and modulator and such).
This was all in assembler; "composing" the music involved creating different
table of numbers to be sent in sequence to the chip, using the music routines
I knew from my Commodore 64 heroes as inspiration.

{{< youtube id="QhkoBqRHDYQ" autoplay="true" >}}