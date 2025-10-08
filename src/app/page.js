"use client";
import Image from "next/image";

import Script from "next/script";

export default function Home() {
	function handleClick(e) {
		if (typeof window.generateBypass === "function") {
			window.generateBypass(e);
		}
	}

	return (
		<main className="w-full max-w-2xl mx-auto p-4 bg-zinc-400 rounded-lg shadow-md mt-10 mb-10">
			<header>
				{/* <h1 className="text-4xl font-bold mb-6 text-white text-center text-shadow-lg border border-white rounded bg-yellow-500 p-4">🚧 UNDER DEVELOPMENT 🚧</h1> */}
				<h1 className="text-4xl font-bold mb-2 text-white text-center text-shadow-lg">
					PIXELDRAIN BYPASS
				</h1>
				<div
					className="h-[2px] bg-white my-4"
					style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
				></div>
			</header>
			<form>
				<div>
					<label
						htmlFor="url-input"
						className="block mb-2 text-sm font-medium text-white text-shadow-lg"
					>
						Enter pixeldrain url here:
					</label>
					<textarea
						name=""
						id="url-input"
						placeholder="One url per-line..."
						className="border border-gray-300 p-2 rounded-md w-full text-white bg-gray-500 min-h-[200px]"
					></textarea>
				</div>
				<div className="flex md:items-center w-full md:w-auto mt-2">
					<button
						id="bypass-button"
						type="submit"
						onClick={handleClick}
						className="flex items-center justify-center bg-slate-500 text-white p-2 rounded-md text-center w-full text-shadow-lg hover:bg-slate-600"
					>
						<svg
							id="spinner"
							className="animate-spin h-5 w-5 hidden"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								strokeWidth="4"
								className="opacity-25"
							></circle>
							<path
								d="M4 12a8 8 0 018-8"
								strokeWidth="4"
								className="opacity-75"
							></path>
						</svg>
						<span id="button-text">Bypass</span>
						<span className="material-symbols-outlined">step_over</span>
					</button>
				</div>
			</form>

			<section id="output-container" className="mt-6 hidden">
				<div id="message-box" className="m-4 p-4 rounded text-sm"></div>
				<div id="result-container" className="space-y-4"></div>
			</section>

			<footer className="mt-4 flex flex-col space-y-2">
				<p className="text-sm text-white text-center">
					Made with ❤️ by NeoCortexx
				</p>
				<p className="text-sm text-white/70 text-center">
					NOT AFFILIATED WITH PIXELDRAIN
				</p>
			</footer>
			{/* Load script.js dari public */}
			<Script src="/script.js" strategy="afterInteractive" />
		</main>
	);
}
