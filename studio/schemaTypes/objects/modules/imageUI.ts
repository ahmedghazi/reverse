import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'

export default defineField({
  name: 'moduleImage',
  title: 'Image',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'image',
      type: 'figure',
    }),
    // defineField({
    //   name: 'image',
    //   type: 'image',
    //   title: 'Image',
    //   description: 'jpg, 1400px de large, 72dpi',
    //   options: {
    //     hotspot: true,
    //   },
    //   fields: [
    //     // {name: 'title', title: 'Title', type: 'string'},
    //     {name: 'alt', title: 'Alt Description', type: 'string'},
    //     // {name: 'attribution', title: 'Attribution', type: 'string'}
    //   ],
    // }),
  ],

  preview: {
    select: {
      image: 'image',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Image',
        media: image,
      }
    },
  },
})
