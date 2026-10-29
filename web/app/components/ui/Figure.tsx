import website from "@/app/config/website";
import { urlFor } from "@/app/sanity-api/sanity-utils";
import Image, { getImageProps } from "next/image";
import React from "react";
import { SanityImageAsset } from "sanity-codegen";

// same breakpoint as useDeviceDetect (isMobile)
const MOBILE_MEDIA = "(max-width: 1080px)";

type Props = {
  asset: SanityImageAsset | any;
  // art direction: served below MOBILE_MEDIA by the browser, no js swap (single download)
  assetMobile?: SanityImageAsset | any;
  width?: number;
  widthMobile?: number;
  alt?: string | any;
  sizes?: string;
  // above the fold (LCP): eager + high priority
  priority?: boolean;
};

const _imageProps = (asset: any, width: number) => ({
  src: urlFor(asset, width),
  width: asset?.metadata?.dimensions.width || width,
  height: asset?.metadata?.dimensions.height || width,
  style: {
    width: "100%",
    height: "auto",
    aspectRatio: `${asset?.metadata?.dimensions.width} / ${asset?.metadata?.dimensions.height}`,
    // objectFit: "cover",
  },
  blurDataURL: asset?.metadata?.lqip,
  placeholder: asset?.metadata?.lqip,
});

const Figure = ({
  asset,
  assetMobile,
  width = 1000,
  widthMobile = 1000,
  alt = website.title,
  sizes = "100vw",
  priority = false,
}: Props) => {
  const loadingProps = priority
    ? ({ loading: "eager", fetchPriority: "high" } as const)
    : {};

  if (assetMobile && asset) {
    const common = { alt: alt || "", sizes, ...loadingProps };
    const {
      props: { srcSet: srcSetMobile },
    } = getImageProps({ ...common, ..._imageProps(assetMobile, widthMobile) });
    const { props } = getImageProps({
      ...common,
      ..._imageProps(asset, width),
    });
    return (
      <figure>
        <picture>
          <source media={MOBILE_MEDIA} srcSet={srcSetMobile} sizes={sizes} />
          <img {...props} alt={props.alt} />
        </picture>
      </figure>
    );
  }

  return (
    <figure>
      <Image
        {..._imageProps(asset || assetMobile, width)}
        alt={alt || ""}
        sizes={sizes}
        {...loadingProps}
      />
    </figure>
  );
};

export default Figure;
