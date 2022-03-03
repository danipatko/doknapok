export type User = {
    name: string;
    email: string;
    class: string;
    picture: string;
    admin: boolean;
    block1: string;
    block2: string;
    donedate: Date;
    done: boolean;
};

export type IEvent = {
    title: string;
    description: string;
    guest: string;
    location: string;
    color: string;
    capacity: number;
    occupied: number;
    block: number;
    id: string;
};

export const redirectToRoot = {
    redirect: {
        permanent: false,
        destination: '/',
    },
};
