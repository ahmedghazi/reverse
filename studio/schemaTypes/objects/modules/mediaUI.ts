import {defineField} from 'sanity'
import {MdOutlinePermMedia} from 'react-icons/md'

export default defineField({
  name: 'mediaUI',
  title: 'Media UI',
  description: 'Media UI, si plusieurs médias, se transformera en slider',
  type: 'object',
  icon: MdOutlinePermMedia,
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
      item: 'item',
    },
    prepare(selection) {
      const {title, item} = selection
      // console.log('-------------- item')
      // console.log(item)
      return {
        title: title,
        subtitle: 'Media UI',
        media: item[0] && item[0]._type === 'figure' ? item[0].image : 'Embed',
      }
    },
  },
})
