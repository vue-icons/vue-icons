import { ALL_ICONS } from '@/utils/icon'
import { Context } from '@/utils/search-context'

import ActiveLink from '../active-link'
import Heading from '../heading'
import { useRoute, useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const searchPath = '/search'

export default function Sidebar() {
  const iconsList = ALL_ICONS.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
  const router = useRouter()
  const route = useRoute()
  const isOpen = ref(false)
  const inputQuery = ref(null)

  const { query, setQuery, setResults } = inject(Context)!

  const setQueryEveywhere = (query) => {
    setQuery(query) // Context
    inputQuery.value = query // State for this component
  }

  const onSearch = (e) => {
    const query = e.target.value.toLowerCase()
    router.push({ path: searchPath, query: query ? { q: query } : undefined })
    setQueryEveywhere(query)
    setResults({})
  }

  const goToSearch = () => {
    if (!route.path.includes(searchPath)) router.push(searchPath)
  }

  const onBlur = (event: any) => {
    if (event.target.value.length === 0) {
      window && window.history.back()
    }
  }

  return () => (
    <div className="sidebar pt3">
      <Heading v-model={[isOpen, 'isOpen']} />

      <div className="search p2">
        <input
          type="text"
          aria-label="search"
          className="px2 py1"
          placeholder="🔍 Search Icons"
          onFocus={goToSearch}
          onBlur={onBlur}
          onChange={onSearch}
          value={inputQuery.value !== null ? inputQuery.value : query.value}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      <ul className={`sidebar--links ${isOpen.value && 'active'}`}>
        <li>
          <ActiveLink href="/">
            <a className="rounded px2 py1">Home</a>
          </ActiveLink>
        </li>
        {iconsList.map((icon: any) => (
          <li key={icon.id}>
            <ActiveLink href={{ path: 'icons', query: { name: icon.id } }}>
              <a className="rounded px2 py1" onClick={() => setQueryEveywhere('')}>
                {icon.name}
              </a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
