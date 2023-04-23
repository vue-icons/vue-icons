#!/bin/bash -eux

time (cd packages/vue-icons/ && pnpm fetch)
time (cd packages/vue-icons/ && pnpm build)
echo VERSIONS; cat packages/vue-icons/VERSIONS
(cd packages/_vue-icons_all/ && npm pack |& tail)
(cd packages/_vue-icons_all-files/ && pnpm pack |& tail)

(cd packages/vue3-demo/ && pnpm build)
