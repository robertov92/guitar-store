module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            sm: '500px',
            md: '700px',
            lg: '992px',
            xl: '1200px'
        },
        container: {
            center: true,
            padding: '1rem'
        },
        extend: {
            fontFamily: {
                poppins: "'Poppins', sans-serif",
                roboto: "'Roboto', sans-serif"
            },
            colors: {
                'primary': '#144B8D'
            }
        },
    },
    variants: {
        extend: {
            display: ['group-hover'],
            visibility: ['group-hover']
        },
    },
    plugins: [require('@tailwindcss/forms')]
}