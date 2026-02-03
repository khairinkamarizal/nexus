<script setup>
const props = defineProps({
  navigationGroups: {
    type: Array,
    required: true,
  },
  activeSection: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <aside
    class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto">
    <div class="h-full py-6 pr-6 lg:py-8">
      <div class="w-full">
        <div
          v-for="group in navigationGroups"
          :key="group.title"
          class="pb-4">
          <h4
            class="mb-1 rounded-md px-2 py-1 text-sm font-medium text-trustori-slate90 dark:text-trustori-slate20">
            {{ group.title }}
          </h4>
          <div class="grid grid-flow-row auto-rows-max text-sm">
            <a
              v-for="item in group.items"
              :key="item.id"
              :href="`#${item.id}`"
              :class="[
                'group flex w-full items-center border border-transparent px-2 py-1.5 hover:underline transition-colors',
                activeSection === item.id
                  ? 'active-nav-link text-trustori-slate90 bg-trustori-slate10/50'
                  : 'text-trustori-slate60 dark:text-trustori-slate40 hover:text-trustori-slate90 dark:hover:text-white',
              ]">
              {{ item.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style>
/* Active Sidebar Link - Updated for Evo & Dark Mode */
.active-nav-link {
  color: #0047ba; /* trustori-blue70 */
  background-color: #f2f8ff; /* trustori-blue0 */
  border-right: 3px solid #0047ba; /* trustori-blue70 */
  border-left: none;
  padding-left: 0.5rem;
  font-weight: 600;
}

.dark .active-nav-link {
  color: #5294ff; /* trustori-blue40 */
  background-color: rgba(0, 71, 186, 0.1);
  border-right: 3px solid #5294ff;
}
</style>
