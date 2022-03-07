FROM arm64v8/redis

COPY redis.conf /usr/local/etc/redis/redis.conf
COPY redisearch.so /user/local/etc/
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]