#!/bin/bash
# brew install pandoc
# brew cask install basictex
pandoc -s --smart --reference-docx=reference.docx -o cv.docx README.md 
pandoc -s --smart --to=odt -o cv.odt README.md 
pandoc -s -o cv.html README.md 
pandoc -s --smart -o cv.pdf README.md 
pandoc -s --smart --to=epub -o cv.epub README.md 
pandoc -s --to=plain -o cv.txt README.md 
