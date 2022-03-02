start:
	open http://localhost:1313
	hugo -D server --disableFastRender

test:
	hugo server --disableFastRender

build: \
	icons \
	content/resume.md \
	static/resume/Photo.jpg \
	static/resume/Michel_de_Bree-Resume.EN.docx \
	static/resume/Michel_de_Bree-Resume.EN.pdf 
	hugo --minify

# Build and copy /public folder to the repo that the website is hosted from
publish: build
	cp -a ./public/. ../micheldebree.github.io/
	cd ../micheldebree.github.io && git add . && git commit -m "Minor update" && git push 

icons: static/images/favicon-16x16.png \
	static/images/favicon-32x32.png \
	static/images/apple-touch-icon.png

content/resume.md: ../cv/README.md
	cp $< $@

static/resume/%: ../cv/%
	mkdir -p static/resume
	cp $< $@

static/images/favicon-16x16.png: static/images/logo.svg
	convert -resize 16x16 -background none $< $@
	optipng -o7 $@

static/images/favicon-32x32.png: static/images/logo.svg
	convert -resize 32x32 -background none $< $@
	optipng -o7 $@

static/images/apple-touch-icon.png: static/images/logo.svg
	convert -resize 180x180 -background none $< $@
	optipng -o7 $@
