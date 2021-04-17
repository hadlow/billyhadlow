module.exports = {
  purge: {
    enabled: true,
    content: [
      './build/*.html'
    ]
  },
  theme: {
    fontFamily: {
      display: ['neue-haas-grotesk-display', 'sans-serif'],
      body: ['neue-haas-grotesk-text', 'sans-serif'],
    },
    extend: {
      colors: {
        "primary": '#1f1d7c'
      },
      margin: {
        
      },
    }
  },
  variants: {},
  plugins: [],
}
