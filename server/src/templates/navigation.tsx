import { NavigationEntry } from "../utils/types";

export const generateNavigation = (navigation: NavigationEntry[], pathPrefix: string, subpath = false) => (
<ul class={!subpath ? 'menu bg-base-200 w-56 rounded-box' : ''}>
  {navigation.map(({ title, children, path }) => (
    <li>
      {!children && <a href={`/${pathPrefix}${path}`}>{ title }</a> }
      {!!children && (
        <details open>
          <summary>
            {!path ? (
              title
            ) : (
              <a href={`/${pathPrefix}${path}`}>{ title }</a>
            )
            }
          </summary>
          {generateNavigation(children, pathPrefix, true)}
        </details>
    )}
    </li>
  ))}
</ul>
)
