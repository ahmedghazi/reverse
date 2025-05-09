import {defineField} from 'sanity'

export default defineField({
  name: 'mediaUI',
  title: 'Media UI',
  description: 'Media UI, si plusieurs médias, se transformera en slider',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'item',
      type: 'array',
      of: [{type: 'figure'}, {type: 'embed'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'item.0',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Media UI',
        media: image,
      }
    },
  },
})
