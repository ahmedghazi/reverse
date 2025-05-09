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
		_type == 'icon' => {
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
		_type == 'icon' => {
			...,
			image{
				asset->
			},
    }
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
        asset->
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
      _type == 'embed' => {
        ...,
        url
      }
    }
  }
`;

export const modules = `
	...,
	${textUI},
	${imagesUI},
	${keyPointsUI},
	${mediaUI}
`;
