import sharp from 'sharp'
import { readdir, rename } from 'fs/promises'
import { join } from 'path'

const folders = [
  'public/styling-kart',
  'public/look-book',
  'public/elbise-projesi',
  'public/brand-projesi',
  'public'
]

for (const folder of folders) {
  const files = await readdir(folder).catch(() => [])
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue
    const filePath = join(folder, file)
    const tempPath = filePath + '.tmp'

    await sharp(filePath)
      .jpeg({ quality: 75 })
      .toFile(tempPath)

    await rename(tempPath, filePath)
    console.log(`✅ Compressed: ${filePath}`)
  }
}

console.log('🎉 All images compressed!')