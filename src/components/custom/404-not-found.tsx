export default function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center  px-6">
			<div className="text-center">
				<p className="text-sm font-bold tracking-[0.3em] text-gray-400 uppercase">
					Error 404
				</p>
				<h1 className="mt-4 text-4xl font-light tracking-tight text-gray-900 sm:text-6xl">
					Lost in space.
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-500 max-w-sm mx-auto">
					The page you requested could not be found. It may have been moved or
					deleted.
				</p>
				<div className="mt-10">
					<a
						href="/"
						className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-gray-400 hover:border-gray-400 transition-all duration-300"
					>
						Return Home
					</a>
				</div>
			</div>
		</main>
	);
}
