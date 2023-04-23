import { ALL_ICONS } from '@/utils/icon'
import { Context } from '@/utils/search-context'

import ActiveLink from '../active-link'
import Heading from '../heading'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, inject, ref } from 'vue'

const searchPath = '/search'

export default defineComponent({
  name: 'SideBar',
  setup() {
    const iconsList = ALL_ICONS.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
    const router = useRouter()
    const route = useRoute()
    const isOpen = ref(false)
    const inputQuery = ref(null)

    const { query, setQuery, setResults } = inject(Context)!

    const setQueryEveywhere = (query: any) => {
      setQuery(query) // Context
      inputQuery.value = query // State for this component
    }

    const onSearch = (e: any) => {
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
      <div class="sidebar pt3">
        <Heading v-model={[isOpen.value, 'isOpen']} />

        <div class="search p2">
          <input
            type="text"
            aria-label="search"
            class="px2 py1"
            placeholder="🔍 Search Icons"
            onFocus={goToSearch}
            onBlur={onBlur}
            onChange={onSearch}
            value={inputQuery.value !== null ? inputQuery.value : query.value}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>

        <ul class={`sidebar--links ${isOpen.value && 'active'}`}>
          <li>
            <ActiveLink href={{ path: '/' }}>
              <a class="rounded px2 py1">Home</a>
            </ActiveLink>
          </li>
          {iconsList.map((icon: any) => (
            <li key={icon.id}>
              <ActiveLink href={{ path: 'icons', query: { name: icon.id } }}>
                <a class="rounded px2 py1" onClick={() => setQueryEveywhere('')}>
                  {icon.name}
                </a>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
