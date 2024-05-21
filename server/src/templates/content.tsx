export default (title: string, markdown: string) => (
  <html lang="en">
      <head>
          <title>{ title }</title>
          <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div class="p-5">
          <div class="navbar bg-base-100">
            <a class="btn btn-ghost text-xl">Homedocs - {title}</a>
          </div>
          <div>
            <div class="drawer lg:drawer-open">
              <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
              <div class="drawer-content flex flex-col items-center justify-center">
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div class="prose">
                  { markdown }
                </div>
              </div> 
              <div class="drawer-side">
                <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
                <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li>
                </ul>
              
              </div>
            </div>
          </div>
        </div>
      </body>
  </html>
)
