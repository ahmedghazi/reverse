import React, {JSX} from 'react'
import {ImEmbed} from 'react-icons/im'
import ReactPlayer from 'react-player'
import {defineField} from 'sanity'

type Props = {
  url: string
  iframe: string
  title: string
  aspectRatio: string
  renderDefault: Function
}

const EmbedPreview = (props: Props): JSX.Element => {
  const {url, iframe, renderDefault} = props
  // console.log({url})
  // console.log({iframe})
  const playerConfig = {
    youtube: {
      // color: 'white',
    },
    vimeo: {
      // color: 'ffffff',
    },
    spotify: {
      preferVideo: true,
    },
  }

  if (!url && !iframe) return <div>{renderDefault(props)}</div>

  // Safely render iframe HTML
  const renderIframe = () => {
    try {
      return <div dangerouslySetInnerHTML={{__html: iframe}} />
    } catch (error) {
      console.error('Invalid iframe HTML:', error)
      return (
        <div style={{color: 'red', padding: '10px'}}>
          Invalid iframe HTML. Please check your embed code.
        </div>
      )
    }
  }

  return (
    <div>
      {renderDefault({...props, title: 'Iframe Embed'})}
      {url && (
        <ReactPlayer
          config={playerConfig}
          url={url}
          style={{width: '100%', height: '100%', aspectRatio: '16/9'}}
        />
      )}
      {iframe && renderIframe()}
    </div>
  )
}

export default {
  title: 'Embed',
  name: 'embed',
  type: 'object',
  description: 'Embed url or iframe',
  icon: ImEmbed,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      description:
        'Youtube, Soundcloud, Mixcloud, Spotify, Tiktok, ...: https://www.youtube.com/watch?v=exTZ9vB6ZeE',
      // hidden: true,
    }),
    defineField({
      name: 'iframe',
      type: 'text',
      rows: 2,
      description: 'Autre provider (instagram, ...)',
    }),
  ],
  components: {
    preview: EmbedPreview, // Add custom preview component
  },
  preview: {
    select: {
      url: 'url',
      iframe: 'iframe',
    },
  },
}
// import React from 'react'
// import ReactPlayer from 'react-player'
// import {defineField} from 'sanity'
// type Props = {
//   url: string
//   iframe: string
//   renderDefault: (props: any) => React.ReactNode
// }

// const EmbedPreview = (props: Props) => {
//   const {url, iframe, renderDefault} = props

//   const playerConfig = {
//     youtube: {
//       playerVars: {
//         controls: 1,
//         disablekb: 1,
//         enablejsapi: 1,
//         iv_load_policy: 3,
//         modestbranding: 1,
//         cc_load_policy: 0,
//         showinfo: 0,
//         rel: 0,
//         // origin: 'https://studio-eker-backoffice.sanity.studio',
//       },
//       embedOptions: {
//         host: 'https://www.youtube-nocookie.com',
//       },
//     },
//   }

//   if (!url && !iframe) return <div>{renderDefault(props)}</div>

//   return (
//     <div>
//       {renderDefault({...props, title: 'Embed'})}
//       {iframe ? (
//         <div
//           dangerouslySetInnerHTML={{
//             __html: typeof iframe === 'string' ? iframe : ''
//           }}
//         />
//       ) : url ? (
//         <ReactPlayer url={url} config={playerConfig} width="100%" height="auto" />
//       ) : null}
//     </div>
//   )
// }

// export default {
//   title: 'Embed',
//   name: 'embed',
//   type: 'object',

//   fields: [
//     defineField({
//       name: 'iframe',
//       type: 'text',
//       rows: 3,
//       description: 'Code iframe du média (YouTube, Vimeo, etc.)',
//     }),
//     defineField({
//       name: 'url',
//       type: 'string',
//       description: '(Optionnel) URL publique du media ex: https://www.youtube.com/watch?v=exTZ9vB6ZeE',
//     }),
//   ],
//   components: {
//     preview: EmbedPreview, // Add custom preview component
//   },
//   preview: {
//     select: {
//       url: 'url',
//       iframe: 'iframe',
//     },
//   },
// }
