#!/bin/bash
# brew install pandoc
# brew cask install basictex
pandoc -s -o cv.docx README.md 
pandoc -s -o cv.html README.md 
pandoc -s -o cv.pdf README.md 
