import { Schema, Entity, Repository, Client } from 'redis-om';

const REDIS_URL = 'redis://127.0.0.1:6379'; // Note: in docker compose, this value may be 'redis://redis:6379'
const client = new Client();

class UserEntity extends Entity {}
class IEventEntity extends Entity {}

const userSchema = new Schema(UserEntity, {
    name: { type: 'string' },
    email: { type: 'string' },
    class: { type: 'string' },
    picture: { type: 'string' },
    event_1_enrolled: { type: 'date' },
    event_1_id: { type: 'string' },
    event_2_enrolled: { type: 'date' },
    event_2_id: { type: 'string' },
});

const ieventSchema = new Schema(IEventEntity, {
    title: { type: 'string' },
    description: { type: 'text' },
    guest: { type: 'string' },
    location: { type: 'string' },
    color: { type: 'string' },
    capacity: { type: 'number' },
    occupied: { type: 'number' },
});

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

/**
 * Try to connect to redis server specified in `REDIS_URL`
 */
export const connect = async (): Promise<void> => {
    while (!client.isOpen()) {
        console.log('Connecting to database ...');
        await client.open(REDIS_URL);
    }
};

/**
 * Drop every key in the database
 */
export const flushAll = async () => {
    await connect();
    await client.execute(['FLUSHALL']);
};

/**
 * Reindex a specific repository
 */
export const reindex = async (repo: Repository<any>) => {
    try {
        await repo.createIndex();
        await repo.dropIndex();
    } finally {
        await repo.createIndex();
    }
};

/**
 * Wrapper to make connection checking easier with a simple callback
 * @param callback: function with the userRepository as a parameter
 */
export const withUser = async <Type>(callback: (repo: Repository<UserEntity>) => Promise<Type>): Promise<Type> => {
    await connect();
    return await callback(client.fetchRepository<UserEntity>(userSchema));
};

/**
 * Wrapper to make connection checking easier with a simple callback
 * @param callback: function with the ieventRepository as a parameter
 */
export const withEvent = async <Type>(callback: (repo: Repository<IEventEntity>) => Promise<Type>): Promise<Type> => {
    await connect();
    return await callback(client.fetchRepository<IEventEntity>(ieventSchema));
};
