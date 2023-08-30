# Dependencies:
# brew install pandoc wkhtmltopdf

SRC=README.md Photo.jpg Contact.png
FILENAME_BASE=Michel_de_Bree-Resume

.PHONY: all
all: $(FILENAME_BASE).EN.docx $(FILENAME_BASE).EN.pdf

$(FILENAME_BASE).EN.docx: $(SRC)
	pandoc -o $@ $< 

$(FILENAME_BASE).EN.pdf: $(SRC)
	pandoc --pdf-engine=wkhtmltopdf --metadata title="Resumé" -o $@ $<

.PHONY: clean
clean:
	rm -f *.docx
	rm -f *.pdf
