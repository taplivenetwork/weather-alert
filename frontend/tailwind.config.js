/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1337ec",
                "background-light": "#f6f6f8",
                "background-dark": "#101322",
                "card-dark": "#1e293b",
                "card-darker": "#191e33",
                "emergency": "#ef4444",
                "warning": "#f97316",
                "advisory": "#eab308",
                "info": "#22c55e",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(234, 88, 12, 0.6))' },
                    '50%': { transform: 'scale(1.05)', filter: 'drop-shadow(0 0 40px rgba(234, 88, 12, 0.9))' },
                    '100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(234, 88, 12, 0.6))' },
                }
            }
        },
    },
    plugins: [],
}
