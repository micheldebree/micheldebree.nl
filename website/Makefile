start:
	open http://localhost:1313
	hugo -D server --disableFastRender

test:
	hugo server --disableFastRender

build: icons content/resume.md static/resume/Photo.jpg
	hugo --minify

publish: build
	cd public && git add . && git commit -m "Minor update" && git push 

icons: static/images/favicon-16x16.png \
	static/images/favicon-32x32.png \
	static/images/apple-touch-icon.png

content/resume.md: cv/README.md
	cp cv/README.md content/resume.md

static/resume/Photo.jpg: cv/Photo.jpg
	mkdir -p static/resume
	cp cv/Photo.jpg static/resume/Photo.jpg

static/images/favicon-16x16.png: static/images/logo.svg
	convert -resize 16x16 -background none $< $@
	optipng -o7 $@

static/images/favicon-32x32.png: static/images/logo.svg
	convert -resize 32x32 -background none $< $@
	optipng -o7 $@

static/images/apple-touch-icon.png: static/images/logo.svg
	convert -resize 180x180 -background none $< $@
	optipng -o7 $@
