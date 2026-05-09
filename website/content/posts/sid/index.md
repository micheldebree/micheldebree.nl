---
title: SID
date: 2024-05-19T19:00:00+02:00
draft: true
tags:
  - c64
  - sid
  - music
---

The sound in the Commodore 64 homecomputer is produced by the SID chip.
SID stands for **S**ound **I**nterface **D**evice.

A tune made for the Commodore 64 is called a SID tune, or SID for short.
So depending on the context, SID can stand for either the SID chip, or a SID tune.

## SID can mean the chip, or a tune

## The SID chip is an analog synthesizer with 3 voices

- 3 VCO's (voices), with a choice of waveform per VCO:
  - Triangle, sawtooth, pulse, noise, or a combination of those
  - For the pulse waveform, the pulse width is variable
- Per voice, a VCA (amplifier) with variable ADSR. ADSR determines
  how the volume of one note swells, sustains and fades out
- One filter with LoPass, HiPass, BandPass and combinations of those
  - Variable cutoff and resonance
  - All 3 voices share the filter and can be set to go through the filter
    or bypass it

These parameters can be accessed through "Memory mapped IO", which means
that certain memory addresses in the refular C64 RAM memory are mapped to the SID chip.
Writing to those memory addresses actually changes parameters on the chip.

## A SID tune consists of code and data

### A SID tune is a subroutine

A SID tune is a subroutine that is called from a program's main loop.
One call to the subroutine updates the music by one 'frame'. For a SID tune
to sound like it was intended, the calls need to happen at a specific frequency.

Most of the time, a game or a demo will be timed to the refresh rate of the
video chip (VIC), which is 50Hz (50 times a second)
This is because for smooth animation, the program has to provide a new frame
of animation every time the VIC redraws the screen.
Because such a program has a main loop that runs at 50Hz, the simplest way to
include music is to call the SID subroutine once in this loop.
So the SID music is updated at 50Hz too.

### A SID tune is also data

There is separation of code and data. The music routine reads notes,
instrument data and other parameters from tables in memory. This way the same
music routine can be re-used for many tunes, and the musician does not have to look
at code to make music, only edit tables.

### Subroutine and data are kept together in a SID file

Because there are so many music routines, and so many variations and versions
within those routines, the routine and the music data are always kept together.
In memory, the data usually follows after the code immediately.

There is a standard SID file format designed to be able to play any SID regardless
of which routine it uses or where in memory it is located. This file format defines a
header which has some information about the tune. The most important information is:

- Init address; the address of a subroutine to call once, to initialize the music routine.
- Play address; the address of the subroutine that updates the music and needs to be called at a certain frequency
- Timing; information about how frequently the subroutine located at the play address should be called

### The SID routine updates registers in the SID chip

As described earlier, the SID chip's parameters are accessed through
memory addresses. Everytime the music routine is called, it can do some updates
to those parameters.
The memory area `$d400` to `$d418` is reserved for the SID chip. Writing to
one of these addresses can mean things like "Set the frequency for voice 1",
"Set the attack/decay for voice 2" or "Set the filter cutoff", depending on
the address.

### Data is typically edited in hexadecimal numbers

Data is most often edited as hexadecimal numbers. Often these numbers are
the values that are sent directly to the corresponding SID chip parameter.
This was a SID composer has very direct control over the SID chip.
This simplicity is probably also a result of how much effort and resources it would
take to make more advanced editing software on a Commodore 64, SID musicians
prefer it this way now. It means they need in-depth knowledge of the SID parameters,
which benefits the sound of their music, and makes their knowledge transferable
should they wish (or need) to use another music routine.

### Note data is edited in sequences

### A tune consists of 3 lists of sequences

### Instruments are presets for SID chip parameters

A certain sound, or instrument to play notes with, is stored
as a table of a few SID chip parameters like ADSR, waveform, 
pulse width and filter settings.



### A SID tune usually has dynamic software effects

To produce music

- Filter sweeps
- Pulse sweeps
- Arpeggio's
- Wave tables
- Vibrato, portamento
- Change only some parameters

### SID musicians use tricks to overcome limitations

- Arp chords
- Wavetable drums
- Combined drums
- ADSR dynamics

### A SID tune is optimized

Besides the limitations of the SID chip itself, a SID tune is often also
limited in size and execution time. It has to leave enough space in memory
for the main program, a demo or a game. It also had to leave enough CPU time
to finish all the other work that needs to be done in the main loop.

Often, when space and/or execution time is tight, software effects like
vibrato, portamento are stripped from the routine. This makes for a faster
execution of the music subroutine, and maybe slightly smaller data tables,
but it also limits the way the SID can sound.
