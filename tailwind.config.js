module.exports = {
    darkMode: 'class',
    content: ['src/pages/**/*.tsx', 'src/lib/components/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                back: '#111111',
                'back-highlight': '#1e1e1e',
                main: '#333C4A',
                'main-highlight': '#555E6C',
                border: '#F2F2F2',
                fore: '#008E89',
                'fore-highlight': '#06CFC8',
            },
        },
    },
    plugins: [],
};
