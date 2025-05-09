import {defineField} from 'sanity'
import {BsFileRichtext} from 'react-icons/bs'

export default defineField({
  name: 'textImageUI',
  title: 'Text image UI',
  type: 'object',
  icon: BsFileRichtext,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Text image UI',
        media: image,
      }
    },
  },
})
