FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y git bison build-essential ca-certificates curl dh-autoreconf doxygen \
    flex gawk git iputils-ping libcurl4-gnutls-dev libexpat1-dev libgeoip-dev liblmdb-dev \
    libpcre3-dev libpcre++-dev libssl-dev libtool libxml2 libxml2-dev libyajl-dev locales \
    lua5.3-dev pkg-config wget zlib1g-dev zlibc libxslt libgd-dev && \
    cd /opt && \
    git clone https://github.com/SpiderLabs/ModSecurity && \
    cd ModSecurity && \
    git submodule init && git submodule update && \
    ./build.sh && ./configure && \
    make && make install && \
    cd /opt && sudo git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git && \
    wget http://nginx.org/download/nginx-1.18.0.tar.gz && \
	tar zxvf nginx-1.18.0.tar.gz && \
	cd nginx-1.18.0 && \
    ./configure  --user=root --group=root --with-debug --with-ipv6 --with-http_ssl_module  --with-compat --add-module=/ModSecurity-nginx --without-http_access_module --without-http_auth_basic_module --without-http_autoindex_module --without-http_empty_gif_module --without-http_fastcgi_module --without-http_referer_module --without-http_memcached_module --without-http_scgi_module --without-http_split_clients_module --without-http_ssi_module --without-http_uwsgi_module && \
    make modules && \
    mkdir /etc/nginx/modules && \
    cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules && \
    rm -rf /usr/share/modsecurity-crs && \
    git clone https://github.com/coreruleset/coreruleset /usr/local/modsecurity-crs && \
    mv /usr/local/modsecurity-crs/crs-setup.conf.example /usr/local/modsecurity-crs/crs-setup.conf && \
    mv /usr/local/modsecurity-crs/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example /usr/local/modsecurity-crs/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf && \
    mkdir -p /etc/nginx/modsec && \
    cp /opt/ModSecurity/unicode.mapping /etc/nginx/modsec && \
    cp /opt/ModSecurity/modsecurity.conf-recommended /etc/nginx/modsec/modsecurity.conf && \
    cp /etc/modsecurity/modsecurity.conf-recommended /etc/modsecurity/modsecurity.conf && \
    apt-get remove -y --purge apt-utils autoconf automake build-essential git pkgconf && \
	apt-get autoremove -y

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY main.conf /etc/nginx/modsec/main.conf
COPY default /etc/nginx/sites-available/default

EXPOSE 80

CMD ./usr/local/nginx/sbin/nginx -g 'daemon off;'