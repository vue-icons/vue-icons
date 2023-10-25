#!/bin/bash -eux

time (cd packages/vue-icons/ && pnpm run fetch)
time (cd packages/vue-icons/ && pnpm run build)
echo VERSIONS; cat packages/vue-icons/VERSIONS
(cd packages/_vue-icons_all/ && pnpm pack |& tail)
(cd packages/_vue-icons_all-files/ && pnpm pack |& tail)

(cd packages/vue3-demo/ && pnpm run build)
