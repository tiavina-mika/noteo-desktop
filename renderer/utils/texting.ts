import { APP_NAME } from "./constants";

interface ISEO {
  metaTitle: string;
  defaultMetaDescription: string;
}
export const SEO: ISEO = {
  metaTitle: APP_NAME + ' | Take a note wherever your are',
  defaultMetaDescription: 'Take a note easily',
};