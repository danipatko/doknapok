export type User = {
    name: string;
    email: string;
    class: string;
    picture: string;
    admin: boolean;
    event_1_enrolled: Date | null;
    event_1_id: string | null;
    event_2_enrolled: Date | null;
    event_2_id: string | null;
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
};
