import { read } from './read';
import { validateConfigObject, Config } from './validate';

let config: Config;

declare global {
  /* eslint-disable-line no-var */ var __config__: Config;
  /* eslint-disable-line no-var */ var __tamperedConfig__: string[];
}

const reloadSettings = async () => {
  config = global.__config__ = validateConfigObject((await read()) as any);
};

config = global.__config__;

export { config, reloadSettings };
