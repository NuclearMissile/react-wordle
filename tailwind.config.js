/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'shake': {
                    '0%, 100%': {transform: 'translateX(0)'},
                    '10%, 30%, 50%, 70%, 90%': {transform: 'translateX(-10px)'},
                    '20%, 40%, 60%, 80%': {transform: 'translateX(10px)'}
                },
                'shake-vertical': {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '10%, 30%, 50%, 70%, 90%': {transform: 'translateY(-10px)'},
                    '20%, 40%, 60%, 80%': {transform: 'translateY(10px)'}
                },
                'shake-both': {
                    '0%, 100%': {transform: 'translate(0, 0)'},
                    '10%, 30%, 50%, 70%, 90%': {transform: 'translate(-10px, -5px)'},
                    '20%, 40%, 60%, 80%': {transform: 'translate(10px, 5px)'}
                }
            },
            animation: {
                'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
                'shake-slow': 'shake 1.5s cubic-bezier(.36,.07,.19,.97) both',
                'shake-fast': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                'shake-infinite': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite',
                'shake-vertical': 'shake-vertical 0.82s cubic-bezier(.36,.07,.19,.97) both',
                'shake-both': 'shake-both 0.82s cubic-bezier(.36,.07,.19,.97) both',
            }
        },
    },
    plugins: [],
}