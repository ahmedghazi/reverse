import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'sliderArticlesUI',
  title: 'Slider Article UI',
  type: 'object',
  icon: ImEmbed,
  initialValue: {
    cols: 3,
  },
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
    defineField({
      name: 'cols',
      type: 'number',
      title: 'Columns',
      description: 'Number of itemss to display',
      // validation: (Rule) => Rule.required().min(1).max(6),
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
        subtitle: 'Slider Article UI',
      }
    },
  },
})
