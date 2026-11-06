# Homedocs

Document your home with Markdown, right inside Home Assistant.

## Where your docs are

Your pages are markdown files in the app's configuration folder,
`/addon_configs/<repo>_homedocs_beta`. Open it with the Samba or the Studio Code Server app to edit
files directly, or edit them in the browser. Changes on disk show up right away.

On the first start, Homedocs copies the example pages there. If you used Homedocs 3.x, it copies
your docs from `/config/homedocs` instead (once). The old folder is not changed; you can delete it
after checking that everything was copied.

## Who can do what

- Everyone who can open the app in Home Assistant can read.
- Administrators can always edit. On the **Users** page they choose which other users can edit.
- Turn on **Edit mode** in the sidebar to edit pages and to create, rename, move or delete pages
  and folders.

## Share links and QR codes

Administrators can share a page or a whole folder with a link, e.g. as a QR code stuck on a device.
The link opens without a Home Assistant login and shows only what was shared. Open a page's ⋮ menu
and choose **Share page** or **Share folder**.

Share links are served on port **8098**, which only serves shared pages:

- **Local network:** works on devices in your home network. If you disable port 8098 in the app's
  network settings, local links stop working.
- **Remote:** to open links from anywhere, make port 8098 reachable through a reverse proxy or a
  tunnel and enter its URL on the **Sharing** page. **Check** tests whether the URL reaches
  Homedocs.

All administrators see every share link on the **Sharing** page, and can disable or delete them.
Search engines are asked not to index anything.

## Options

- `max_upload_mb`: largest file that can be attached to a page, in MB (default 50).
