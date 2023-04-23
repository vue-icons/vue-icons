import { ALL_ICONS } from '@/utils/icon'
import { Context } from '@/utils/search-context'

import SearchIconSet from './search-iconset'
import { inject, defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchPageComponent',
  render() {
    const allIcons = ALL_ICONS

    const { query } = inject(Context)!

    if (query.value.length > 2) {
      const hightlightPattern = new RegExp(`(${query.value})`, 'i')
      return (
        <>
          <h2>
            Results for: <i>{query}</i>
          </h2>
          <div class="icons">
            {allIcons.map((icon: any) => (
              <SearchIconSet
                key={icon.id}
                icon={icon}
                query={query}
                highlightPattern={hightlightPattern}
              />
            ))}
          </div>
          <h3 class="no-results" />
        </>
      )
    }
    return <h2>Please enter at least 3 characters to search...</h2>
  }
})
