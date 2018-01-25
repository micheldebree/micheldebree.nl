FROM debian:9.3-slim
RUN apt-get update && apt-get -y --no-install-recommends install apt-utils=1.4.8
RUN apt-get -y --no-install-recommends install make=4.1-9.1
RUN apt-get -y --no-install-recommends install pandoc=1.17.2~dfsg-3
RUN apt-get -y install texlive=2016.20170123-5
RUN gem install mdl -v 0.4.0
WORKDIR /home
ENTRYPOINT ["make","all"]
