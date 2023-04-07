import { ref, type InjectionKey, provide, type Ref, defineComponent } from 'vue'

interface ContextType {
  query: Ref<string>
  setQuery: (query: string) => void
  results: Ref<Record<string, any>>
  setResults: (res: Record<string, any>) => void
}

export const Context = Symbol() as InjectionKey<ContextType>

export const Provider = defineComponent({
  name: 'ProviderEl',
  setup(props, { slots }) {
    const query = ref('')
    const setQuery = (_query: string) => {
      query.value = _query
    }

    const results = ref<Record<string, any>>({})
    const setResults = (_res: Record<string, any>) => {
      results.value = _res
    }

    provide(Context, {
      query,
      setQuery,
      results,
      setResults
    })

    return () => slots.default?.()
  }
})
