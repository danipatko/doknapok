export type User = {
    id: string;
    name: string;
    email: string;
    class: string;
    admin: boolean;
    event_1_enrolled: Date;
    event_1_id: string;
    event_2_enrolled: Date;
    event_2_id: string;
};

export type IEvent = {
    id: string;
    title: string;
    description: string;
    guest: string;
    location: string;
    color: string;
    capacity: number;
    occupied: number;
    block: number;
};
