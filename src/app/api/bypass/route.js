// src/app/api/bypass/route.js
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// === Init Redis & Ratelimit ===
const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(20, "15 m"), // max 20 request / 15 menit
	analytics: true,
});

// ===============================================================
export async function POST(request) {
	try {
		const ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("cf-connecting-ip") || // Cloudflare / Vercel
			"unknown";

		// ====== Rate limit check ======
		const { success, limit, remaining, reset } = await ratelimit.limit(ip);

		if (!success) {
			return NextResponse.json(
				{
					limit_reached: true,
					message_limit: `⏳ Rate limit exceeded. Max ${limit} requests per 15 minutes.`,
					retry_after: Math.ceil((reset - Date.now()) / 1000), // detik
				},
				{ status: 429 }
			);
		}

		// ====== Ambil body request ======
		const body = await request.json();
		const { url } = body;

		if (!url) {
			return NextResponse.json({ error: "No URL provided." }, { status: 400 });
		}

		let apiUrl = "";
		let type = "";
		let id = "";
		let pathInZip = "";
		let fileName = "";
		let folderInZip = ".";

		// === URL Detection ===
		const fileMatch = url.match(/pixeldrain\.com\/u\/([a-zA-Z0-9]+)/);
		const listMatch = url.match(/pixeldrain\.com\/l\/([a-zA-Z0-9]+)/);
		const zipMatch = url.match(
			/pixeldrain\.com\/api\/file\/([a-zA-Z0-9]+)\/info\/zip\/(.+)/
		);

		if (fileMatch) {
			id = fileMatch[1];
			type = "file";
			apiUrl = `https://pixeldrain.com/api/file/${id}/info`;
		} else if (listMatch) {
			id = listMatch[1];
			type = "list";
			apiUrl = `https://pixeldrain.com/api/list/${id}`;
		} else if (zipMatch) {
			id = zipMatch[1];
			pathInZip = zipMatch[2];
			fileName = decodeURIComponent(pathInZip.split("/").pop());
			folderInZip =
				decodeURIComponent(pathInZip.split("/").slice(0, -1).join("/")) || ".";
			type = "zip";
			apiUrl = `https://pixeldrain.com/api/file/${id}/info/zip`;
		} else {
			return NextResponse.json(
				{ error: "Invalid Pixeldrain URL." },
				{ status: 400 }
			);
		}

		// === Fetch data from Pixeldrain ===
		const response = await fetch(apiUrl, {
			cache: "no-store",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			},
		});
		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to contact Pixeldrain API." },
				{ status: 502 }
			);
		}

		const raw = await response.text();
		// -------- FIX PENTING --------
		let data;
		try {
			data = JSON.parse(raw);
		} catch (e) {
			return NextResponse.json(
				{
					error: "Pixeldrain returned non-JSON (blocked): " + raw.slice(0, 200),
				},
				{ status: 502 }
			);
		}
		// -----------------------------

		// const data = await response.json();

		// === Build Result ===
		let result;
		if (type === "file") {
			result = {
				viewerData: {
					type: "file",
					api_response: {
						name: data.name,
						id: data.id,
						size: data.size,
						url: `https://pixeldrain.com/api/file/${id}`,
					},
				},
			};
		} else if (type === "zip") {
			if (folderInZip === ".") {
				result = {
					viewerData: {
						type: "zip",
						api_response: {
							name: fileName,
							id,
							size: data.size,
							url: pathInZip,
							file_name: fileName,
							folder_in_zip: folderInZip,
						},
					},
				};
			} else {
				result = {
					viewerData: {
						type: "zip",
						api_response: {
							name: fileName,
							id,
							size: data.size,
							url: pathInZip,
							file_name: fileName,
							folder_in_zip: folderInZip,
							file_size:
								data.children?.[folderInZip]?.children?.[fileName]?.size || 0,
						},
					},
				};
			}
		} else if (type === "list") {
			const files = (data.files || []).map((item) => ({
				name: item.name,
				size: item.size,
				id: item.id,
			}));

			result = {
				viewerData: {
					type: "list",
					api_response: {
						title: data.title,
						id: data.id,
						name: data.name || "",
						files,
					},
				},
			};
		}

		return NextResponse.json(result);
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
