
PANDOC=docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex
MEDIA=Photo.jpg
FILENAME_BASE=CV-Michel_de_Bree

.PHONY: all
.PRECIOUS: $(MEDIA)

%.docx: src/%.md $(MEDIA)
	${PANDOC} -o $@ $< 

%.pdf: src/%.md src/Template.tex $(MEDIA)
	${PANDOC} --template=src/Template.tex --variable fontsize=11pt -o $@ $<

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
