type DocProps = {
  _type: string
  slug: string
}
export const _linkResolver = (doc: DocProps): string => {
  console.log(doc)
  if (!doc || !doc.slug) return 'URL MANQUANTE'
  // let path: string = ''
  switch (doc._type) {
    case 'landing':
      return `/`

    // case 'home':
    //   return `/`

    default:
      return `/${doc.slug}`
  }
  // return path
}
