export default (title: string, content: string, navigation: string) => (
  <html lang="en">
      <head>
          <title>{ title }</title>
          <link rel="stylesheet" href="./main.css" />
      </head>
      <body>
        <div class="p-5">
          <div class="navbar bg-base-100">
            <a class="btn btn-ghost text-xl">Homedocs</a>
          </div>
          <div>
            <div class="drawer lg:drawer-open">
              <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
              <div class="drawer-content flex flex-col items-center justify-center">
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div class="prose">
                  <h1>{ title }</h1>
                  { content }
                </div>
              </div>
              <div class="drawer-side">
                <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
                {navigation}
              </div>
            </div>
          </div>
        </div>
      </body>
  </html>
)
