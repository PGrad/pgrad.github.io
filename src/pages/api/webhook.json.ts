import { purgeCache } from "@netlify/functions";

export async function POST({ request }) {
  const body = await request.json();

  // https://developers.netlify.com/guides/how-to-do-advanced-caching-and-isr-with-astro/#how-to-revalidate-your-pages-on-demand-with-cache-tags-and-webhooks
  if (request.headers.get("X-Contentful-Webhook-Secret") !== import.meta.env.CONTENTFUL_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({
        message: "Unauthorized"
    }), { status: 401 });
  }

  // Refresh specific pages on publish, but all refresh
  // the entire collection on delete, new items etc.
  await purgeCache({ tags: [body.sys.id, "markdownPage"] });

  return new Response(JSON.stringify({
    message: `Revalidated entry with id ${body.sys.id}`,
  }), { status: 200 });
}