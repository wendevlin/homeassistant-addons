import { $ } from "bun";
import layout from "./templates/layout"
import { generateNavigation } from "./templates/navigation"
import environmentVariables from "./utils/environmentVariables"
import { generateNavForFolder } from "./utils/navigation"
import { NavigationEntry } from "./utils/types";

const buildHtml = async (navigationEntry: NavigationEntry, fullNavigationStructure: NavigationEntry[]) => {
  const html = layout(
    navigationEntry.title,
    navigationEntry.htmlContent!,
    generateNavigation(fullNavigationStructure, navigationEntry.pathPrefix!, navigationEntry),
    navigationEntry.pathPrefix!,
  ).toString()
  const fileName = `./dist/docs/${navigationEntry.path || 'index'}.html`
  await Bun.write(
    fileName,
    html,
  )
  console.log(`Built ${fileName}`)
}

const buildLevel = async (navigationStructure: NavigationEntry[], fullNavigationStructure: NavigationEntry[]) => {
  for (const navigationEntry of navigationStructure) {
    if (typeof navigationEntry.htmlContent === 'string') {
      await buildHtml(navigationEntry, fullNavigationStructure)
    }
    
    if (navigationEntry.children) {
      await buildLevel(navigationEntry.children, fullNavigationStructure)
    }
  }
}

export const buildDocs = async () => {
  const navigationStructure = await generateNavForFolder(environmentVariables.docsBasePath)

  // remove old files
  await $`rm -rf ./dist/docs`.quiet()

  await buildLevel(navigationStructure, navigationStructure)
}