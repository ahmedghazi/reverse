import home from './singletons/home'
import pageModulaire from './documents/pageModulaire'
import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeBlockContent from './locale/localeBlockContent'
import landing from './singletons/landing'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import seo from './objects/seo'
import keyVal from './objects/keyVal'
import embed from './objects/embed'
import figure from './objects/figure'

import imagesUI from './objects/modules/imagesUI'
import textUI from './objects/modules/textUI'
import keyPointsUI from './objects/modules/keyPointsUI'
import keyPoint from './objects/modules/keyPoint'
import mediaUI from './objects/modules/mediaUI'

export const schemaTypes = [
  settings,
  landing,
  home,
  pageModulaire,
  localeString,
  localeBlockContent,

  blockContent,
  linkExternal,
  linkInternal,
  seo,
  keyVal,
  embed,
  figure,

  imagesUI,
  textUI,
  keyPointsUI,
  keyPoint,
  mediaUI,
]
export default schemaTypes
