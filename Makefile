################
# Docker Image #
################
IMAGE=micheldebree/cv
MEDIA=Photo.jpg

build: image
	docker run --rm -v "$$PWD":/home $(IMAGE)

# Build Docker image
image: Dockerfile
	docker build -t $(IMAGE) .

# Run a shell in the docker container, useful for debugging
debug: image
	docker run -it --rm -v "$$PWD":/home --entrypoint /bin/bash $(IMAGE)

#################
# Build targets #
#################
.PHONY: all
.PRECIOUS: $(MEDIA)

FILENAME_BASE=CV-Michel_de_Bree

%.docx: src/%.md $(MEDIA)
	pandoc -s --smart -o $@ $< 

%.pdf: src/%.md src/Template.tex $(MEDIA)
	pandoc $< -s --smart --template=src/Template.tex --variable fontsize=11pt -o $@

%.jpg: src/%.jpg
	cp $< $@

%.png: src/%.png
	cp $< $@

all: README.md $(FILENAME_BASE).EN.docx $(FILENAME_BASE).EN.pdf

README.md: src/$(FILENAME_BASE).EN.md
	cp $< $@

clean:
	rm -f *.docx
	rm -f *.pdf
	rm -f *.jpg
	rm -f *.md
