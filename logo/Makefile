# Prerequisites:
#
# npm install svgo or brew install svgo
# brew install imagemagick

all: \
	build/logo-min.svg \
	build/logo32-min.svg \
	build/logo16.png \
	build/logo32.png \
	build/logo64.png \
	build/logo256.png \
	build/logo512.png 

build/logo-min.svg: logo.svg
	svgo --precision=0 --multipass $< -o $@

build/logo32-min.svg: logo32.svg
	svgo --precision=0 --multipass $< -o $@

build/logo16.png: logo.svg
	convert -resize 16x16 -background none $< $@

build/logo32.png: logo.svg
	convert -resize 32x32 -background none $< $@

build/logo64.png: logo.svg
	convert -resize 64x64 -background none $< $@

build/logo256.png:logo.svg
	convert -resize 256x256 -background none $< $@

build/logo512.png: logo.svg
	convert -resize 512x512 -background none $< $@
