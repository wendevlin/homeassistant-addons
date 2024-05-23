import { Glob, file } from 'bun'
import { glob } from 'glob'
import { stat } from 'node:fs/promises'
import environmentVariables from "./environmentVariables"
import type { NavigationEntry } from './types'
import { parseFile } from '../markdownParser'

const globForMarkdown = new Glob("*")

const filesAndFolders = await glob(
  '*',
  {
    cwd: environmentVariables.docsBasePath,
  }
)


const generateNavForFolder = async (folder: string, pathPrefix = '') => {
  const level: NavigationEntry[] = []
  const filesAndFolders = await glob(
    '*',
    {
      cwd: folder,
    }
  )

  for (const fileOrFolder of filesAndFolders) {
    const stats = await stat(`${folder}/${fileOrFolder}`)
    if (stats.isDirectory()) {
      const children = await generateNavForFolder(`${folder}/${fileOrFolder}`, `${pathPrefix}${fileOrFolder}/`)
      if (children.length > 0) {
        const index = children.findIndex(child => child.title === 'index' && child.path !== undefined) 
        if (index > -1) {
          level.push({
            title: fileOrFolder,
            path: children[index].path,
            children: children.filter(child => child.title !== 'index'),
          })
        } else {
          level.push({
            title: fileOrFolder,
            children,
          })
        }
      }
    } else if (fileOrFolder.endsWith('.md')) {
      const { title, content } = await parseFile(`${folder}/${fileOrFolder}`, fileOrFolder)
      // TODO generate html for content and reference it
      const fileName = fileOrFolder.substring(0, fileOrFolder.length - 3)
      let path = `${pathPrefix}${fileName}`
      const mainIndex = !pathPrefix && fileOrFolder === 'index.md'
      
      if (fileName === 'index' && !pathPrefix) {
        path = ''
      } else if (fileName === 'index') {
        path = pathPrefix.substring(0, pathPrefix.length - 1)
      }
      // TODO add relative path to be used in generating navigation
      console.log(path, title)
      level.push({
        mainIndex,
        title,
        path,
        children: []
      })
    }
  }
  return level.sort((a, b) => {
    if (a.mainIndex) {
      return -1
    } else if (b.mainIndex) {
      return 1
    } else {
      return a.title.localeCompare(b.title)
    }
  }).map(({ mainIndex, children, ...rest }) => {
    if (!children?.length) {
      return rest
    } else {
      return {
        ...rest,
        children
      }
    }
  })
}

const nav = await generateNavForFolder(environmentVariables.docsBasePath)

console.log(JSON.stringify(nav, null, 2))


// let navigation: Record<string, NavigationEntry> = {}

// const generateNavigationEntry = (filePath: string, level: number = 0): NavigationEntry[] => {
//   const structure = filePath.split('/')

//   if (structure.length === level + 1) { // if we are at file level
//     let path = structure.join('/').substring(0, filePath.length - 3) // remove .md
//     let title = (structure.pop() || '?.md')
//     title = title.substring(0, title.length - 3)

//     if (title === 'index.md' && level > 0) {
//       path = structure.join('/')
//       title = structure.pop() || '?' // take parent folder name as index.md filename
//     } else if (title === 'index.md') {
//       path = '/'
//       title = 'Homedocs' // TODO take first h1 from file or from frontmatter or define main title in configs
//     }

//     if (path.endsWith('index') && level > 0) {

//     return [{
//       title,
//       path,
//       children: [], // files can also have children, if the are index.md files
//     }]
//   } else {
//     let currentLevelName = structure[0]
//     let currentLevel = 0
//     let currentLevelValue = navigation[currentLevelName]

//     if (currentLevel === level) {
//       if (!Object.hasOwn(navigation, currentLevelName)) {
//         navigation[currentLevelName] = {
//           title: currentLevelName,
//           children: []
//         }
//       }
//       navigation[currentLevelName].children.push(...generateNavigationEntry(path, level + 1))
//     } else {
//       for (let i = 1; i < level; i++) {
//         currentLevelName = structure[i]
//         currentLevel = i
//         currentLevelValue = currentLevelValue.children.[currentLevelName]
//         if () {
//           currentLevelName = structure[i]
//           currentLevelValue = navigation[currentLevelName]
//         }
//       }
//     }

//     return {
//       title: structure[structure.length - 1],
//       children: []
//     }
  
//   }
// }

// export const getNavigation = async () => {
//   navigation = {}

//   const tree = {}

//   const a = []

//   for await (const filePath of globForMarkdown.scan(environmentVariables.docsBasePath)) {
//     console.log(filePath)

//     // const structure = filePath.split('/')
//     // if (structure.length === 1) {
//     //   const name = filePath.replace('.md', '')
//     //   a.push({
//     //     name: name === 'index' ? 'Homedocs' : name,
//     //     path: name === 'index' ? '/' : `/${name}`,
//     //     children: [],
//     //   })
//     // } else {
//     //   const name = structure.pop()?.replace('.md', '') || ''
//     //   const parent = structure.join('/')
//     //   const parentIndex = a.findIndex(entry => entry.name === parent)
//     //   a[parentIndex].children.push({
//     //     name: name === 'index' ? 'Homedocs' : name,
//     //     path: name === 'index' ? `/${parent}` : `/${parent}/${name}`,
//     //     children: [],
//     //   })
//     // } 

    
//     // let treeEntry: any = tree

//     // for (let i = 0; i < structure.length; i++) {
//     //   if (Object.hasOwn(treeEntry, structure[i])) {
//     //     if (structure[i] === 'index.md' && i > 0) {
//     //       treeEntry[structure[i]].title = structure[i].substring(0, structure[i].length - 3)
//     //       treeEntry[structure[i]].path = structure.slice(0, i).join('/')
//     //     } else if (structure[i] === 'index.md') {
//     //       treeEntry[structure[i]].title = 'Homedocs'
//     //       treeEntry[structure[i]].path = '/'
//     //     }
//     //     if ((i + 1) < structure.length) {
//     //       treeEntry = treeEntry[structure[i]].children
//     //     }
//     //   } else {
//     //     let title = structure[i]
//     //     let path: string | undefined

//     //     if (structure[i] === 'index.md' && i > 0) {
//     //       title = structure[i].substring(0, structure[i].length - 3)
//     //       path = `./${structure.slice(0, i).join('/')}`
//     //     } else if (structure[i] === 'index.md') {
//     //       title = 'Homedocs'
//     //       path = './'
//     //     } else if (structure[i].endsWith('.md')) {
//     //       title = structure[i].substring(0, structure[i].length - 3)
//     //       path = `./${structure.slice(0, i + 1).join('/')}`
//     //       path = path.substring(0, path.length - 3)
//     //     }

//     //     treeEntry[structure[i]] = {
//     //       title,
//     //       path,
//     //       children: {},
//     //     }

//     //     if ((i + 1) < structure.length) {
//     //       treeEntry = treeEntry[structure[i]].children
//     //     }
//     //   }
//     // }
//   }

//   // console.log(tree)
//   // console.log(JSON.stringify(tree, null, 2))
// }

// getNavigation()