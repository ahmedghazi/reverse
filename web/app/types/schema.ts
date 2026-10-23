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
   * Naviguation Primary — `array`
   *
   * Nav header
   */
  navPrimary?: Array<
    | SanityKeyed<LinkInternal>
    | SanityKeyed<LinkExternal>
    | SanityKeyed<LinkAnchor>
  >;

  /**
   * Contacts — `array`
   *
   *
   */
  contacts?: Array<SanityKeyed<KeyVal>>;

  /**
   * Naviguation Tertiary — `array`
   *
   * Mentions légales, etc,
   */
  navTertiary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * textExtra — `string`
   *
   * Visible en après le logo "Reverse is part of xxx"
   */
  textExtra?: string;

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
   * Layout dark — `boolean`
   *
   * Passer l'UI en blanc
   */
  layoutDark?: boolean;

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
    | SanityKeyed<MediaUI>
    | SanityKeyed<TextUI>
    | SanityKeyed<KeyPointsUI>
    | SanityKeyed<SliderArticlesUI>
    | SanityKeyed<ScrollerVideoUI>
  >;
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
   * Layout dark — `boolean`
   *
   * Passer l'UI en blanc
   */
  layoutDark?: boolean;

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
    | SanityKeyed<MediaUI>
    | SanityKeyed<TextUI>
    | SanityKeyed<KeyPointsUI>
    | SanityKeyed<SliderArticlesUI>
    | SanityKeyed<ScrollerVideoUI>
  >;
}

/**
 * Article
 *
 *
 */
export interface Article extends SanityDocument {
  _type: "article";

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
   * Tag — `string`
   *
   *
   */
  tag?: string;

  /**
   * Image clef — `image`
   *
   * Visible on liste pages, project cards (largeur 1400px)
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Chapo — `localeString`
   *
   *
   */
  chapo?: LocaleString;

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * Article liés — `array`
   *
   *
   */
  related?: Array<SanityKeyedReference<Article>>;
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

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyed<Embed>
>;

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
  link?: SanityReference<PageModulaire | Landing>;
};

export type LinkAnchor = {
  _type: "linkAnchor";
  /**
   * Label — `localeString`
   *
   *
   */
  label?: LocaleString;

  /**
   * Ancre — `string`
   *
   * ID de l'élément à cibler (sans le #)
   */
  link?: string;
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
   * Youtube, Soundcloud, Mixcloud, Spotify, Tiktok, ...: https://www.youtube.com/watch?v=exTZ9vB6ZeE
   */
  url?: string;

  /**
   * iframe — `text`
   *
   * Autre provider (instagram, ...)
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

export type ArticlesUI = {
  _type: "articlesUI";
  /**
   * title — `localeString`
   *
   * Title
   */
  title?: LocaleString;

  /**
   * Items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Article>>;
};

export type SliderArticlesUI = {
  _type: "sliderArticlesUI";
  /**
   * title — `localeString`
   *
   * Optionnel, si renseigné s'affiche
   */
  title?: LocaleString;

  /**
   * layout — `string`
   *
   * type d'affichage, slider ou mosaic grille
   */
  layout?: "isSlider" | "isGrid";

  /**
   * Items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Article>>;

  /**
   * Columns — `number`
   *
   * Number of itemss to display
   */
  cols?: number;
};

export type ScrollerVideoItem = {
  _type: "scrollerVideoItem";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Subtitle — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * Article — `reference`
   *
   *
   */
  article?: SanityReference<Article>;

  /**
   * Video — `mux.video`
   *
   *
   */
  video?: MuxVideo;
};

export type ScrollerVideoUI = {
  _type: "scrollerVideoUI";
  /**
   * title — `localeString`
   *
   * Optionnel, si renseigné s'affiche
   */
  title?: LocaleString;

  /**
   * Items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<ScrollerVideoItem>>;
};

export type Documents = Settings | Landing | PageModulaire | Article;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type MuxVideo = any;
