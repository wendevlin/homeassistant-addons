<!-- https://developers.home-assistant.io/docs/add-ons/presentation#keeping-a-changelog -->

## 2.0.0

- **BREAKING** The /config/homedocs directory doesn't need the content/docs, assets and files folder anymore. All content is now directly in the /config/homedocs folder.
- Homedocs rewritten without astro. Uses now an elysia webserver and markdown-it for rendering markdown.
- **BREAKING** Config changed and internal ports changed. I recommend to uninstall and reinstall the addon. Your markdown data will be kept in the home assistant config folder.

## 1.0.9

- Fix webserver to use correct base url

## 1.0.8

- Fix search inside ingress

## 1.0.7

- Fix navbar logo to PNG

## 1.0.6

- Fix navbar logo

## 1.0.5

- Remove armhf and i386 support (bun is not supported on these platform)

## 1.0.4

- Upgrade base images to 3.19

## 1.0.3

- Use nodejs-current instead of nodejs in alpine linux

## 1.0.2

- Remove armhf and armv7 support (bun is not supported on these platforms)

## 1.0.1

- Fixing the build process

## 1.0.0

- Initial release
