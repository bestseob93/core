// TODO: support rspack
export const FEDERATION_SUPPORTED_TYPES_CJS = 'cjs:webpack';
export const FEDERATION_SUPPORTED_TYPES_CJS_MAP = {
  [FEDERATION_SUPPORTED_TYPES_CJS]: 'commonjs-module',
};

export const FEDERATION_SUPPORTED_TYPES = [
  'script',
  FEDERATION_SUPPORTED_TYPES_CJS,
];

export { ENCODE_NAME_PREFIX } from '@module-federation/sdk';
