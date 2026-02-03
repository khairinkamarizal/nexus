<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  navigationGroups: {
    type: Array,
    default: () => [],
  },
  activePage: {
    type: String,
    default: "components", // 'components' or 'brand'
  },
});

const isMobileMenuOpen = ref(false);
const isDark = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  }
};

onMounted(() => {
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <div>
    <!-- Header -->
    <header
      class="fixed top-0 z-50 w-full border-b border-trustori-slate20 dark:border-trustori-slate80 bg-white/95 dark:bg-[#0E0F10]/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#0E0F10]/60 transition-colors duration-300">
      <div
        class="container px-4 md:px-8 flex h-14 items-center max-w-screen-2xl mx-auto">
        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="inline-flex items-center justify-center rounded-md p-2 text-trustori-slate60 dark:text-trustori-slate40 hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 hover:text-trustori-slate90 dark:hover:text-white md:hidden mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5">
            <line
              x1="4"
              x2="20"
              y1="12"
              y2="12"></line>
            <line
              x1="4"
              x2="20"
              y1="6"
              y2="6"></line>
            <line
              x1="4"
              x2="20"
              y1="18"
              y2="18"></line>
          </svg>
        </button>

        <!-- Desktop Logo & Nav -->
        <div class="mr-4 hidden md:flex">
          <NuxtLink
            class="mr-6 flex items-center space-x-2 group"
            to="/">
            <div
              class="relative h-6 flex items-center font-bold text-lg text-trustori-blue70 dark:text-white">
              <img
                src="@/public/nexus_logo.svg"
                alt="Nexus Logo"
                class="h-6 w-auto dark:hidden" />
              <img
                src="@/public/nexus_logo_light.svg"
                alt="Nexus Logo"
                class="h-6 w-auto hidden dark:block" />
            </div>
          </NuxtLink>
          <nav class="flex items-center space-x-6 text-sm font-medium">
            <NuxtLink
              to="/"
              :class="[
                'transition-colors hover:text-trustori-slate90/80 dark:hover:text-blue-400',
                activePage === 'components'
                  ? 'text-trustori-slate90 dark:text-white font-semibold'
                  : 'text-trustori-slate60 dark:text-trustori-slate40',
              ]">
              Components
            </NuxtLink>
            <NuxtLink
              to="/identity"
              :class="[
                'transition-colors hover:text-trustori-slate90/80 dark:hover:text-blue-400',
                activePage === 'brand'
                  ? 'text-trustori-slate90 dark:text-white font-semibold'
                  : 'text-trustori-slate60 dark:text-trustori-slate40',
              ]">
              Brand
            </NuxtLink>
          </nav>
        </div>

        <!-- Mobile Logo Center -->
        <div
          class="flex md:hidden mr-auto items-center font-bold text-lg text-trustori-blue70 dark:text-white">
          <NuxtLink to="/">
            <svg
              class="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right Side Utils -->
        <div class="flex flex-1 items-center justify-end space-x-2">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="inline-flex items-center justify-center rounded-md p-2 text-trustori-slate60 dark:text-trustori-slate40 hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 transition-colors">
            <!-- Sun Icon -->
            <svg
              v-if="!isDark"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <!-- Moon Icon -->
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div
      :class="[
        'fixed inset-0 z-50 md:hidden transition-all duration-300',
        isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ]">
      <div
        @click="closeMobileMenu"
        class="absolute inset-0 bg-black/80 dark:bg-black/90 transition-opacity duration-300"
        :class="isMobileMenuOpen ? 'opacity-100' : 'opacity-0'"></div>
      <div
        class="absolute inset-y-0 left-0 h-full w-[300px] border-r border-trustori-slate20 dark:border-trustori-slate80 bg-white dark:bg-[#111] p-6 shadow-2xl overflow-y-auto transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
        :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <span class="font-medium text-trustori-slate90 dark:text-white"
              >Trustori Nexus</span
            >
            <button
              @click="closeMobileMenu"
              class="rounded-sm p-1 hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 text-trustori-slate60 dark:text-trustori-slate40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div class="flex flex-col gap-4">
            <div
              v-for="group in navigationGroups"
              :key="group.title"
              class="pb-4">
              <h4
                class="mb-2 rounded-md px-2 py-1 text-sm font-medium text-trustori-slate90 dark:text-trustori-slate20">
                {{ group.title }}
              </h4>
              <div class="flex flex-col space-y-1 text-sm">
                <a
                  v-for="item in group.items"
                  :key="item.id"
                  :href="`#${item.id}`"
                  @click="closeMobileMenu"
                  class="block rounded-md border border-transparent px-2 py-2 text-trustori-slate60 dark:text-trustori-slate40 hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 hover:text-trustori-slate90 dark:hover:text-white transition-colors">
                  {{ item.label }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
