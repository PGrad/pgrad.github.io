import * as contentful from "contentful";
import type { EntryFieldTypes } from "contentful";

export interface BlogPost {
  contentTypeId: "markdownPage",
  fields: {
	  slug: EntryFieldTypes.Text,
    title: EntryFieldTypes.Text,
    description: EntryFieldTypes.Text,
    heroImage: EntryFieldTypes.AssetLink,
    content: EntryFieldTypes.Text
  },
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export async function getEntries(): Promise<contentful.EntryCollection<BlogPost>> {
    const entries = await contentfulClient.getEntries<BlogPost>({
        content_type: "markdownPage",
    });

    return entries;
}

export async function getImgs(): Promise<Map<string, string>> {
    const imgs = await contentfulClient.getAssets();

    const imgMap: Map<string, string> = new Map([
        ...imgs.items.map((img) => [img.sys.id, img.fields?.file?.url ?? ''] as const),
    ]);

    return imgMap;
}

export function getHeroImgId(post: contentful.Entry<BlogPost>): string {
    return (post.fields.heroImage as contentful.Asset)?.sys.id ?? '';
}