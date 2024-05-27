import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import tw, { type Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import cssnano from 'cssnano'

const tailwindConfig: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    daisyui,
  ],
  daisyui: {
    "light": {
      "primary": "#c0dcea",
      "secondary": "#00384b",
      "accent": "#00769b",
      "neutral": "#181819",
      "base-100": "#ffffff",
    },
    "dark": {
      "primary": "#042836",
      "secondary": "#a9cfe1",
      "accent": "#007498",
      "neutral": "#ffffff",
      "base-100": "#181819",
    }
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