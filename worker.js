export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve the HTML page with the API key injected
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const html = await env.ASSETS.fetch(request);
      const text = await html.text();

      // Replace placeholder with real key from environment secret
      const injected = text.replace(/__ANTHROPIC_API_KEY__/g, env.ANTHROPIC_API_KEY);

      return new Response(injected, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-store'
        }
      });
    }

    // Serve all other assets normally
    return env.ASSETS.fetch(request);
  }
};
