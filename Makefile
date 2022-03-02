# Dependencies:
# brew install pandoc wkhtmltopdf

FILENAME_BASE=CV-Michel_de_Bree

.PHONY: all

all: $(FILENAME_BASE).EN.docx $(FILENAME_BASE).EN.pdf

$(FILENAME_BASE).EN.docx: README.md
	pandoc -o $@ $< 

$(FILENAME_BASE).EN.pdf: README.md
	pandoc --pdf-engine=wkhtmltopdf --metadata title="Resumé" -o $@ $<

clean:
	rm -f *.docx
	rm -f *.pdf
