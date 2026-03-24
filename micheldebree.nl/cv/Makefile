# brew install typst tinymist

REV := $(shell git rev-parse --short HEAD)

IN=cv.typ
OUT=cv-michel_de_bree.pdf

$(OUT): $(IN) michel_de_bree.toml version.toml
	typst compile $< $@
	pdfcpu optimize $@
	# pdfcpu validate -m strict -l $@

.PHONY: version.toml
version.toml:
	echo "Version = \"${REV}\"" > version.toml

.PHONY: test
test: $(IN)
	tinymist preview $< --partial-rendering true

.PHONY: watch
watch: $(OUT)
	open $<
	typst watch $(IN)

.PHONY: clean
clean:
	rm *.pdf
