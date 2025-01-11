const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const buildFolder = path.join(__dirname, 'build')
const publicFolder = path.join(__dirname, 'public')

// List of file extensions to check
const extensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.JPEG',
  '.gif',
  '.mp3',
  '.MP3',
  '.MP4',
  '.mp4',
  '.wav',
  '.WAV',
  '.ogg',
  '.OGG',
  '.svg',
]

// Get all files in the build folder with the specified extensions
const buildFiles = glob.sync(`**/*{${extensions.join(',')}}`, {
  cwd: buildFolder,
})

// Get all files in the public folder with the specified extensions
const publicFiles = glob.sync(`**/*{${extensions.join(',')}}`, {
  cwd: publicFolder,
})

// Function to check if a file is referenced in the build
const isFileUsed = (file) => {
  const filePath = path.join(publicFolder, file)
  const relativePath = filePath.replace(`${publicFolder}/`, '')

  // Check if the file is referenced in any build file
  return buildFiles.some((buildFile) => {
    const buildFilePath = path.join(buildFolder, buildFile)
    const content = fs.readFileSync(buildFilePath, 'utf8')
    return content.includes(relativePath)
  })
}

// Delete unused files
publicFiles.forEach((file) => {
  if (!isFileUsed(file)) {
    const filePath = path.join(publicFolder, file)
    fs.removeSync(filePath)
    console.log(`Deleted unused file: ${filePath}`)
  }
})

console.log('Cleanup completed.')
