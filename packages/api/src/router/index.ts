import { readdir } from 'node:fs/promises'

export async function getRouter() {
  const modules = `${process.cwd()}/src/core/modules`
  const files = await readdir(modules, { encoding: 'utf8', recursive: true })
  const result = []

  for (const file of files.filter(f => f.endsWith('/index.ts'))) {
    const mod = await import(`${modules}/${file}`)
    result.push(...mod.default)
  }

  return result
}
