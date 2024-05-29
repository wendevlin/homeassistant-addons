# Home Assistant Add-on: Homedocs

This addon helps you document stuff around your home inside home assistant in a nice way.

## How to use

1. Install the addon
2. Start the addon
3. the addon creates a folder called `homedocs` in your config folder
4. the addon copies some sample data to this folder
5. edit the markdown files in the `homedocs` folder
6. The addon will recognize the changes and build the site
7. open the webui to see your beautiful documentation

### how to edit the documentation

The documentation lies in your `config` directory under `homedocs`. When you edit or add/remove the markdown files, your changes will be build and you will see the changes inside the webui.

#### Use the Studio Code Server addon

I recommend to use the [Studio Code Server](https://github.com/hassio-addons/addon-vscode) to edit your documentation, because it is very convenient to edit markdown files with it and you can just drag and drop files into the addon.
