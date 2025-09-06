import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "pixeldrain-bypass",
	description:
		"Bypass Pixeldrain & dapatkan download langsung tanpa iklan. Cepat, aman, gratis. Skip limits & ads. Direct Pixeldrain download, fast & secure.",
	keywords: [
		"Pixeldrain",
		"Pixeldrain bypass",
		"Pixeldrain downloader",
		"direct download Pixeldrain",
		"Pixeldrain direct link generator",
		"Pixeldrain file extractor",
		"download Pixeldrain list",
		"bypass Pixeldrain limit",
		"free Pixeldrain download",
		"Pixeldrain link converter",
		"download tool Pixeldrain",
		"Pixeldrain link unlocker",
		" Pixeldrain no ads",
		"Pixeldrain premium bypass",
	],
	authors: [{ name: "NeoCortexx" }],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				{/* Google Fonts */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0"
				/>
			</head>
			<body className="bg-zinc-500 text-gray-900">{children}</body>
		</html>
	);
}
