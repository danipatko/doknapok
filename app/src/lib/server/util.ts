import fs from 'fs';

/**
 * Utility function to get the year when the school started
 * (eg. 2022-2-2 started in 2021 but 2022-9-5 starts in 2022)
 */
export const schoolYear = (date: Date) => {
    return date.getFullYear() - (date.getMonth() < 6 ? 1 : 0);
};

/**
 * Fetch the class in a string format
 */
export const getClass = (email: string): string | null => {
    const match = /\.(.{2,3})@/gm.exec(email);
    if (!match) {
        console.log(`Error: invalid e-mail address (class pattern not found)`); // Debug
        return null;
    }

    const evfolyam = schoolYear(new Date()) - 2000 - parseInt(match[1].substring(0, 2)) + 8;
    return `${evfolyam < 9 ? 'NY' : evfolyam}${match[1][2]}`;
};

const WHITE_VALUE = 255 * 3;

/**
 * Decide if text color should be black or white depending on background color
 */
export const isWhite = (background: string): boolean => {
    background = background.replace('#', '');
    return (
        parseInt(background.substring(0, 2), 16) + parseInt(background.substring(2, 4), 16) + parseInt(background.substring(4, 6), 16) <
        WHITE_VALUE / 2.5
    );
};

/**
 * Should contain all utility settings
 */
export class Settings {
    static instance: Settings;

    public preset: {
        deadline: {
            date: string;
            time: string;
        };
        block1: {
            start: string;
            end: string;
        };
        block2: {
            start: string;
            end: string;
        };
    } = {
        deadline: {
            date: '',
            time: '',
        },
        block1: {
            start: '',
            end: '',
        },
        block2: {
            start: '',
            end: '',
        },
    };

    private constructor() {
        // read static settings.json
        console.log('Settings constructor called');
        this.preset = JSON.parse(fs.readFileSync('settings.json').toString()) as {
            deadline: {
                date: string;
                time: string;
            };
            block1: {
                start: string;
                end: string;
            };
            block2: {
                start: string;
                end: string;
            };
        };
    }

    static getInstance() {
        if (!this.instance) Settings.instance = new Settings();
        return Settings.instance;
    }

    protected saveSettings(): void {
        fs.writeFileSync('settings.json', JSON.stringify(this.preset));
    }

    public setBlock1Time(start: string, end: string): void {
        this.preset.block1 = { start, end };
        this.saveSettings();
    }

    public setBlock2Time(start: string, end: string): void {
        this.preset.block2 = { start, end };
        this.saveSettings();
    }

    public getDeadline(): number {
        return new Date(`${this.preset.deadline.date} ${this.preset.deadline.time}`).getTime();
    }

    public setDeadline(date: string, time: string): void {
        this.preset.deadline = { date, time };
        this.saveSettings();
    }
}
