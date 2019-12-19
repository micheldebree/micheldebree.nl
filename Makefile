start:
	hugo -D server

test:
	hugo server

icons: static/images/favicon-16x16.png static/images/favicon-32x32.png

static/images/favicon-16x16.png: static/images/logo.svg
	convert -resize 16x16 -background none $< $@

static/images/favicon-32x32.png: static/images/logo.svg
	convert -resize 32x32 -background none $< $@
