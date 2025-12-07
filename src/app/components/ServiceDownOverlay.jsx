"use client";

import { useState } from "react";

export default function ServiceDownOverlay() {
	const [open, setOpen] = useState(true);

	if (!open) return null; // kalau sudah ditutup, tidak tampil

	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
			onClick={() => setOpen(false)} // klik area luar → close
		>
			<div
				className="p-6 bg-red-900/40 border border-red-600 rounded-lg text-center text-red-200 max-w-lg w-full"
				onClick={(e) => e.stopPropagation()} // cegah klik di dalam supaya tidak ikut close
			>
				<h2 className="text-2xl font-bold text-red-300 mb-3">
					🚫 SERVICE NO LONGER AVAILABLE
				</h2>

				<p className="text-lg mb-4">
					Pixeldrain has{" "}
					<strong>blocked all requests from our third-party API</strong>.
				</p>

				<p className="text-md">
					For this reason, the bypass service will remain unavailable until
					Pixeldrain removes the block or an alternative method is found. Thank
					you for using this service. ❤️
				</p>

				<p className="mt-4 text-sm opacity-70">- NeoCortexx</p>
			</div>
		</div>
	);
}
