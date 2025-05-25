const ALLOWED_ORIGINS = [
	'http://localhost:5174', // Dev environment
	'https://odin-react-memory.pages.dev', // Production
];

export default {
	async fetch(request, env) {
		const origin = request.headers.get('Origin') || '';
		const isAllowed = ALLOWED_ORIGINS.includes(origin);
		const corsHeaders = {
			'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		const { searchParams } = new URL(request.url);
		const cardID = searchParams.get('q');
		const response = await fetch(`https://api.giphy.com/v1/gifs/${cardID}?api_key=${env.API_KEY}`);
		const giphyJson = await response.json();

		return new Response(JSON.stringify(giphyJson), {
			headers: {
				'Content-Type': 'application/json',
				...corsHeaders,
			},
		});
	},
};
