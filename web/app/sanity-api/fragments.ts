export const seo = `
	...,
	metaImage{
		asset->
	}
`;

export const figure = `
	...,
	image{
		asset->
	},
	caption,
	link->{
		_type,
		slug
	}
`;

export const blockContent = `
	...,
	en[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			},
		},
		_type == 'image' => {
			...,
			image{
				asset->
			},
    }
	},
	fr[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			},

		},
		_type == 'image' => {
			...,
			image{
				asset->
			},
    }
	}
`;

export const articleCard = `
	_type,
	slug,
	title,
	tag,
	chapo,
	imageCover{
		asset->
	}
`;
export const textUI = `
	_type == 'textUI' => {
		...,
		text{
			${blockContent}
		},
		backgroundImage{
			...,
			asset->
		}
	}
`;

export const imagesUI = `
	_type == 'imagesUI' => {
		...,
		items[]{
			asset->
		}
	}
`;

export const keyPointsUI = `
  _type == 'keyPointsUI' => {
    ...,
    title,
    items[] {
      _key,
			color,
      title,
      description,
      image{
				image{
					asset->
				},
				imageMobile{
					...,
					asset->
				}
      }
    }
  }
`;

export const mediaUI = `
  _type == 'mediaUI' => {
    ...,
    title,
    item[] {
      ...,
      _type == 'image' => {
        ...,
        asset->
      },
			_type == 'figure' => {
        ...,
        image{
					...,
					asset->
				},
				imageMobile{
					...,
					asset->
				}
      },
      _type == 'embed' => {
        ...,
        url
      }
    }
  }
`;

export const sliderArticlesUI = `
  _type == 'sliderArticlesUI' => {
    ...,
    title,
    items[]-> {
      ${articleCard}
    }
  }
`;

export const scrollerVideoUI = `
  _type == 'scrollerVideoUI' => {
    ...,
    title,
    items[]{
			...,
			article->{
				_type,
				slug
			},
      video{
        asset->
      }
    }
  }
`;

export const modules = `
	...,
	${textUI},
	${imagesUI},
	${keyPointsUI},
	${mediaUI},
	${sliderArticlesUI},
	${scrollerVideoUI}
`;
