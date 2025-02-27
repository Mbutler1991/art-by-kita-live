module.exports = {
    theme: {
      extend: {
        backdropBlur: {
          lg: "30px",
        },
      },
    },
    plugins: [require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'), ], 
    corePlugins: {
        backdropBlur: true,  // Ensure backdrop utilities are enabled
      },
  };
  
