import { NavigationEntry } from "../utils/types";

const subNavigation = (navigation: NavigationEntry[], pathPrefix: string, active: NavigationEntry) => (
  <>
    {navigation.map(({ title, children, path }) => (
      <li>
        {path === undefined ? (
          <span class="hover:bg-nav dark:hover:bg-nav-dark hover:cursor-default">
            <svg class="w-4 -ml-1 -mr-1" aria-hidden="true" viewBox="-43.52 -43.52 599.04 599.04"><path d="M464 128H272l-54.63-54.63c-6-6-14.14-9.37-22.63-9.37H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm0 272H48V112h140.12l54.63 54.63c6 6 14.14 9.37 22.63 9.37H464v224z"></path></svg>
            {title}
          </span>
        ) : (
          <a
            class={[title === active.title && path === active.path ? 'bg-active dark:bg-active-dark text-white dark:text-black hover:bg-active dark:hover:bg-active-dark' : '']}
            href={`${pathPrefix}${path}`}>
              { title }
            </a>
        )}
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
<ul class="menu w-64 bg-nav dark:bg-nav-dark h-full py-5 pr-5 flex-nowrap overflow-auto">
  {subNavigation(navigation, pathPrefix, active)}
</ul>
)