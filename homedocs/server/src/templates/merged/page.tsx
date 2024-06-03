import { Breadcrumb } from "../../htmlBuilder/types";

export default (
	title: string,
	content: string,
  breadcrumbs: Breadcrumb[],
) => (
  <div class="py-10 px-3 max-w-screen-xl w-full">
    <div class="text-sm breadcrumbs">
      <ul>
        {breadcrumbs.map((breadcrumb) => (
          <li>
            <div class="badge badge-outline">
              {breadcrumb.isFolder ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current"><title>Folder icon</title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              ) : ''}
              {breadcrumb.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div class="prose">
      {content}
    </div>
    <div class="divider"></div>
  </div>
)
