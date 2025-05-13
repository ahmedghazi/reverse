import {defineField, defineType} from 'sanity'
import {Bs123} from 'react-icons/bs'
export default defineType({
  name: 'keyPoint',
  title: 'Key Point',
  type: 'object',
  icon: Bs123,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'Yellow', value: '#FCEC96'},
          {title: 'Orange', value: '#FBBB81'},
          {title: 'Blue', value: '#ACECFF'},
          {title: 'Black', value: '#000'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'figure',
      // options: {
      //   hotspot: true,
      // },
      // fields: [
      //   defineField({
      //     name: 'alt',
      //     type: 'string',
      //     title: 'Alternative text',
      //     description: 'Important for SEO and accessibility.',
      //   }),
      // ],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      media: 'image.image',
      subtitle: 'description.fr',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      const block = (subtitle || []).find((block: any) => block._type === 'block')
      return {
        title: title || 'Untitled',
        media,
        subtitle: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No description',
      }
    },
  },
})
