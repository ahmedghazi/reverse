import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'articlesUI',
  title: 'Article UI',
  type: 'object',
  icon: ImEmbed,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
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
        subtitle: 'Article UI',
      }
    },
  },
})
