module.exports = {
    darkMode: 'class',
    content: ['src/pages/**/*.tsx', 'src/lib/components/*.tsx'],
    theme: {
        extend: {
            colors: {
                vscgrey: '#1e1e1e',
                main: '#333C4A',
                'main-highlight': '#555E6C',
                border: '#F2F2F2',
                back: '#111111',
                fore: '#008E89',
                'fore-highlight': '#06CFC8',
            },
        },
    },
    plugins: [],
};
