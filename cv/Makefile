# brew install typst tinymist

REV := $(shell git rev-parse --short HEAD)

IN=cv.typ
DEPS=$(IN) michel_de_bree.toml info.toml version.toml
LANGS=nl en
OUTS=$(LANGS:%=cv-michel_de_bree-%.pdf)

.PHONY: default all nl en test watch clean version.toml

default: $(OUTS)

all: $(OUTS)

$(OUTS): cv-michel_de_bree-%.pdf: $(DEPS)
	typst compile --pdf-standard ua-1 --input language=$* $< $@

nl: cv-michel_de_bree-nl.pdf

en: cv-michel_de_bree-en.pdf

version.toml:
	echo "Version = \"${REV}\"" > version.toml

test: $(IN)
	tinymist preview $< --partial-rendering true

watch: cv-michel_de_bree-nl.pdf
	open $<
	typst watch $(IN) --input language=nl

clean:
	rm -f *.pdf
