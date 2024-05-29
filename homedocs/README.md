# Homedocs

With this home assistant addon you can easily create a documentation site for your home or something else.

__Why homedocs__
- Create a documentation site for your home and everything else
- Auth with home assistant
- Fast to create with markdown

__How I use it__:

I document stuff that I don't need very often, for example a yearly maintainance of the heating.
Moreover I printed QR codes on some devices, that you can fast access the documentation.
In my docs I also store all manual files, so I have everything in one place.

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
6. The addon will recognize the changes and build the site
7. open the webui to see your beautiful documentation
8. (optional) you can open it outside of your home assistant if you have the port configured

## Troubleshooting

### Build is not triggered

I had sometimes the issue that the build wasn't triggert, if this happens you can restart your addon, then the build will be triggert on startup.

## Roadmap

- [ ] Image optimization
- [ ] More efficient build
- [ ] Integrated search
- [ ] Table of contents