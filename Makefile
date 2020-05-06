PANDOC=docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex
FILENAME_BASE=CV-Michel_de_Bree

.PHONY: all

all: README.md $(FILENAME_BASE).EN.docx $(FILENAME_BASE).EN.pdf

$(FILENAME_BASE).EN.docx: README.md
	${PANDOC} -o $@ $< 

$(FILENAME_BASE).EN.pdf: README.md Template.tex
	${PANDOC} --template=Template.tex --variable fontsize=11pt -o $@ $<

clean:
	rm -f *.docx
	rm -f *.pdf
