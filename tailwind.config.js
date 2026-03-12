// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          start: "#FF8A4C",
          end: "#FF5A3D",
        },
        deepGreen: "#2F6B47",
        pastelPink: "#FFE6EC",
        pastelBlue: "#E8F3FF",
        pastelGreen: "#E7F8EF",
        pastelOrange: "#FFEEDF",
        warmBg: "#FFF7F1",
        borderGray: "#E8E2DA",
        textGray: "#66615A",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        card: "24px",
        pill: "9999px",
        button: "16px",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        softCard: "0 10px 30px rgba(47, 31, 11, 0.08)",
      },
    },
  },
  plugins: [],
};
