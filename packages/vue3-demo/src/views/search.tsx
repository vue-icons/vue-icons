import Container from '@/components/@core/container'
import SearchPageComponent from '@/components/pages/search'
import { Context } from '@/utils/search-context'
import { defineComponent, inject } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SearchPage',
  setup() {
    const router = useRoute()
    const { q } = router.query
    const { query, setQuery } = inject(Context)!

    if (!query && q) setQuery(q as any)

    return () => (
      <Container title="🔍 Search">
        <SearchPageComponent />
      </Container>
    )
  }
})
