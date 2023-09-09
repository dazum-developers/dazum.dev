import sharedConfig from '@dazum/config/tailwind-preset'
// tailwind config is required for editor support
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'presets'> = {
  presets: [sharedConfig],
}

export default config
