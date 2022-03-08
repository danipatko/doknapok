FROM arm64v8/redis

COPY redis.conf /usr/local/etc/redis/redis.conf
COPY redisearch.so /usr/local/etc/redisearch.so
COPY librejson.so /usr/local/etc/librejson.so

EXPOSE 6379
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
