FROM debian:9.3-slim
RUN apt-get update \
      && apt-get -y --no-install-recommends install \
      apt-utils=1.4.9 \
      && apt-get clean \
      && rm -rf /var/lib/apt/lists/*
RUN apt-get update \
      && apt-get -y --no-install-recommends install \
      make=4.1-9.1 \
      pandoc=1.17.2~dfsg-3 \
      texlive=2016.20170123-5 \
      lmodern=2.004.5-3 \
      && apt-get clean \
      && rm -rf /var/lib/apt/lists/*
WORKDIR /home
ENTRYPOINT ["make","all"]
