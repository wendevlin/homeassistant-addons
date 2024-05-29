import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import tw, { type Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import cssnano from 'cssnano'

const tailwindConfig: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        nav: '#f6f6f6',
        'nav-dark': '#272628',
        active: '#00769b',
        'active-dark': '#a9cfe1',
      },
    },
  },
  plugins: [
    typography,
    daisyui,
  ],
  daisyui: {
    themes: ['lofi', 'black'],
    darkTheme: 'black',
  }
}

/**
 * Builds the CSS file using Tailwind CSS and PostCSS.
 * Since the structure of the HTML Template is not changing during runtime this runs just runs before docker image is built.
 * @returns {Promise<void>} A promise that resolves when the CSS file is built.
 */
export const buildCss = async () => {
	const sourceText = await Bun.file('./src/css/main.css').text()
  const tailwind = tw(tailwindConfig)
  const autoprefixerPlugin = autoprefixer()
  const { css } = await postcss([
    tw(tailwindConfig),
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ]).process(
    sourceText,
    {
      from: './src/css/main.css',
    }
  )

  await Bun.write('./dist/main.css', css)
};