import type { JSXNode } from 'hono/jsx'
import type { FC, PropsWithChildren } from 'hono/jsx'

const layout: FC<
	PropsWithChildren<{ content: string; pathPrefix: string }>
> = ({ content, children, pathPrefix }) => (
	<html lang="en">
		<head>
			<title>Homedocs</title>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="stylesheet" href="./main.css" />
			<link rel="icon" href="./favicon.svg" />
		</head>
		<body>
			<div class="navbar bg-nav dark:bg-nav-dark dark:text-white justify-between">
				<a href={`${pathPrefix}`} class="btn btn-ghost text-xl">
					<img class="h-8 mr-5" src="./favicon.svg" alt="Homedocs Logo" />
					Homedocs
				</a>
				<label for="navigation-drawer" class="btn drawer-button lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-5 stroke-current"
					>
						<title>Open Navigation Drawer</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</label>
			</div>
			<div class="drawer lg:drawer-open">
				<input id="navigation-drawer" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content flex flex-col items-center justify-start">
					<div
						class="prose py-10 px-3 max-w-screen-xl w-full"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
				<div class="drawer-side">
					<label
						for="navigation-drawer"
						aria-label="close sidebar"
						class="drawer-overlay"
					/>
					{children}
				</div>
			</div>
		</body>
	</html>
)

export default layout
