export const prerender = false;
import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../constants';
import * as contentful from "contentful";

import { getEntries, getImgs, getHeroImgId, BlogPost } from "../lib/contentful";

export async function GET(context) {
	const isPreview = context.request.url.includes('preview');

	const entries = await getEntries(isPreview, {
		content_type: "markdownPage",
	});
	const imgMap = await getImgs(isPreview);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: entries.items.map((post: contentful.Entry<BlogPost>) => ({
			title: (post.fields.title as string) ?? '',
			description: (post.fields.description as string) ?? '',
			content: (post.fields.content as string) ?? '',
			heroImage: imgMap.get(getHeroImgId(post)) ?? '',
			link: `/blog/${post.fields.slug}/`,
		})),
	});
}
