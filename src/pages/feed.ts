export async function GET(context) {
    const { site, url } = context;

    return context.rewrite(new Request(`${site}rss.xml`, {
        headers: {
            'Content-Type': 'application/rss+xml',
        },
    }));
}