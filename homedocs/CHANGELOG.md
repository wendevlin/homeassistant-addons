<!-- https://developers.home-assistant.io/docs/add-ons/presentation#keeping-a-changelog -->

## 4.0.0-beta.1

Complete rewrite, the code now lives in [wendevlin/homedocs](https://github.com/wendevlin/homedocs).

**Breaking: your docs move.** They are no longer in the `homedocs` folder of your Home Assistant
configuration but in the app's own folder, `/addon_configs/<repo>_homedocs_beta` (Samba, Studio
Code Server). On the first start they are copied over once; the old folder is left untouched and
you can delete it after checking that everything is there.

- Read and edit pages right in the browser (visual and markdown editor), attach files
- Create, rename, move, reorder and delete pages and folders
- See who is editing a page; no more lost changes when a file changed on disk meanwhile
- Administrators choose which other users can edit
- Print or save one page or all pages as PDF
- Share a page or a folder with a link and QR code, without a Home Assistant login. Links can be
  disabled or deleted at any time. They open on port 8098 (local network), or through a remote URL
  you set up yourself
- Only aarch64 and amd64 are supported

## 3.0.0

- migration to nodejs 22 with hono server

## 2.0.6

- fix run command for bun server

## 2.0.5

- switch base image to debian

## 2.0.4

- Switch username to wendevlin
- Bump docker/login-action from 3.2.0 to 3.3.0

## 2.0.3

- Add robots.txt disallowing all bots
- improve logs with date and time
- Experimental: Add html export all pages at once to print it to PDF

## 2.0.2

- Fixed serving of assets
- enabled bun smol mode to reduce memory usage
- added styled 404 page

## 2.0.1

- Use pre built image

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
