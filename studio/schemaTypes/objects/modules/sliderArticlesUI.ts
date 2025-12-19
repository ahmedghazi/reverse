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
    layout: 'isSlider',
  },
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: "Optionnel, si renseigné s'affiche",
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      type: 'string',
      description: "type d'affichage, slider ou mosaic grille",
      options: {
        list: [
          {title: 'Slider', value: 'isSlider'},
          {title: 'Grid', value: 'isGrid'},
        ],
      },
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
