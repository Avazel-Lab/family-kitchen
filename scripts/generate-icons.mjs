import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const standardSvg = await readFile(new URL('../public/icon.svg', import.meta.url))
const maskableSvg = await readFile(new URL('../public/icon-maskable.svg', import.meta.url))

async function render(svg, size, filename) {
  const png = await sharp(svg).resize(size, size).png().toBuffer()
  await writeFile(new URL(`../public/${filename}`, import.meta.url), png)
}

await Promise.all([
  render(standardSvg, 192, 'icon-192.png'),
  render(standardSvg, 512, 'icon-512.png'),
  render(maskableSvg, 512, 'icon-maskable-512.png')
])
