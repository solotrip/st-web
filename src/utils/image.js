export const SUPPORTED_SIZES = {
  '1920': 1920,
  '1080': 1080,
  '720': 720,
  '480': 480,
  '320': 320,
  '120': 120,
  'original': 'o'
}

export function getImagePath(key, size = SUPPORTED_SIZES.original, basePath = '') {
  return `https://m.pulfy.com/${size}/${basePath}${key}`
}

export function getSourceSet(
  key,
  sizes = [SUPPORTED_SIZES['720'], SUPPORTED_SIZES['1080'], SUPPORTED_SIZES.original],
  basePath = '') {
  return `${getImagePath(key, sizes[0], basePath)},
${getImagePath(key, sizes[1], basePath)} 2x,
${getImagePath(key, sizes[2], basePath)} 3x`
}
