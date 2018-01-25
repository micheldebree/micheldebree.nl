FROM debian:9.3-slim
RUN apt-get update && apt-get -y --no-install-recommends install apt-utils
RUN apt-get -y --no-install-recommends install make
RUN apt-get -y --no-install-recommends install pandoc
RUN apt-get -y install texlive
WORKDIR /home
ENTRYPOINT ["make","all"]

