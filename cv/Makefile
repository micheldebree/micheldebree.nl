# Dependencies:
# brew install pandoc wkhtmltopdf qrencode optipng

SRC=README.md Photo.jpg QR.png
FILENAME_BASE=Michel_de_Bree-Resume

.PHONY: all
all: $(FILENAME_BASE).EN.docx $(FILENAME_BASE).EN.pdf

$(FILENAME_BASE).EN.docx: $(SRC)
	pandoc -o $@ $< 

$(FILENAME_BASE).EN.pdf: $(SRC)
	pandoc --pdf-engine=wkhtmltopdf --metadata title="Resumé" -o $@ $<

QR.png: michel_de_bree.vcf
	qrencode -l L -r $< -s 2 -o $@
	optipng $@

.PHONY: clean
clean:
	rm -f *.docx
	rm -f *.pdf
