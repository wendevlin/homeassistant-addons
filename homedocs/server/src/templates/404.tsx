export default (path: string) => (
	<html lang="en">
		<head>
			<title>Homedocs - 404 Not Found</title>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="stylesheet" href="./main.css" />
			<link rel="icon" href="./favicon.svg" />
		</head>
		<body>
			<div class="navbar bg-nav dark:bg-nav-dark dark:text-white justify-between">
				<span class="text-xl">
					<img class="h-8 mr-5" src="./favicon.svg" alt="Homedocs Logo" />
					Homedocs
				</span>
			</div>
			<div>
				<div class="flex flex-col items-center justify-start">
					<div class="prose py-10 px-3 max-w-screen-xl w-full">
						<div class="text-4xl">404</div>
						{path} not found in your Homedocs
					</div>
				</div>
			</div>
		</body>
	</html>
)
