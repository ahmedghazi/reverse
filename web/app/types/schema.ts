export declare type SanityReference<T> = T & {
  _ref: string;
};

export declare type SanityKeyedReference<T> = T & {
  _key: string;
  _ref: string;
};

import type {
  // SanityReference,
  // SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  // SanityReference,
  // SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Réglages (header, footer, ...)
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * Nom du site — `string`
   *
   *
   */
  siteName?: string;

  /**
   * baseline — `string`
   *
   * Visible en header et footer
   */
  baseline?: string;

  /**
   * contact — `linkExternal`
   *
   * Visible en header
   */
  contact?: LinkExternal;

  /**
   * Contacts — `array`
   *
   *
   */
  contacts?: Array<SanityKeyed<KeyVal>>;

  /**
   * textExtra — `string`
   *
   * Visible en après le logo "Reverse is part of xxx"
   */
  textExtra?: string;

  /**
   * Naviguation Primary — `array`
   *
   *
   */
  navPrimary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * Naviguation Secondary — `array`
   *
   *
   */
  navSecondary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * Message 404 — `blockContent`
   *
   *
   */
  message404?: BlockContent;

  /**
   * customCss — `text`
   *
   *
   */
  customCss?: string;
}

/**
 * Landing
 *
 *
 */
export interface Landing extends SanityDocument {
  _type: "landing";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    SanityKeyed<MediaUI> | SanityKeyed<TextUI> | SanityKeyed<KeyPointsUI>
  >;
}

/**
 * Home
 *
 *
 */
export interface Home extends SanityDocument {
  _type: "home";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Page Modulaire
 *
 *
 */
export interface PageModulaire extends SanityDocument {
  _type: "pageModulaire";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   * Le nom de la page
   */
  title?: LocaleString;

  /**
   * Soustitre — `localeString`
   *
   *
   */
  subTitle?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    SanityKeyed<MediaUI> | SanityKeyed<TextUI> | SanityKeyed<KeyPointsUI>
  >;
}

export type LocaleString = {
  _type: "localeString";
  /**
   * Français — `string`
   *
   *
   */
  fr?: string;

  /**
   * English — `string`
   *
   *
   */
  en?: string;
};

export type LocaleBlockContent = {
  _type: "localeBlockContent";
  /**
   * Français — `blockContent`
   *
   *
   */
  fr?: BlockContent;

  /**
   * English — `blockContent`
   *
   *
   */
  en?: BlockContent;
};

export type BlockContent = Array<SanityKeyed<SanityBlock>>;

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Link — `string`
   *
   *
   */
  link?: string;
};

export type LinkInternal = {
  _type: "linkInternal";
  /**
   * label — `localeString`
   *
   *
   */
  label?: LocaleString;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<PageModulaire | Home | Landing>;
};

export type Seo = {
  _type: "seo";
  /**
   * Meta title — `string`
   *
   *
   */
  metaTitle?: string;

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string;

  /**
   * Meta image — `image`
   *
   *
   */
  metaImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type KeyVal = {
  _type: "keyVal";
  /**
   * Clef — `string`
   *
   *
   */
  key?: string;

  /**
   * Valeur — `localeBlockContent`
   *
   *
   */
  val?: LocaleBlockContent;
};

export type Embed = {
  _type: "embed";
  /**
   * url — `url`
   *
   * url publique du media ex: https://www.youtube.com/watch?v=exTZ9vB6ZeE
   */
  url?: string;

  /**
   * iframe — `url`
   *
   *
   */
  iframe?: string;
};

export type Figure = {
  _type: "figure";
  /**
   * Image — `image`
   *
   * jpg, 1400px de large, 72dpi
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt Description — `string`
     *
     *
     */
    alt?: string;
  };

  /**
   * Image Mobile — `image`
   *
   * jpg, 1400px de large, 72dpi
   */
  imageMobile?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt Description — `string`
     *
     *
     */
    alt?: string;
  };
};

export type ImagesUI = {
  _type: "imagesUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;
};

export type TextUI = {
  _type: "textUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * look — `string`
   *
   *
   */
  look?: "normal" | "indentedAndAnimated";

  /**
   * Text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;
};

export type KeyPointsUI = {
  _type: "keyPointsUI";
  /**
   * Title — `string`
   *
   * Optional title for the key points section
   */
  title?: string;

  /**
   * Key Points — `array`
   *
   *
   */
  items?: Array<SanityKeyed<KeyPoint>>;
};

export type KeyPoint = {
  _type: "keyPoint";
  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Color — `string`
   *
   *
   */
  color?: "#FCEC96" | "#FBBB81" | "#ACECFF" | "#000";

  /**
   * Description — `localeBlockContent`
   *
   *
   */
  description?: LocaleBlockContent;

  /**
   * Image — `figure`
   *
   *
   */
  image?: Figure;
};

export type MediaUI = {
  _type: "mediaUI";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * item — `array`
   *
   *
   */
  item?: Array<SanityKeyed<Figure> | SanityKeyed<Embed>>;
};

export type Documents = Settings | Landing | Home | PageModulaire;
