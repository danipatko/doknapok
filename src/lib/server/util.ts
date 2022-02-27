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
