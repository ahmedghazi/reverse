import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gk4akhok',
    dataset: 'production',
  },
  studioHost: 'backoffice--reverse',

  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    appId: 'ea06pm2cz0bts316ee7gspfd',
  },
  autoUpdates: true,
})
