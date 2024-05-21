import Elysia from 'elysia'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import tw, { type Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

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
    themes: [],
  }
}

export const tailwind = async () => {
	const sourceText = await Bun.file('./src/css/main.css').text()
  const tailwind = tw(tailwindConfig)
  const autoprefixerPlugin = autoprefixer()
  const { css } = await postcss([tailwind, autoprefixerPlugin]).process(
    sourceText,
    {
      from: './src/css/main.css',
    }
  )

	return new Elysia({ name: "tailwind" }).get(
		'/main.css',
		async ({ set }) => {
			set.headers["content-type"] = "text/css";
			return css;
		},
	);
};