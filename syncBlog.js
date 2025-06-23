import fs from 'fs'
import { spawn } from 'node:child_process'

const REPO_URL = 'https://github.com/chanshiyucx/blog.git'
const CONTENT_PATH = './public/blog'

const runBashCommand = (command) =>
  new Promise((resolve, reject) => {
    console.log(`Run bash command: ${command}`)
    const child = spawn(command, [], { shell: true })
    child.stdout.setEncoding('utf8')
    child.stdout.on('data', (data) => process.stdout.write(data))
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (data) => process.stderr.write(data))
    child.on('close', function (code) {
      if (code === 0) {
        resolve(void 0)
      } else {
        reject(new Error(`Command failed with exit code ${code}`))
      }
    })
  })

const syncContentFromGit = async (repoUrl, contentPath) => {
  console.log('Syncing content files from git')
  if (fs.existsSync(contentPath)) {
    await runBashCommand(`cd ${contentPath} && git pull`)
  } else {
    await runBashCommand(
      `git clone --depth 1 --single-branch ${repoUrl} ${contentPath}`,
    )
  }
}

syncContentFromGit(REPO_URL, CONTENT_PATH)
