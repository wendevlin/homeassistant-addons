export default (title: string, content: string, navigation: JSX.Element, pathPrefix: string) => (
  <html lang="en">
      <head>
          <title>{ title }</title>
          <link rel="stylesheet" href="./main.css" />
      </head>
      <body>
        <div>
          <div class="navbar bg-accent">
            <a href={`${pathPrefix}`} class="btn btn-ghost text-xl">Homedocs</a>
          </div>
          <div>
            <div class="drawer lg:drawer-open">
              <input id="navigation-drawer" type="checkbox" class="drawer-toggle" />
              <div class="drawer-content flex flex-col items-center justify-center">
                <label for="navigation-drawer" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div class="prose">
                  <h1>{ title }</h1>
                  { content }
                </div>
              </div>
              <div class="drawer-side bg-base-200">
                <label for="navigation-drawer" aria-label="close sidebar" class="drawer-overlay"></label> 
                {navigation}
              </div>
            </div>
          </div>
        </div>
      </body>
  </html>
)
