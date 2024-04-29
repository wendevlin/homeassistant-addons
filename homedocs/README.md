# Homedocs

With this home assistant addon you can easily create a documentation site for your home or something else.
It uses Starlight from astro under the hood.

__Why homedocs__
- Create a documentation site for your home and everything else
- Auth with home assistant
- Fast to create with markdown

__Why starlight?__

- Very good docs layout
- markdown and MDX support
- integrated search
- images are automatically optimized
- mobile optimized
- dark mode

__How I use it__:

I document stuff that I don't need very often, for example a yearly maintainance of the heating.
Moreover I printed QR codes on some devices, that you can fast access the documentation.

I have multiple documentation sites for:
- garden
  - mower
  - watering
  - ready for winter maintainance
- house
  - flyscreens
  - heating
  - breaker box
  - water
- ....

## How to use

1. Install the addon
2. Start the addon
3. the addon creates a folder called `homedocs` in your config folder
4. the addon copies some sample data to this folder
5. edit the markdown files in the `homedocs` folder
  - in the `content/docs` folder you can write your documentation
  - all images should be placed in the `assets` folder
    - the will be automatically optimized by astro
6. The addon will recognize the changes and build the site after a give timeout (60 seconds is default)
  - the timeout is needed because the build takes some time and can just runs once in parallel.
7. open the webui to see your beautiful documentation

## Troubleshooting

### Build is not triggered

I had sometimes the issue that the build wasn't triggert, if this happens you can restart your addon, then the build will be triggert on startup.

## Check the logs!

If your made a mistake in your markdown files the build will fail, check the logs for more information. Starlight will give you a hint on what went wrong.
You won't see the error in the browser, it will still display the last version.

## Roadmap

- [ ] Build information in frontend
  - I could add custom web path for build information or it will be displayed on every page as some kind of overlay
- [ ] Themes
  - Starlight has a built in theme feature, I could provide some predefined themes to select from and the possibility to create custom themes
  - Moreover I could get the home assistant theme and use this base colors
- [ ] hot reload
  - Starlight is working on SSR, maybe it is then possible to have hot reload instead of the full build