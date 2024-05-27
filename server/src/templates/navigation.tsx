import { NavigationEntry } from "../utils/types";

const subNavigation = (navigation: NavigationEntry[], pathPrefix: string, active: NavigationEntry) => (
  <>
    {navigation.map(({ title, children, path }) => (
      <li>
        {path === undefined ? (<span class="hover:bg-base-200 hover:cursor-default">{title}</span>) : (<a class={[title === active.title && path === active.path ? 'bg-primary text-white' : '']} href={`${pathPrefix}${path}`}>{ title }</a>)}
        {!!children ? (
          <ul>
              {subNavigation(children, pathPrefix, active)}
          </ul>
      ) : ''}
      </li>
    ))}
  </>
)

export const generateNavigation = (navigation: NavigationEntry[], pathPrefix: string, active: NavigationEntry) => (
<ul class="menu w-56 rounded-box">
  {subNavigation(navigation, pathPrefix, active)}
</ul>
)