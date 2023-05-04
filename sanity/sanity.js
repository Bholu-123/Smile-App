// import SanityClientConstructor from "@sanity/client";
// import { SanityClient } from "sanity";
// import SanityClientConstructor from "@sanity/client";
// import { ImageUrlBuilder } from "sanity";
import imageUrlBuilder from '@sanity/image-url'
const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: "iw9ko2oe",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;