import { Glob } from 'bun'
import environmentVariables from "./environmentVariables"
import type { NavigationEntry } from './types'

const globForMarkdown = new Glob("**/*.md")

let navigation: Record<string, NavigationEntry> = {}

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

export const getNavigation = async () => {
  navigation = {}

  const tree = {}

  for await (const filePath of globForMarkdown.scan(environmentVariables.docsBasePath)) {
    const structure = filePath.split('/')
    let treeEntry: any = tree

    for (let i = 0; i < structure.length; i++) {
      if (Object.hasOwn(treeEntry, structure[i])) {
        if (structure[i] === 'index.md' && i > 0) {
          treeEntry[structure[i]].title = structure[i].substring(0, structure[i].length - 3)
          treeEntry[structure[i]].path = structure.slice(0, i).join('/')
        } else if (structure[i] === 'index.md') {
          treeEntry[structure[i]].title = 'Homedocs'
          treeEntry[structure[i]].path = '/'
        }
        if ((i + 1) < structure.length) {
          treeEntry = treeEntry[structure[i]].children
        }
      } else {
        let title = structure[i]
        let path: string | undefined

        if (structure[i] === 'index.md' && i > 0) {
          title = structure[i].substring(0, structure[i].length - 3)
          path = `./${structure.slice(0, i).join('/')}`
        } else if (structure[i] === 'index.md') {
          title = 'Homedocs'
          path = './'
        } else if (structure[i].endsWith('.md')) {
          title = structure[i].substring(0, structure[i].length - 3)
          path = `./${structure.slice(0, i + 1).join('/')}`
          path = path.substring(0, path.length - 3)
        }

        treeEntry[structure[i]] = {
          title,
          path,
          children: {},
        }

        if ((i + 1) < structure.length) {
          treeEntry = treeEntry[structure[i]].children
        }
      }
    }
  }

  // console.log(tree)
  console.log(JSON.stringify(tree, null, 2))
}

getNavigation()