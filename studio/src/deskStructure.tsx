// import {BiDockTop, BiDockBottom} from 'react-icons/bi'
// import {ControlsIcon} from '@sanity/icons'
// import {ListItemBuilder, StructureResolver} from 'sanity/desk'
// import {SEOPane} from 'sanity-plugin-seo-pane'
// import {resolveProductionUrl} from './actions/resolveProductionUrl'
// import SeoPreview from './previews/seo/index'
// const remoteURL = 'https://buildingbooks.gtsb.io'
// const localURL = 'http://localhost:8000'
// const previewURL = window.location.hostname === 'localhost' ? localURL + '' : remoteURL + ''

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    // 'home',
    'landing',
    'pageModulaire',
    'article',
    'media.tag',
    'lieu',
    'studio',
    'tag',
    'event',
    'location',
    'savoirFaire',
    // 'project',
    'settings',
    'infos',
  ].includes(id)
}

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Réglages (header, footer, ...)')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Réglages (header, footer, ...)')
            .schemaType('settings')
            .documentId('settings'),
        ),
      S.divider(),

      S.listItem()
        .title('Landing')
        .schemaType('landing')
        .child(S.editor().title('Landing').schemaType('landing').documentId('landing')),

      S.divider(),

      S.listItem()
        .title('Pages')
        .schemaType('pageModulaire')
        .child(S.documentTypeList('pageModulaire')),
      S.divider(),

      S.listItem().title('Articles').schemaType('article').child(S.documentTypeList('article')),

      // S.divider(),

      // S.listItem().title('Lieux').schemaType('location').child(S.documentTypeList('location')),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
