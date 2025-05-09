import {defineField} from 'sanity'
import {BiImages} from 'react-icons/bi'

export default defineField({
  name: 'imagesUI',
  title: 'Image(s)',
  type: 'object',
  icon: BiImages,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    }),
  ],

  preview: {
    select: {
      image: 'items.0',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Image(s) UI',
        media: image,
      }
    },
  },
})
