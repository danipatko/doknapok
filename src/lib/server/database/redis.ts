import { Schema, Entity, Repository, Client } from 'redis-om';

// Note: in docker compose, this value may be 'redis://redis:6379'
const REDIS_URL = process.env.DB_HOST ?? 'redis://127.0.0.1:6379';

const client = new Client();

export class UserEntity extends Entity {}
export class IEventEntity extends Entity {}
export class EnrollEntity extends Entity {}

const userSchema = new Schema(UserEntity, {
    name: { type: 'string' },
    email: { type: 'string' },
    class: { type: 'string' },
    picture: { type: 'string' },
    admin: { type: 'boolean' },
    block1: { type: 'string' },
    block2: { type: 'string' },
    donedate: { type: 'number' },
    done: { type: 'boolean' },
});

const ieventSchema = new Schema(IEventEntity, {
    title: { type: 'string' },
    description: { type: 'text' },
    guest: { type: 'string' },
    location: { type: 'string' },
    color: { type: 'string' },
    capacity: { type: 'number' },
    occupied: { type: 'number' },
    block: { type: 'boolean' }, // true if in the first block, otherwise false
});

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
export const flushAll = async (): Promise<void> => {
    await connect();
    await client.execute(['FLUSHALL']);
};

/**
 * Wrapper to make connection checking easier with a simple callback
 * @param callback: function with the userRepository as a parameter
 * @returns the generic type assigned to the callback function
 */
export const withUser = async <Type>(callback: (repo: Repository<UserEntity>) => Promise<Type>): Promise<Type> => {
    await connect();
    return await callback(client.fetchRepository<UserEntity>(userSchema));
};

/**
 * Wrapper to make connection checking easier with a simple callback
 * @param callback: function with the ieventRepository as a parameter
 * @returns the generic type assigned to the callback function
 */
export const withEvent = async <Type>(callback: (repo: Repository<IEventEntity>) => Promise<Type>): Promise<Type> => {
    await connect();
    return await callback(client.fetchRepository<IEventEntity>(ieventSchema));
};

/**
 * Check if key exists in the database
 */
export const exists = async (key: string): Promise<boolean> => {
    await connect();
    return await client.execute<boolean>(['EXISTS', key]);
};
