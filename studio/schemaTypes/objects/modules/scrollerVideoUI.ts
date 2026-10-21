import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'scrollerVideoUI',
  title: 'Scroller Video UI',
  type: 'object',
  icon: ImEmbed,

  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: "Optionnel, si renseigné s'affiche",
      // validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'scrollerVideoItem',
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Scroller Video UI',
      }
    },
  },
})
