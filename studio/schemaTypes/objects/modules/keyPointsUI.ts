import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'keyPointsUI',
  title: 'Key Points',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the key points section',
    }),
    defineField({
      name: 'items',
      title: 'Key Points',
      type: 'array',
      of: [
        {
          type: 'keyPoint',
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare(selection) {
      const {title, items} = selection
      return {
        title: title || 'Key Points',
        subtitle: items
          ? `${items.length} key point${items.length === 1 ? '' : 's'}`
          : 'No key points',
      }
    },
  },
})
