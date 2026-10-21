// import home from './singletons/home'
import landing from './singletons/landing'
import pageModulaire from './documents/pageModulaire'
import article from './documents/article'

import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeBlockContent from './locale/localeBlockContent'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkAnchor from './objects/linkAnchor'
import seo from './objects/seo'
import keyVal from './objects/keyVal'
import embed from './objects/embed'
import figure from './objects/figure'

import imagesUI from './objects/modules/imagesUI'
import textUI from './objects/modules/textUI'
import keyPointsUI from './objects/modules/keyPointsUI'
import keyPoint from './objects/modules/keyPoint'
import mediaUI from './objects/modules/mediaUI'
import articlesUI from './objects/modules/articlesUI'
import sliderArticlesUI from './objects/modules/sliderArticlesUI'
import scrollerVideoUI from './objects/modules/scrollerVideoUI'
import scrollerVideoItem from './objects/modules/scrollerVideoItem'

export const schemaTypes = [
  settings,
  landing,
  // home,
  pageModulaire,
  article,

  localeString,
  localeBlockContent,

  blockContent,
  linkExternal,
  linkInternal,
  linkAnchor,
  seo,
  keyVal,
  embed,
  figure,

  imagesUI,
  textUI,
  keyPointsUI,
  keyPoint,
  mediaUI,
  articlesUI,
  sliderArticlesUI,
  scrollerVideoItem,
  scrollerVideoUI,
]
export default schemaTypes
