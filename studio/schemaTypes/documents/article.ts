import {defineField, defineArrayMember, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'
import modulesList from '../objects/modules/modulesList'
import {baseLanguage} from '../locale/supportedLanguages'
import {IoNewspaperOutline} from 'react-icons/io5'

export default defineType({
  type: 'document',
  name: 'article',
  title: 'Article',
  icon: IoNewspaperOutline,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Titre',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL basée sur le titre (sans espace ni caractère autre que a-z-0-9',
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'tag',
      type: 'string',
      title: 'Tag',
      group: 'editorial',
    }),

    defineField({
      name: 'imageCover',
      type: 'image',
      title: 'Image clef',
      description: 'Visible on liste pages, project cards (largeur 1400px)',
      group: 'editorial',
    }),

    defineField({
      name: 'chapo',
      title: 'Chapo',
      type: 'localeString',
      group: 'editorial',
    }),

    defineField({
      name: 'text',
      title: 'Texte',
      type: 'localeBlockContent',
      group: 'editorial',
    }),

    defineField({
      name: 'related',
      title: 'Article liés',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
      slug: 'slug',
      image: 'imageCover',
    },
    prepare(selection) {
      const {title, slug, image} = selection
      // console.log(images)
      return {
        title: title,
        subtitle: `/project/${slug.current}`,
        media: image,
      }
    },
  },
})
