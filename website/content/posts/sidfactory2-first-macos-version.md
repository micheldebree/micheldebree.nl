---
draft: true
date: 2020-07-16T00:00:00+02:00
title: "Porting SIDFactoryII to macOS and linux"
tags: ["music", "c64", "coding"]
---

How I got to work with the computer music heroes from my youth, and learned a
thing or two about cross-platform, native development, macOS, linux and C++.

## SIDFactoryII is a cross-platform editor for creating [Commodore 64](/tags/c64) music

It is made by Thomas Egeskov Petersen
([Laxity](https://csdb.dk/scener/?id=677)), a very talented musician and coder,
who pioneered some of the best sounding music drivers for the Commodore 64
decades ago. The particular sound quality of his drivers was something I longed
to have for the tunes I attempted to make in those days. So much even that I
reverse-engineered the source code and started to make music using an assembler
instead of the editor, which was kept secret from mere mortals like myself.

![SIDFactoryII screenshot](https://olivi.chordian.net/wordpress/wp-content/uploads/2020/07/features_sf2_grainy.jpg)

You can [download SIDFactoryII for free](https://olivi.chordian.net/category/sid-factory-ii/).
or [check out the source code on
Github](https://github.com/Chordian/sidfactory2)

## I get to team up with my all-time heroes

Now, some 30 years later, there is SIDFactoryII and it is shared with everyone!
The first beta releases were Windows only, and me being a macOS user, I really
wanted to give it a try on macOS. I offered my help to release a macOS build,
and had the privilege to work with two all-time heroes of mine, Thomas Egeskov
Petersen ([Laxity](https://csdb.dk/scener/?id=677)) and Jens-Christiaan Huus
([JCH](https://csdb.dk/scener/?id=626)) on that. Back in the days before
internet these people hiding behind those pseudonyms were, to me,
very elusive and skilful artists that laid golden eggs in the form of tunes, for
us mere mortals to enjoy. I didn't know what they looked like, but they were
probably up there with the movie stars and pop idols. Now, after all these
years, they turn out to be ordinary people.

### The demoscene; where technical skills and creativity meet

Back in those days, there was a very active Commodore 64 cracking- and
[demoscene](https://en.wikipedia.org/wiki/Demoscene), which consisted of young
adolescents hacking away at the breadbox, as it was lovingly nicknamed, cracking
the copy-protection of games and sending them around, on [floppy
disk](https://en.wikipedia.org/wiki/Floppy_disk), by regular
mail. Why not use the internet? Well, there used to be a time when there was no
internet! Remember, in those days electricity was only just invented and we were
still cleaning up the mess the dinosaurs left behind. Sometimes people would
gather on one location to meet each other, but first and foremost to copy as
many floppy disks from each other as possible in one day. This was also known as
a [copyparty](https://en.wiktionary.org/wiki/copyparty).

Aside from games, the youngsters also used the floppy-disk-by-mail network and
copy parties to share displays of their technical skills and
creativity in the form of demos; a feast of visual display and music, aimed
mostly at showing off and securing a place amongst the cool guys.

This was the first time I actually made something native for macOS. I thought it
wouldn't be too hard really. In the end it all turned out fine, but there were
some hurdles along the way. This is what I learned:

## Building the executable

SIDFactoryII is written in C++ on Windows, using Visual Studio. To compile it on
macOs, you need the macOs equivalent of Visual Studio; Xcode. I wanted to make
building on macOS as automated as possible, and luckily Xcode provides a command
line clang compiler, so I can build the whole thing using `make` with a
`Makefile`.

At first, as expected, the thing didn't compile. I never really programmed
anything in C++, let alone on macOS, so I had Xcode and the command line
compiler to figure out. Luckily Thomas has access to a macOS computer and had
already set up the Xcode project.

### From Xcode to command line compilation

Once the source compiles in Xcode, you can see that Xcode actually calls the
command line C++ compiler. You see the complete command with the input and the
options. This is a great way to figure out what options you need to provide to
the compiler. Here I chose a bottom-up approach; try compiling with no options,
fail, and gradually figure out what options were essential to make compilation
work. This way I learn what the options actually do.

### Building is compilation and linking

Coming from Java, one thing that is noticeably different is the separation of
interfaces and implementation in header (`.h`) and implementation (`.cpp`)
files. This also comes with two stages of building an executable; compilation
and linking. During compilation, dependencies are resolved using the `.h` files,
producing compiled object (`.o`) files. This goes for dependencies to other
`.cpp` files being compiled, or for already compiled libraries. You need the
`.h` files of the library to be able to compile against it.

After compilation there are a bunch of `.o` files waiting to combined into the
executable. This is done in the linking step. Here you need to point the linker
to all the `.o` files, and to the libraries you want to link.

Compilation and linking can be done by the C++ compiler in one call, the
compiler (`gcc`) will call the linker (`ld`) when needed. It is a good thing to
know which compiler options are needed in which stage though, so I have explicit
compilation and linking steps with different options.

### There are different C++ versions

Duh. Of course there are. But the compiler needs to know which. It took me a
while to figure out which options to provide the compiler with for this purpose:
`-std=gnu++14 -stdlib=libc++`. Still, there were some differences in the Xcode
compiler and the Visual Studio compiler that is used for the Windows version.
Thomas kindly fixed the source so it compiles in both.

## Application need to behave differently on different operating systems

Once the executable is compiled and starts up, we're not out of the woods yet;
most things work, but not everything works as expected, or makes sense on the
new operating system.

### Windows and macOs have different file systems

The SIDFactoryII file browser has some starting points that won't work well for
macOS. It lists the different drive letters, which is something that macOS
doesn't have. It also starts in the folder where the executable is. In macOS the
executable will be inside an App bundle. We don't want users to browse inside
the App bundle because they might start saving their work there. When a new
version of SIDFactoryII is installed, the App bundle is replaced, and the work
is lost. On macOS we want to start in the user's home folder. For this and other
minor differences (like hidden files), Thomas made an abstraction for the needed
file system functions, with a Windows and a macOS implementation.

A related annoyance was that some standard c++ file functions that were used,
were only available on macOS starting from version 10.15 (Catalina). I am still
on 10.14 (Mojave), and really wanted to support as many older versions of macOS
as possible. Luckily we found [this file system
library](https://github.com/gulrak/filesystem) that gives us backward
compatibility for those file functions.

### There are a lot of different keyboards out there

### Resources have a special place on macOS

## It's a small step from macOS to linux, but it is a step

### File associations

- Compile on macOS
  - Dependencies compile time, link time and runtime
  - Different C++ standards
  - Keeping the size down (-flto and strip)
  - static vs dynamic linking
- File browser
  - root drives
  - permissions
  - startup folder
- Remapping of keys
  - The Cmd key
- Bundled SDL2 framework and other dependencies
- DMG distro
