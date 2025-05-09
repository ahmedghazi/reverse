import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {presentationTool} from 'sanity/presentation'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {linkResolver} from './src/linkResolverPreview'

const devOnlyPlugins = [getStartedPlugin()]
const remoteURL = 'https://www.reverse.paris'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export default defineConfig({
  name: 'default',
  title: 'Reverse LP',

  projectId: 'gk4akhok',
  dataset: 'production',

  // plugins: [structureTool({structure}), visionTool(), ...(isDev ? devOnlyPlugins : []), media()],
  plugins: [
    structureTool({structure}),
    visionTool(),
    ...(isDev ? devOnlyPlugins : []),
    media(),
    presentationTool({
      resolve: linkResolver,
      previewUrl: {
        origin: previewURL,
        previewMode: {
          enable: '/api/preview',
          disable: '/api/exit-preview',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // productionUrl: resolveProductionUrl,
    actions: [resolveProductionUrl],
  },
})
