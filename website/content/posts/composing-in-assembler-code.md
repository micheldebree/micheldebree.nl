---
draft: true
date: 2020-06-26T00:00:00+02:00
title: "Composing in c64 assembler code"
tags: ["music", "c64", "sid", "coding"]
---

## TL;DR

We sometimes used to make tunes on the Commodore 64 using nothing but assembler
code, that we reverse engineered from existing tunes.

It's a slow and indirect way of making music, but we did it because we wanted
access to the distinct sound qualities of the music software used by our heroes.

## SID chip

Tunes for the Commodore 64 are called SID tunes, because they make use of the
[SID chip](https://en.wikipedia.org/wiki/MOS_Technology_6581) to produce sound.
The SID was quite advanced for its time (early 80s) and has a unique sound,
partly thanks to the hybrid digital/analogue design.

Some specifications:

- 3 voices (simultaneously playing notes)
- 4 waveforms: sawtooth, triangle, pulse, noise to choose from for each voice
- Attack, decay, sustain, release (ADSR) controls for each voice
- 1 filter (low pass, bandpass or high pass)
- oscillator sync and ring modulation

## SID music

Playing music on the Commodore 64 is done by sending values for various
parameters to the SID chip registers. This is usually done 50 times per second,
which is on every refresh of the screen. Games and demos use this same timing to
make sure a new frame is ready to be drawn every time the display refreshes.
Typically the machine code that updates the SID registers is a subroutine that
gets called from a main program loop that repeats 50 times a second.

Parameters for which values are sent to the SID chip registers are, for example:

- Note pitch
- Waveform selection
- Note on/off
- Attack, decay, sustain, release
- Filter cut off and resonance

The music subroutine can also implement features that are not directly supported
by the SID chip itself, like:

- Vibrato; wobbling the note pitch over time
- Filter sweeps; sweeping over different filter settings, useful for wah wah
  effects and bass sounds.
- Arpeggios; quick successions of the notes in a chord, to simulate playing a
  chord using up only one voice (there are only 3 voices remember?)
- Quick changes in waveform, especially useful for drums and percussion sounds

So, a SID tune is not just song data; it consists of a subroutine and data
tables. They are almost always kept together because the data tables are meant
for a specific subroutine.

There are a lot of different subroutines for SID music out there. Considering
they are all using the SID chip at 50Hz, it is somewhat surprising that the
perceived qualities of the sound of those routines are pretty different. The
routines of the Maniacs of Noise (by Charles Deenen) and Vibrants (by Thomas
Petersen) for example were well known for their outstanding sound. The source
code for these routines, and the tools to compose music for them, were kept to
the composers themselves to protect the unique sound of their music.

So to us, aspiring SID musicians, the sound of these routines is something we
craved, but did not have access to. Remember this was a time before internet and
open source software, so sharing information and software was not so
straightforward as nowadays. Also because of the competitive nature of the
demoscene, these things were closely guarded by their creators.

So we took to reverse-engineering the music routines of our heroes, in order to
be able to use them for our own music.

## Reverse engineering a SID tune

Needed:

- A Commodore 64
- A floppy disk drive
- A way to reset the Commodore 64 without losing memory contents
- A debugger (monitor), preferably one on an external cartridge
- A floppy disk
- Disassembler software
- Turbo assembler software

### Isolate (rip)

- Find a tune with a sound you like. This tune is usually embedded in a game, demo or
  intro. Start the game, demo or intro.
- Soft reset the c-64, preserving memory contents.
- Hunt for the location of the tune using a debugger. You need to be able to
  recognize assembler code that is part of a music subroutine, and recognize
  bytes that are not assembler code, but song data. Everything is tightly packed
  together to save space, and there is no clear separation between different
  parts of the program. It's all just one big sequence of bytes.
- Isolate the tune and save it to disk. It is made up of a subroutine for
  playing music, and bytes of data that make up the song's sounds and structure.

### Disassemble

Luckily for us

### Cleanup

### Compose

- Run a disassembler on the isolated tune. The disassembler will guess which
  bytes are meant to be assembler code, and which are just data bytes. It will
  not do this perfectly.
- Load the newly created assembler source into Turbo Assembler and start
  cleaning it up. Identify and separate blocks of data and figure out what they
  are for. There will be blocks for sounds, sequences of notes, and three
  tables, one for each voice of the SID, to make up a tune out of the separate
  sequences of notes. There will also be assembler code that should have been
  interpreted as data bytes, so fix that as well.
- There will be data bytes that point to the memory locations of the different
  blocks of data. When you start editing these blocks, the memory locations will
  change, and the pointers need to change with it. Identify these bytes and
  replace them with pointers to labels in the source code, so they will be
  re-calculated at compile time.
- Now you know what the blocks of data are for, and you are safe to edit them,
  you need to figure out how the bytes are interpreted by the music routine.
  Many of them, especially the ones for sounds, will have multiple parameters
  packed into one byte to save space. Knowledge of the SID chip registers, other
  music routines and a lot of trial and error is needed here.
- Start composing! Change bytes, add bytes and re-compile. Wait a few seconds
  and actually hear what you did. Rinse and repeat.

<!--## Reverse engineering a music routine-->

<!--In those days, the source code to the routine was not readily available, so I-->
<!--took to reverse engineering the routine by isolating one of Laxity's tunes from-->
<!--a demo, and running it through a disassembler. The disassembler turns binary-->
<!--data into [Turbo Assembler](https://csdb.dk/release/?id=10700) source code. To-->
<!--do this, it has to guess which bytes are code and which are data. It is not-->
<!--perfect at this, so some cleaning up is required. Also, the disassembler does-->
<!--not produce human-readable labels and comments, because all this information is-->
<!--simply not in the binary data any more.-->

<!--Besides cleaning up the source code, the hardest part is figuring out how the-->
<!--data is interpreted-->

<!--This is not because I am a masochist, but because I was after a certain sound-->
<!--that could not be obtained from the available editors. To me, the best sounding-->
<!--tunes came from the [Maniacs of Noise](https://csdb.dk/group/?id=448) and-->
<!--[Vibrants](https://csdb.dk/group/?id=328). Each of these groups had their own-->
<!--music routine and editor, which they guarded with their lives to reserve the-->
<!--quality of their sound to themselves. At least it seemed that way back then,-->
<!--when there was no internet, a lot of rivalry and mysticism on the Commodore 64-->
<!--scene.-->
-
