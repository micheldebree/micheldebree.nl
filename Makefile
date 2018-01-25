# Artifact
NAMESPACE=micheldebree
ARTIFACT=cv
VERSION=0.1.0
IMAGE=$(NAMESPACE)/$(ARTIFACT):$(VERSION)

INNAME=README.md
OUTNAME=dist/michel_de_bree-cv

build: image
	docker run --rm -v "$$PWD":/home $(IMAGE)

all: \
	$(OUTNAME)-en.html \
	$(OUTNAME)-en.docx \
	$(OUTNAME)-en.pdf

$(OUTNAME)-en.html: $(INNAME) dist/photo.jpg
	pandoc -s -o $@ $<

$(OUTNAME)-en.docx: $(INNAME)
	pandoc -s --smart --reference-docx=reference.docx -o $@ $< 

$(OUTNAME)-en.pdf: $(INNAME)
	pandoc -s --smart -o $@ $<

dist/photo.jpg: dist
	cp photo.jpg dist/

dist:
	mkdir -p dist

# Build Docker image
image: Dockerfile
	docker build -t $(IMAGE) .

# Run a shell in the docker container, useful for debugging
debug: image
	docker run -it --rm -v "$$PWD":/home --entrypoint /bin/bash $(IMAGE)

