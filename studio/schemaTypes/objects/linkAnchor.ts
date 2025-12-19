import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  title: 'Link Anchor',
  name: 'linkAnchor',
  type: 'object',
  description: 'Liens ancre qui permet de scroller vers une section',
  preview: {
    select: {
      label: `label.${baseLanguage}`,
    },
    prepare(selection) {
      const {label} = selection
      return {
        title: label,
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
    }),
    defineField({
      name: 'link',
      title: 'Ancre',
      description: "ID de l'élément à cibler (sans le #)",
      type: 'string',
    }),
  ],
})
