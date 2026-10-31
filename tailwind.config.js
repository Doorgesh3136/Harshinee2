/* Tailwind build config. Rebuild after changing classes:
   npx tailwindcss@3.4.17 -c tailwind.config.js -i assets/css/tailwind.src.css -o assets/css/tailwind.css --minify */
module.exports = {
    content: ['./index.html', './assets/js/**/*.js'],
    theme: {
        extend: {
            colors: {
                ink: '#1C0611', plum: '#2B0A1A', wine: '#4A0B24', sindoor: '#C8102E',
                kesar: '#E89A3C', zari: '#D9B25F', gulabi: '#F2C7CF', ivory: '#F7EDE3', mehendi: '#2F5D3A'
            },
            fontFamily: {
                display: ['"Rozha One"', 'Georgia', 'serif'],
                body: ['Hind', 'system-ui', 'sans-serif']
            }
        }
    }
};
