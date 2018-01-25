################
# Docker Image #
################

NAMESPACE=micheldebree
ARTIFACT=cv
VERSION=0.1.0
IMAGE=$(NAMESPACE)/$(ARTIFACT):$(VERSION)

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

FILENAME_EN=CV-Michel_de_Bree.EN
FILENAME_NL=CV-Michel_de_Bree.NL

%.docx: %.md styles.docx
	pandoc -s --smart --reference-docx=styles.docx -o $@ $< 

%.pdf: %.md
	pandoc -s --smart -o $@ $<

all: README.md $(FILENAME_EN).docx $(FILENAME_EN).pdf $(FILENAME_NL).docx $(FILENAME_NL).pdf

README.md: $(FILENAME_EN).md
	cp $< $@

lint:
	mdl . || true

