/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const {nextui} = require("@nextui-org/react");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      dropShadow: {
        yellowGlow: ["0 0px 10px #ffdd00", "0 0px 30px #ffbb00"],
      },
      flex: {
        2: "2 2 0%",
      },
      fontFamily: {
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
        aeonikPro: ["var(--font-aeonikPro)", "system-ui", "sans-serif"],
        ibmPlexSans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        dinPro: ["var(--font-DINPro)", "system-ui", "sans-serif"],
        aeonikMono: ["var(--font-aeonikMono)", "system-ui", "sans-serif"],
        mouchaVintage: ["var(--font-mouchaVintage)", "system-ui", "sans-serif"],
        chakraPetch: ["var(--font-chakraPetch)", "system-ui", "sans-serif"],
      },
      animation: {
        // Fade up and down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "custom-spin": "custom-spin 5s infinite linear",
        "loading-spin": "loading-spin 1.5s infinite linear",
        "loading-pulse": "loading-pulse 5s infinite linear",
        "loading-flicker": "loading-flicker 3s infinite linear",
        Glow: "Glow 5s infinite ease-in-out",
        "hover-up-end": "move-up 0.2s forwards, move-end 0.2s forwards 0.2s",
        "bsc-glow": "bsc-glow 2s infinite linear",
      },
      backgroundImage: {
        "our-partner-gradient":
          "linear-gradient(180deg, #151515 0%, rgba(33, 33, 33, 0.00) 100%)",
        "fcon-gradient": "linear-gradient(180deg, #86FFE2 0%, #00FFC2 100%)",
        "animation-gradient": "",
        level:
          "linear-gradient(180deg, rgba(255, 134, 134, 0.22) 0%, rgba(255, 61, 0, 0.19) 100%)",
        "leaderboard-light":
          "linear-gradient(180deg, #E9F0F2 0%, rgba(239, 242, 243, 0.02) 100%)",
        "leaderboard-dark": "linear-gradient(180deg, #181717db 0%, #000 100%)",
        "leaderboard-upper-light":
          "linear-gradient(180deg, #E9F0F2 0%, rgba(233, 240, 242, 0.02) 100%)",
        "leaderboard-upper-dark":
          "linear-gradient(180deg, #08080891 18%, #1b1b1b 100%)",
        "hero-background": "linear-gradient(90deg, #EAF0EF 0%, #DDECFF 100%)",
        "hero-background-dark":
          "linear-gradient(90deg, #2B2E2D 0%, #292C31 100%)",
        "ecosystem-overview-background":
          "linear-gradient(90deg, #120B13 85.33%, rgba(25, 18, 26, 0.00) 100%)",
        "devide-gradient":
          "linear-gradient(270deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%)",
        "leaderboard-clipPath":
          "linear-gradient(180deg, rgba(24, 38, 35, 0.00) 0%, rgba(24, 38, 35, 0.80) 100%)",
        "leaderboard-clipPath-2":
          "linear-gradient(180deg, rgba(24, 38, 35, 0.80) 0%, rgba(24, 38, 35, 0.00) 100%)",
        "reward-clipPath":
          "linear-gradient(180deg, rgba(24, 38, 35, 0.00) 0%, rgba(24, 38, 35, 0.80) 100%)",
        "reward-clipPath-2":
          "linear-gradient(180deg, rgba(0, 70, 52, 0.80) 0%, rgba(24, 38, 35, 0.00) 100%)",
        "reward-clipPath-3":
          "linear-gradient(180deg, rgba(0, 85, 63, 0.80) 0%, rgba(24, 38, 35, 0.00) 100%)",
        loading: "url('/images/rocket-color.svg')",
        "aviatrix-mission-done":
          "linear-gradient(180deg, rgba(0, 255, 194, 0.10) 0%, rgba(0, 255, 194, 0.11) 100%)",
        "aviatrix-mission-pending":
          "linear-gradient(180deg, rgba(255, 215, 116, 0.10) 0%, rgba(255, 215, 116, 0.11) 100%)",
        "aviatrix-mission-normal":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)",
        "planet": "url('/images/the-planet-bg-1.jpg')",
        "planet-color": "linear-gradient(180deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.72) 100%)",
        "champion-terminal": "linear-gradient(0deg, rgba(0, 194, 255, 0.22) 0%, rgba(0, 194, 255, 0.00) 100%)"

      },
      backgroundColor: {
        background1: "rgba(255, 255, 255, 0.07)",
        backfround2: "rgba(255, 255, 255, 0.14)",
        background3: "rgba(0, 0, 0, 0.03)",
        background4: "rgba(255, 255, 255, 0.12)",
        background5: "rgba(255, 255, 255, 0.13)",
        "background-wallet": "rgba(31, 202, 161, 0.20)",
        "background-success": "rgba(0, 212, 123, 0.10)",
        "background-error": "rgba(255, 41, 41, 0.10)",
        "lightgray": "lightgray"
      },
      borderColor: {
        border1: "1px solid rgba(0, 0, 0, 0.12)",
        border2: "1px solid rgba(0, 0, 0, 0.10)",
        border3: "1px solid rgba(255, 255, 255, 0.12)",
        border4: "1px solid rgba(0, 0, 0, 0.08)",
        border5: "1px solid rgba(255, 255, 255, 0.10)",
        "border-trailer": "rgba(255, 255, 255, 0.06)",
      },
      backgroundPosition: {
        "background-left": "bottom 0px right 28%",
        "background-left-sm": "bottom 0px right 25%",
      },
      boxShadow: {
        nav: "inset 200px 0 0 0 #54b3d6;",
        topBtn: "0px 12px 64px 0px #00FFC2"
      },
      colors: {
        fcon: "#00FFC2",
        red: {
          500: "#FF2C2C",
        },
        error: "#FF634E",
        gray0: "#090B0A",
        gray1: "#101111",
        gray2: "#191B1A",
        gray3: "#2B3331",
        gray4: "#404544",
        gray5: "#4F5654",
        gray6: "#76807D",
        gray7: "#ABB2B0",
        lightGreen: "#1FCAA1",
        gray10: "#D0D4D3",
      },
      textShadow: {
        1: "0 0 24px rgba(#2a3d38, 0.8)",
        2: "0 0 16px rgba(#2a3d38, 0)",
        3: "0px 0px 52px rgba(0, 0, 0, 0.76)",
        4: "0px 0px 28px rgba(0, 0, 0, 0.25)",
        5: "8px 8px 33px rgba(0, 255, 194, 0.34)",
      },
      transitionTimingFunction: {
        "button-greip": "cubic-bezier(0.7, 0, 0.2, 1)",
      },
      keyframes: {
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "custom-spin": {
          "100%": {
            transform: "rotate(1turn)",
          },
        },
        "loading-spin": {
          "50% ": {
            opacity: 0.2,
          },
          "100%": {
            transform: "translate(-50%, -50%) rotate(360deg)",
          },
        },
        "loading-pulse": {
          "50%": {
            color: "rgba(#2a3d38, 0.5)",
            textShadow: "0 0 24px rgba(#2a3d38, 0.4)",
          },
        },
        "loading-flicker": {
          "0%": {
            opacity: 0.1,
            color: "#2a3d38",
            textShadow: "0 0 16px rgba(#2a3d38, 1)",
          },

          "2%": {
            opacity: 1,
            color: "#fff",
            textShadow: "0 0 24px rgba(#2a3d38, 1)",
          },

          "6%": {
            opacity: 0.1,
            color: " #2a3d38",
            textShadow: "0 0 8px rgba(#2a3d38, 1)",
          },

          "12%": {
            opacity: 0.8,
            color: " #fff",
            textShadow: "0 0 8px rgba(#2a3d38, 1)",
          },

          "14%": {
            opacity: 0.2,
            color: "#2a3d38",
            textShadow: "0 0 8px rgba(#2a3d38, 1)",
          },

          "30%": {
            opacity: 1,
            color: "#fff",
            textShadow: "0 0 16px rgba(#2a3d38, 1)",
          },

          "36%": {
            opacity: 0.2,
            color: "#2a3d38",
            textShadow: "0 0 24px rgba(#2a3d38, 1)",
          },

          "60%": {
            opacity: 0.6,
            textShadow: " 0 0 16px rgba(#2a3d38, 1)",
          },

          "64%": {
            opacity: 0.8,
            textShadow: "0 0 18px rgba(#2a3d38, 1)",
          },

          "68%": {
            opacity: 1,
            textShadow: "0 0 24px rgba(#2a3d38, 1)",
          },

          "82%": {
            opacity: 0.2,
            textShadow: "0 0 16px rgba(#2a3d38, 1)",
          },

          "84%": {
            opacity: 0.1,
            textShadow: "0 0 8px rgba(#2a3d38, 1)",
          },

          "86%": {
            opacity: 0.6,
            textShadow: "0 0 12px rgba(#2a3d38, 1)",
          },
        },
        Glow: {
          "50%": {
            boxShadow: "inset 0 0 24px 4px rgba(#2a3d38, 0.8)",
          },
        },
        "move-up": {
          to: {
            transform: "translate3d(0,-105%,0)",
          },
        },
        "move-end": {
          from: {
            transform: "translate3d(0,100%,0)",
          },
          to: {
            transform: "translate3d(0,0,0)",
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // bsc glow
        "bsc-glow": {
          "50%": { boxShadow: "0 0 10px 8px transparent" },
          "100%": { boxShadow: "0 0 18px 8px #efba15" },
        },
      },
    },
  },
  plugins: [
    nextui(),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
