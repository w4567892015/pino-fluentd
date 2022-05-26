FROM fluent/fluentd:edge

USER root
RUN apk add --update --virtual .build-deps sudo build-base ruby-dev
RUN apk add --no-cache geoip geoip-dev libmaxminddb
RUN apk add automake autoconf libtool

# RUN fluent-gem install elasticsearch -v 7.12 # Old version
RUN fluent-gem install fluent-plugin-elasticsearch
RUN fluent-gem install fluent-plugin-geoip

USER fluent
EXPOSE 24224 24224/udp 8888
