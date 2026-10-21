import {CogIcon} from '@sanity/icons/Cog'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages (header, footer, ...)',
  type: 'document',
  icon: CogIcon,
  groups: [
    // {
    //   default: true,
    //   name: 'navigation',
    //   title: 'Navigation',
    // },
    {
      default: true,
      name: 'seo',
      title: 'Default SEO',
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
    {
      name: 'design',
      title: 'Design',
    },
  ],
  fields: [
    // defineField({
    //   name: 'seo',
    //   title: 'Defauly SEO',
    //   type: 'seo',
    //   group: 'seo',
    // }),
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'header',
    }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'localeBlockContent',
    //   description: "Visible en page d'accueil header",
    //   group: 'header',
    // }),
    // defineField({
    //   name: 'logo',
    //   title: 'Logo',
    //   type: 'image',
    //   options: {
    //     accept: 'image/svg+xml',
    //   },
    //   group: 'header',
    // }),

    defineField({
      name: 'baseline',
      type: 'string',
      description: 'Visible en header et footer',
      group: 'header',
    }),
    defineField({
      name: 'contact',
      type: 'linkExternal',
      description: 'Visible en header',
      group: 'header',
    }),
    defineField({
      name: 'navPrimary',
      title: 'Naviguation Primary',
      description: 'Nav header',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
        {
          type: 'linkAnchor',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'contacts',
      title: 'Contacts',
      type: 'array',
      of: [
        // {
        //   type: 'linkExternal',
        // },
        {
          type: 'keyVal',
        },
      ],
      group: 'footer',
    }),
    defineField({
      name: 'navTertiary',
      title: 'Naviguation Tertiary',
      description: 'Mentions légales, etc,',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'footer',
      // hidden: true,
    }),

    defineField({
      name: 'textExtra',
      type: 'string',
      description: 'Visible en après le logo "Reverse is part of xxx"',
      group: 'footer',
    }),

    defineField({
      name: 'navSecondary',
      title: 'Naviguation Secondary',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'footer',
      hidden: true,
    }),

    defineField({
      name: 'message404',
      title: 'Message 404',
      type: 'blockContent',
      group: 'misc',
    }),

    defineField({
      name: 'customCss',
      type: 'text',
      group: 'design',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Réglages (header, footer, ...)',
      }
    },
  },
})
