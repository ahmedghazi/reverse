import {PiVideoThin} from 'react-icons/pi'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'scrollerVideoItem',
  title: 'Scroller Video Item',
  type: 'object',
  icon: PiVideoThin,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{type: 'article'}],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subTitle',
    },
  },
})
