CV_HOME=../cv
CV_SRC=$(CV_HOME)/cv-michel_de_bree.pdf
CV_DEST=./static/cv-michel_de_bree.pdf
QR=./static/QR.png

.PHONY: test
test: all
	open http://localhost:1313
	hugo -D server --disableFastRender

.PHONY: all
all: icons $(CV_DEST) $(QR)
	hugo --minify

icons: static/images/favicon-16x16.png \
	static/images/favicon-32x32.png \
	static/images/apple-touch-icon.png

.PHONY: csdbCal
csdbCal:
	cd ./static/csdb && csdbCal

static/images/favicon-16x16.png: static/images/logo.svg
	convert -resize 16x16 -background none $< $@
	optipng -o7 $@

static/images/favicon-32x32.png: static/images/logo.svg
	convert -resize 32x32 -background none $< $@
	optipng -o7 $@

static/images/apple-touch-icon.png: static/images/logo.svg
	convert -resize 180x180 -background none $< $@
	optipng -o7 $@

$(CV_DEST): $(CV_SRC)
	cp $< $@

.PHONY: $(CV_SRC)
$(CV_SRC):
	cd $(CV_HOME) && make

$(QR):
	qrencode -l L -s 3 -o "$@" https://www.micheldebree.nl/michel_de_bree.vcf
	optipng $@

.PHONY: upgrade-theme
upgrade-theme:
	git fetch hugo-coder main
	git subtree pull --prefix themes/hugo-coder hugo-coder main --squash

.PHONY: deps
deps:
	brew bundle

.PHONY: clean
clean:
	rm -rf docs
	rm -rf resources
	rm -rf public
	rm -rf $(CV_DEST)
	rm -rf $(QR)
