<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import useScrollSpy from "@/composables/useScrollSpy";

// --- Head Configuration ---
useHead({
  title: "Design System",
});

// --- Data ---
const navigationGroups = [
  {
    title: "Foundation",
    items: [
      { id: "colors", label: "Color System" },
      { id: "typography", label: "Typography" },
      { id: "responsive", label: "Responsive Grid" },
      { id: "grid", label: "Grid & Dimensions" },
      { id: "motion", label: "Motion & Depth" },
      { id: "iconography", label: "Iconography" },
      { id: "accessibility", label: "Accessibility" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "buttons", label: "Button System" },
      { id: "data-inputs", label: "Inputs & Forms" },
      { id: "nav-structures", label: "Tabs & Nav" },
      { id: "nav-plus", label: "Navigation Patterns" },
      { id: "feedback", label: "Modals & Feedback" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { id: "cards", label: "Card Patterns" },
      { id: "data-display", label: "Data Display" },
      { id: "tables", label: "Data Tables" },
    ],
  },
];

const colors = {
  blue: [
    { name: "Cobalt Blue 100", hex: "#001438", bg: "bg-trustori-blue100" },
    { name: "Cobalt Blue 90", hex: "#002563", bg: "bg-trustori-blue90" },
    { name: "Cobalt Blue 80", hex: "#00368F", bg: "bg-trustori-blue80" },
    { name: "Cobalt Blue 70", hex: "#0047BA", bg: "bg-trustori-blue70" },
    { name: "Cobalt Blue 60", hex: "#1662CD", bg: "bg-trustori-blue60" },
    { name: "Cobalt Blue 50", hex: "#2A7DE1", bg: "bg-trustori-blue50" },
    { name: "Cobalt Blue 40", hex: "#5294FF", bg: "bg-trustori-blue40" },
    { name: "Cobalt Blue 30", hex: "#7FB0FF", bg: "bg-trustori-blue30" },
    { name: "Cobalt Blue 20", hex: "#ADCCFF", bg: "bg-trustori-blue20" },
    { name: "Cobalt Blue 10", hex: "#D9E9FF", bg: "bg-trustori-blue10" },
    { name: "Cobalt Blue 0", hex: "#F2F8FF", bg: "bg-trustori-blue0" },
  ],
  slate: [
    { name: "Neutral 100", hex: "#0E0F10", bg: "bg-trustori-slate100" },
    { name: "Neutral 90", hex: "#24272A", bg: "bg-trustori-slate90" },
    { name: "Neutral 80", hex: "#40464C", bg: "bg-trustori-slate80" },
    { name: "Neutral 70", hex: "#5D666E", bg: "bg-trustori-slate70" },
    { name: "Neutral 60", hex: "#7A848D", bg: "bg-trustori-slate60" },
    { name: "Neutral 50", hex: "#97A1AB", bg: "bg-trustori-slate50" },
    { name: "Neutral 40", hex: "#B3BCC4", bg: "bg-trustori-slate40" },
    { name: "Neutral 30", hex: "#CDD3D9", bg: "bg-trustori-slate30" },
    { name: "Neutral 20", hex: "#E1E5E9", bg: "bg-trustori-slate20" },
    { name: "Neutral 10", hex: "#F0F2F5", bg: "bg-trustori-slate10" },
    { name: "Neutral 0", hex: "#F9FAFB", bg: "bg-trustori-slate0" },
  ],
  orange: [
    {
      name: "Tangerine Orange 100",
      hex: "#3D0D00",
      bg: "bg-trustori-orange100",
    },
    { name: "Tangerine Orange 90", hex: "#611900", bg: "bg-trustori-orange90" },
    { name: "Tangerine Orange 80", hex: "#872600", bg: "bg-trustori-orange80" },
    { name: "Tangerine Orange 70", hex: "#B03805", bg: "bg-trustori-orange70" },
    { name: "Tangerine Orange 60", hex: "#D94F11", bg: "bg-trustori-orange60" },
    { name: "Tangerine Orange 50", hex: "#FF671D", bg: "bg-trustori-orange50" },
    { name: "Tangerine Orange 40", hex: "#FF9057", bg: "bg-trustori-orange40" },
    { name: "Tangerine Orange 30", hex: "#FFB68C", bg: "bg-trustori-orange30" },
    { name: "Tangerine Orange 20", hex: "#FFD3B5", bg: "bg-trustori-orange20" },
    { name: "Tangerine Orange 10", hex: "#FFEBD9", bg: "bg-trustori-orange10" },
    { name: "Tangerine Orange 0", hex: "#FFF9F5", bg: "bg-trustori-orange0" },
  ],
};

const typoSpecs = [
  { prop: "H1 Display", d: "72px / 1.1", t: "60px", p: "48px" },
  { prop: "H2 Section", d: "48px / 1.2", t: "36px", p: "30px" },
  { prop: "Body Base", d: "16px / 1.6", t: "16px", p: "14px" },
  { prop: "Caption", d: "12px / 1.4", t: "12px", p: "11px" },
];

// --- State ---
const { activeSection } = useScrollSpy(navigationGroups);
const currentView = ref("desktop"); // 'desktop', 'tablet', 'mobile'

// --- Methods ---

const toggleTheme = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }
};

const setView = (view) => {
  currentView.value = view;
};

// Hex to CMYK Converter
const getCMYK = (hex) => {
  let c = 0,
    m = 0,
    y = 0,
    k = 0;
  hex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;

  if (hex.length != 6) {
    return "CMYK: 0, 0, 0, 100";
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Black
  if (r == 0 && g == 0 && b == 0) {
    return "CMYK: 0, 0, 0, 100";
  }

  r = r / 255;
  g = g / 255;
  b = b / 255;

  k = 1 - Math.max(r, g, b);
  c = (1 - r - k) / (1 - k);
  m = (1 - g - k) / (1 - k);
  y = (1 - b - k) / (1 - k);

  return `CMYK: ${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)}`;
};

const copyColor = (text, event) => {
  // Simple clipboard logic
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Visual feedback handled by adding temporary class or alert if needed
      // For this implementation, we'll just log it or add a small visual cue logic if desired
      // The original code used direct DOM manipulation on the element.
      const el = event.currentTarget.querySelector(".hex-label");
      if (el) {
        const original = el.innerText;
        el.innerText = "Copied!";
        el.classList.add("text-green-500");
        setTimeout(() => {
          el.innerText = original;
          el.classList.remove("text-green-500");
        }, 1500);
      }
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

// --- Lifecycle ---
onMounted(() => {
  // Theme check
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <div
    class="bg-[#F9FAFB] dark:bg-[#0E0F10] font-sans text-trustori-slate90 dark:text-trustori-slate10 selection:bg-trustori-blue10 dark:selection:bg-trustori-blue90 selection:text-trustori-blue90 dark:selection:text-white flex flex-col min-h-screen transition-colors duration-300">
    <TheHeader
      :navigation-groups="navigationGroups"
      active-page="components" />

    <div
      class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 max-w-screen-2xl mx-auto px-4 md:px-8">
      <!-- Sidebar -->
      <TheSidebar
        :navigation-groups="navigationGroups"
        :active-section="activeSection" />

      <main
        class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div
          class="mx-auto w-full min-w-0 flex flex-col divide-y divide-trustori-slate20 dark:divide-trustori-slate80 pb-32">
          <div class="space-y-2 pt-14 pb-16 fade-in-section">
            <h1
              class="text-4xl font-medium tracking-tight text-trustori-slate90 lg:text-5xl">
              Trustori Nexus
            </h1>
            <p class="text-lg text-trustori-slate60">
              The unified design language and component library for Trustori
              Enterprise interfaces.
            </p>
          </div>

          <section
            id="colors"
            class="space-y-12 scroll-m-24 fade-in-section min-h-screen py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Color System
            </h2>

            <div class="flex flex-col gap-8">
              <!-- Primary Blue Scale (Feature) -->
              <div>
                <h3
                  class="text-lg font-normal text-trustori-slate60 dark:text-trustori-slate40 mb-6">
                  Cobalt Blue
                </h3>
                <div
                  class="grid grid-cols-2 sm:grid-cols-6 gap-8"
                  id="colors-blue">
                  <div
                    v-for="color in colors.blue"
                    :key="color.hex"
                    class="group relative flex flex-col rounded-xl hover:-translate-y-1 transition-all cursor-pointer"
                    @click="copyColor(color.hex, $event)">
                    <div
                      :class="[
                        'h-24 w-full rounded-lg mb-3 shadow-inner transition-transform group-hover:scale-[1.05]',
                        color.bg,
                      ]"></div>
                    <div class="flex items-center justify-between gap-1">
                      <span
                        class="text-sm font-medium text-trustori-slate90 dark:text-white truncate"
                        >{{ color.name }}</span
                      >
                      <svg
                        class="w-4 h-4 text-trustori-slate40 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                    </div>
                    <span
                      class="text-xs font-mono text-trustori-slate50 dark:text-trustori-slate40 mt-0.5 block hex-label"
                      >{{ color.hex }}</span
                    >
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-normal text-trustori-slate60 dark:text-trustori-slate40 mb-6">
                  Neutral
                </h3>
                <div
                  class="grid grid-cols-2 sm:grid-cols-6 gap-8"
                  id="colors-slate">
                  <div
                    v-for="color in colors.slate"
                    :key="color.hex"
                    class="group relative flex flex-col rounded-xl hover:-translate-y-1 transition-all cursor-pointer"
                    @click="copyColor(color.hex, $event)">
                    <div
                      :class="[
                        'h-24 w-full rounded-lg mb-3 shadow-inner transition-transform group-hover:scale-[1.05]',
                        color.bg,
                      ]"></div>
                    <div class="flex items-center justify-between gap-1">
                      <span
                        class="text-sm font-medium text-trustori-slate90 dark:text-white truncate"
                        >{{ color.name }}</span
                      >
                      <svg
                        class="w-4 h-4 text-trustori-slate40 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                    </div>
                    <span
                      class="text-xs font-mono text-trustori-slate50 dark:text-trustori-slate40 mt-0.5 block hex-label"
                      >{{ color.hex }}</span
                    >
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-normal text-trustori-slate60 dark:text-trustori-slate40 mb-6">
                  Tangerine Orange
                </h3>
                <div
                  class="grid grid-cols-2 sm:grid-cols-6 gap-8"
                  id="colors-orange">
                  <div
                    v-for="color in colors.orange"
                    :key="color.hex"
                    class="group relative flex flex-col rounded-xl hover:-translate-y-1 transition-all cursor-pointer"
                    @click="copyColor(color.hex, $event)">
                    <div
                      :class="[
                        'h-24 w-full rounded-lg mb-3 shadow-inner transition-transform group-hover:scale-[1.05]',
                        color.bg,
                      ]"></div>
                    <div class="flex items-center justify-between gap-1">
                      <span
                        class="text-sm font-medium text-trustori-slate90 dark:text-white truncate"
                        >{{ color.name }}</span
                      >
                      <svg
                        class="w-4 h-4 text-trustori-slate40 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                    </div>
                    <span
                      class="text-xs font-mono text-trustori-slate50 dark:text-trustori-slate40 mt-0.5 block hex-label"
                      >{{ color.hex }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="typography"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div class="flex items-end justify-between mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Typography
              </h2>
              <span
                class="text-sm font-mono text-trustori-slate50 dark:text-trustori-slate40"
                >Hanken Grotesk</span
              >
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Hero Spec -->
              <div
                class="lg:col-span-2 bg-trustori-slate90 dark:bg-black rounded-2xl p-8 md:p-12 text-white bento-card relative overflow-hidden flex flex-col justify-center">
                <div class="absolute top-0 right-0 p-4 opacity-20">
                  <svg
                    class="w-32 h-32"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M5 4h14v2H13v14h-2V6H5V4z" />
                  </svg>
                </div>
                <span class="text-trustori-slate40 text-sm font-mono mb-2"
                  >Display H1</span
                >
                <h1
                  class="text-5xl md:text-7xl font-medium tracking-tighter mb-4 text-white">
                  Trusted Custodian
                </h1>
                <p class="text-trustori-slate40 max-w-lg">
                  The primary typeface is Hanken Grotesk. It conveys modernism,
                  clarity, and trust. Use it for impactful headlines.
                </p>
              </div>

              <!-- Scale Table -->
              <div
                class="bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl p-0 overflow-hidden bento-card">
                <div
                  class="p-6 border-b border-trustori-slate10 dark:border-trustori-slate80 bg-trustori-slate0 dark:bg-[#16181A]">
                  <h3 class="font-medium text-trustori-slate90 dark:text-white">
                    Type Scale
                  </h3>
                </div>
                <div
                  class="divide-y divide-trustori-slate10 dark:divide-trustori-slate80"
                  id="typo-specs">
                  <div
                    v-for="spec in typoSpecs"
                    :key="spec.prop"
                    class="p-4 hover:bg-trustori-slate0 dark:hover:bg-white/5 transition-colors group">
                    <div class="flex items-center justify-between">
                      <div class="flex flex-col">
                        <span
                          class="text-[10px] font-medium text-trustori-blue70 dark:text-trustori-blue40 uppercase tracking-wider"
                          >{{ spec.prop }}</span
                        >
                        <span
                          class="text-xl font-medium text-trustori-slate90 dark:text-white mt-1"
                          >{{ spec.d }}</span
                        >
                      </div>
                      <div class="flex flex-col items-end text-right">
                        <span
                          class="text-[10px] font-mono text-trustori-slate40 dark:text-trustori-slate50 mb-1"
                          >Tablet: {{ spec.t }}</span
                        >
                        <span
                          class="text-[10px] font-mono text-trustori-slate40 dark:text-trustori-slate50"
                          >Phone: {{ spec.p }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="responsive"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div
              class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Responsive Grid
              </h2>
              <span
                class="text-sm font-mono text-trustori-slate50 dark:text-trustori-slate40"
                >Fluid Container / 12-Column System</span
              >
            </div>

            <div class="space-y-8">
              <!-- Breakpoint Viz -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  class="p-6 rounded-2xl border border-trustori-slate20 dark:border-trustori-slate80 bg-white dark:bg-[#111] bento-card relative overflow-hidden group">
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-trustori-orange50"></div>
                  <div class="flex justify-between items-start mb-4">
                    <div
                      class="p-2 bg-trustori-slate10 dark:bg-trustori-slate80 rounded-lg text-trustori-slate90 dark:text-white">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <span
                      class="font-mono text-xs bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate60 dark:text-trustori-slate40"
                      >&lt; 768px</span
                    >
                  </div>
                  <h3
                    class="text-lg font-medium text-trustori-slate90 dark:text-white mb-1">
                    Mobile
                  </h3>
                  <p
                    class="text-sm text-trustori-slate60 dark:text-trustori-slate40 mb-4">
                    4 Column Grid
                  </p>
                  <div class="grid grid-cols-4 gap-2 h-12 opacity-50">
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                  </div>
                </div>

                <div
                  class="p-6 rounded-2xl border border-trustori-slate20 dark:border-trustori-slate80 bg-white dark:bg-[#111] bento-card relative overflow-hidden group">
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-trustori-blue50"></div>
                  <div class="flex justify-between items-start mb-4">
                    <div
                      class="p-2 bg-trustori-slate10 dark:bg-trustori-slate80 rounded-lg text-trustori-slate90 dark:text-white">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <span
                      class="font-mono text-xs bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate60 dark:text-trustori-slate40"
                      >768px - 1280px</span
                    >
                  </div>
                  <h3
                    class="text-lg font-medium text-trustori-slate90 dark:text-white mb-1">
                    Tablet
                  </h3>
                  <p
                    class="text-sm text-trustori-slate60 dark:text-trustori-slate40 mb-4">
                    8 Column Grid
                  </p>
                  <div class="grid grid-cols-8 gap-1 h-12 opacity-50">
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                  </div>
                </div>

                <div
                  class="p-6 rounded-2xl border border-trustori-slate20 dark:border-trustori-slate80 bg-white dark:bg-[#111] bento-card relative overflow-hidden group">
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-trustori-blue70"></div>
                  <div class="flex justify-between items-start mb-4">
                    <div
                      class="p-2 bg-trustori-slate10 dark:bg-trustori-slate80 rounded-lg text-trustori-slate90 dark:text-white">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <span
                      class="font-mono text-xs bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate60 dark:text-trustori-slate40"
                      >1280px +</span
                    >
                  </div>
                  <h3
                    class="text-lg font-medium text-trustori-slate90 dark:text-white mb-1">
                    Desktop
                  </h3>
                  <p
                    class="text-sm text-trustori-slate60 dark:text-trustori-slate40 mb-4">
                    12 Column Grid
                  </p>
                  <div class="grid grid-cols-12 gap-1 h-12 opacity-50">
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                    <div
                      class="bg-trustori-blue10 dark:bg-trustori-blue90/30 rounded-sm col-span-1 border border-trustori-blue20 dark:border-trustori-blue80 border-dashed"></div>
                  </div>
                </div>
              </div>

              <!-- Spacing System Overlay -->
              <div
                class="p-8 rounded-2xl bg-trustori-slate0 dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 bento-card">
                <h3
                  class="text-xl font-medium text-trustori-slate90 dark:text-white mb-4">
                  Spacing Scale
                </h3>
                <div class="flex flex-wrap gap-4 items-end">
                  <div class="text-center group">
                    <div
                      class="w-4 h-4 bg-trustori-orange30/20 border border-trustori-orange30 rounded mx-auto mb-2 relative group-hover:scale-110 transition-transform">
                      <span
                        class="absolute inset-0 flex items-center justify-center text-[8px] text-trustori-orange70 font-mono"
                        >1</span
                      >
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >4px</span
                    >
                  </div>
                  <div class="text-center group">
                    <div
                      class="w-8 h-8 bg-trustori-orange30/20 border border-trustori-orange30 rounded mx-auto mb-2 relative group-hover:scale-110 transition-transform">
                      <span
                        class="absolute inset-0 flex items-center justify-center text-xs text-trustori-orange70 font-mono"
                        >2</span
                      >
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >8px</span
                    >
                  </div>
                  <div class="text-center group">
                    <div
                      class="w-16 h-16 bg-trustori-orange30/20 border border-trustori-orange30 rounded mx-auto mb-2 relative group-hover:scale-110 transition-transform">
                      <span
                        class="absolute inset-0 flex items-center justify-center text-xs text-trustori-orange70 font-mono"
                        >4</span
                      >
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >16px</span
                    >
                  </div>
                  <div class="text-center group">
                    <div
                      class="w-24 h-24 bg-trustori-orange30/20 border border-trustori-orange30 rounded mx-auto mb-2 relative group-hover:scale-110 transition-transform">
                      <span
                        class="absolute inset-0 flex items-center justify-center text-xs text-trustori-orange70 font-mono"
                        >6</span
                      >
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >24px</span
                    >
                  </div>
                  <div class="text-center group">
                    <div
                      class="w-32 h-32 bg-trustori-orange30/20 border border-trustori-orange30 rounded mx-auto mb-2 relative group-hover:scale-110 transition-transform">
                      <span
                        class="absolute inset-0 flex items-center justify-center text-xs text-trustori-orange70 font-mono"
                        >8</span
                      >
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >32px</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="grid"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div class="flex items-end justify-between mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Grid & Dimensions
              </h2>
              <span
                class="text-sm font-mono text-trustori-slate50 dark:text-trustori-slate40"
                >12 Column System</span
              >
            </div>

            <div class="grid grid-cols-1 gap-8">
              <!-- Visual Grid -->
              <div
                class="p-8 bg-trustori-slate0 dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card overflow-hidden">
                <div class="grid grid-cols-12 gap-4 h-32 opacity-20">
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                  <div
                    class="bg-trustori-blue70 rounded-md col-span-1 border border-trustori-blue70/50"></div>
                </div>
              </div>

              <!-- Dimensions Spec Table -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  class="p-6 bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card">
                  <h3
                    class="text-sm font-medium text-trustori-slate90 dark:text-white mb-4">
                    Container Widths
                  </h3>
                  <table class="w-full text-sm text-left">
                    <thead
                      class="text-xs text-trustori-slate50 uppercase border-b border-trustori-slate10 dark:border-trustori-slate80">
                      <tr>
                        <th class="py-2">Screen</th>
                        <th class="py-2">Width</th>
                        <th class="py-2">Gutter</th>
                      </tr>
                    </thead>
                    <tbody
                      class="text-trustori-slate70 dark:text-trustori-slate30 font-mono text-xs">
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Desktop (xl)</td>
                        <td class="py-2">1400px</td>
                        <td class="py-2">48px</td>
                      </tr>
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Laptop (lg)</td>
                        <td class="py-2">1024px</td>
                        <td class="py-2">48px</td>
                      </tr>
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Tablet (md)</td>
                        <td class="py-2">768px</td>
                        <td class="py-2">32px</td>
                      </tr>
                      <tr>
                        <td class="py-2">Mobile (sm)</td>
                        <td class="py-2">100%</td>
                        <td class="py-2">24px</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="p-6 bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card">
                  <h3
                    class="text-sm font-medium text-trustori-slate90 dark:text-white mb-4">
                    Spacing Tokens
                  </h3>
                  <div class="flex flex-wrap gap-2 font-mono text-xs">
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-1 = 4px</span
                    >
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-2 = 8px</span
                    >
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-4 = 16px</span
                    >
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-6 = 24px</span
                    >
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-8 = 32px</span
                    >
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-12 = 48px</span
                    >
                    <span
                      class="inline-flex items-center bg-trustori-slate10 dark:bg-trustori-slate80 px-2 py-1 rounded text-trustori-slate70 dark:text-trustori-slate30"
                      >px-16 = 64px</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="motion"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div class="flex items-end justify-between mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Motion & Depth
              </h2>
              <span
                class="text-sm font-mono text-trustori-slate50 dark:text-trustori-slate40"
                >Cubic Bezier / Shadows</span
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Motion Curves -->
              <div
                class="p-8 bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card">
                <h3
                  class="text-sm font-medium text-trustori-slate90 dark:text-white mb-6">
                  Easing Curves
                </h3>
                <div class="space-y-8">
                  <div>
                    <div
                      class="flex justify-between items-center text-xs text-trustori-slate60 dark:text-trustori-slate40 mb-2">
                      <span>Default (Ease-Out)</span>
                      <span class="font-mono">duration-200</span>
                    </div>
                    <div
                      class="h-2 bg-trustori-slate10 dark:bg-trustori-slate80 rounded-full overflow-hidden relative group cursor-pointer">
                      <div
                        class="absolute top-0 left-0 w-8 h-full bg-trustori-blue50 rounded-full group-hover:left-[calc(100%-32px)] transition-all duration-200 ease-out"></div>
                    </div>
                  </div>
                  <div>
                    <div
                      class="flex justify-between items-center text-xs text-trustori-slate60 dark:text-trustori-slate40 mb-2">
                      <span>Smooth (Ease-In-Out)</span>
                      <span class="font-mono">duration-300</span>
                    </div>
                    <div
                      class="h-2 bg-trustori-slate10 dark:bg-trustori-slate80 rounded-full overflow-hidden relative group cursor-pointer">
                      <div
                        class="absolute top-0 left-0 w-8 h-full bg-trustori-blue50 rounded-full group-hover:left-[calc(100%-32px)] transition-all duration-300 ease-in-out"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shadow Depth -->
              <div
                class="p-8 bg-trustori-slate0 dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card flex items-center justify-center gap-8">
                <div
                  class="w-24 h-24 bg-white dark:bg-[#222] rounded-lg shadow-sm border border-trustori-slate10 dark:border-trustori-slate80/50 flex items-center justify-center text-xs font-mono text-trustori-slate40">
                  sm
                </div>
                <div
                  class="w-24 h-24 bg-white dark:bg-[#222] rounded-lg shadow-md border border-trustori-slate10 dark:border-trustori-slate80/50 flex items-center justify-center text-xs font-mono text-trustori-slate40">
                  md
                </div>
                <div
                  class="w-24 h-24 bg-white dark:bg-[#222] rounded-lg shadow-lg border border-trustori-slate10 dark:border-trustori-slate80/50 flex items-center justify-center text-xs font-mono text-trustori-slate40">
                  lg
                </div>
              </div>
            </div>
          </section>

          <section
            id="iconography"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div class="flex items-end justify-between mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Iconography
              </h2>
              <span
                class="text-sm font-mono text-trustori-slate50 dark:text-trustori-slate40"
                >24px Grid / 1.5px Stroke</span
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Main Icon Showcase -->
              <div
                class="md:col-span-2 bg-trustori-blue70 dark:bg-trustori-blue90 rounded-2xl p-10 text-white bento-card relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                <div class="grid grid-cols-4 gap-12 relative z-10">
                  <svg
                    class="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <svg
                    class="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  <svg
                    class="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <svg
                    class="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  </svg>
                </div>
                <div
                  class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-trustori-blue90/50 to-transparent"></div>
                <p
                  class="absolute bottom-6 font-mono text-sm text-trustori-blue20">
                  Lucide Icons / Stroke 1.5px
                </p>
              </div>

              <!-- Sizes Card -->
              <div
                class="bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl p-8 bento-card">
                <h3
                  class="text-sm font-medium text-trustori-slate50 uppercase tracking-widest mb-6">
                  Sizes
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <svg
                      class="w-4 h-4 text-trustori-slate90 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"></circle>
                    </svg>
                    <span
                      class="font-mono text-xs text-trustori-slate60 dark:text-trustori-slate40"
                      >16px (sm)</span
                    >
                  </div>
                  <div class="flex items-center justify-between">
                    <svg
                      class="w-5 h-5 text-trustori-slate90 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"></circle>
                    </svg>
                    <span
                      class="font-mono text-xs text-trustori-slate60 dark:text-trustori-slate40"
                      >20px (md)</span
                    >
                  </div>
                  <div class="flex items-center justify-between">
                    <svg
                      class="w-6 h-6 text-trustori-slate90 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"></circle>
                    </svg>
                    <span
                      class="font-mono text-xs text-trustori-slate60 dark:text-trustori-slate40"
                      >24px (lg)</span
                    >
                  </div>
                  <div class="flex items-center justify-between">
                    <svg
                      class="w-8 h-8 text-trustori-slate90 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"></circle>
                    </svg>
                    <span
                      class="font-mono text-xs text-trustori-slate60 dark:text-trustori-slate40"
                      >32px (xl)</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="accessibility"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Accessibility & Inclusion
            </h2>
            <p
              class="text-lg text-trustori-slate60 dark:text-trustori-slate40 max-w-3xl mb-8">
              Accessibility is not a feature; it's a requirement. We design for
              everyone, ensuring our platform is perceivable, operable, and
              robust for all users.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="bg-white dark:bg-[#111] rounded-2xl p-8 border border-trustori-slate20 dark:border-trustori-slate80 bento-card">
                <h3
                  class="text-xl font-medium text-trustori-slate90 dark:text-white mb-4">
                  Color Contrast
                </h3>
                <div class="space-y-4">
                  <div
                    class="flex items-center justify-between p-4 bg-trustori-blue70 rounded-lg">
                    <span class="text-white font-medium">Primary Button</span>
                    <span
                      class="bg-black/20 px-2 py-1 rounded text-xs text-white font-mono"
                      >AAA 7.12</span
                    >
                  </div>
                  <div
                    class="flex items-center justify-between p-4 bg-trustori-slate0 dark:bg-[#16181A] rounded-lg border border-trustori-slate20 dark:border-trustori-slate80">
                    <span
                      class="text-trustori-slate90 dark:text-white font-medium"
                      >Card Background</span
                    >
                    <span
                      class="bg-black/5 dark:bg-white/10 px-2 py-1 rounded text-xs text-trustori-slate60 dark:text-trustori-slate40 font-mono"
                      >AA 4.5+</span
                    >
                  </div>
                </div>
              </div>
              <div
                class="bg-white dark:bg-[#111] rounded-2xl p-8 border border-trustori-slate20 dark:border-trustori-slate80 bento-card">
                <h3
                  class="text-xl font-medium text-trustori-slate90 dark:text-white mb-4">
                  Focus States
                </h3>
                <p
                  class="text-sm text-trustori-slate60 dark:text-trustori-slate40 mb-6">
                  Interactive elements must have clearly visible focus
                  indicators for keyboard navigation.
                </p>
                <div class="flex gap-4">
                  <button
                    class="px-6 py-2 rounded-md bg-white dark:bg-[#050505] border-2 border-trustori-blue50 ring-4 ring-trustori-blue20 outline-none text-trustori-blue70 dark:text-trustori-blue50 font-medium">
                    Focused
                  </button>
                  <button
                    class="px-6 py-2 rounded-md bg-trustori-slate10 dark:bg-trustori-slate80 text-trustori-slate50 dark:text-trustori-slate40 cursor-not-allowed">
                    Disabled
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section
            id="buttons"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div class="flex items-end justify-between mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Button System
              </h2>
              <span
                class="text-sm font-mono text-trustori-slate50 dark:text-trustori-slate40"
                >Base Height: 40px</span
              >
            </div>

            <!-- Component Preview Container -->
            <div
              class="component-preview-container bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl overflow-hidden bento-card">
              <!-- Toolbar -->
              <div
                class="flex items-center justify-between p-4 border-b border-trustori-slate20 dark:border-trustori-slate80 bg-trustori-slate0 dark:bg-[#16181A]">
                <div
                  class="flex items-center space-x-1 bg-white dark:bg-[#222] rounded-lg p-1 border border-trustori-slate20 dark:border-trustori-slate80">
                  <button
                    class="view-toggle-btn p-1.5 rounded-md hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 transition-colors bg-trustori-slate10 dark:bg-trustori-slate80 text-trustori-slate90 dark:text-white"
                    data-view="desktop"
                    title="Desktop View">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button
                    class="view-toggle-btn p-1.5 rounded-md hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 transition-colors text-trustori-slate60 dark:text-trustori-slate50"
                    data-view="tablet"
                    title="Tablet View">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button
                    class="view-toggle-btn p-1.5 rounded-md hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 transition-colors text-trustori-slate60 dark:text-trustori-slate50"
                    data-view="mobile"
                    title="Mobile View">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
                <span class="text-xs font-mono text-trustori-slate50"
                  >Interactive Preview</span
                >
              </div>

              <!-- Preview Area -->
              <div
                class="p-8 lg:p-12 bg-trustori-slate0/50 dark:bg-[#000]/50 relative transition-all duration-300 mx-auto max-w-full preview-area flex flex-col items-center gap-8 min-h-[300px] justify-center">
                <div
                  class="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                  style="
                    background-image: radial-gradient(
                      #6b7280 1px,
                      transparent 1px
                    );
                    background-size: 20px 20px;
                  "></div>

                <!-- Buttons Display -->
                <div
                  class="flex flex-wrap gap-6 justify-center items-center z-10">
                  <!-- Primary -->
                  <div class="flex flex-col items-center gap-2">
                    <button
                      class="h-10 px-4 rounded-sm bg-trustori-blue70 text-white font-medium hover:bg-trustori-blue80 focus:ring-2 focus:ring-trustori-blue30 transition-all text-sm shadow-trust-sm">
                      Primary Action
                    </button>
                    <span class="text-[10px] font-mono text-trustori-slate40"
                      >Primary</span
                    >
                  </div>

                  <!-- Secondary -->
                  <div class="flex flex-col items-center gap-2">
                    <button
                      class="h-10 px-4 rounded-sm bg-white dark:bg-transparent border border-trustori-slate20 dark:border-trustori-slate70 text-trustori-slate90 dark:text-trustori-slate30 font-medium hover:border-trustori-slate90 dark:hover:border-white hover:text-trustori-slate90 dark:hover:text-white transition-all text-sm shadow-trust-sm">
                      Secondary
                    </button>
                    <span class="text-[10px] font-mono text-trustori-slate40"
                      >Secondary</span
                    >
                  </div>

                  <!-- Ghost -->
                  <div class="flex flex-col items-center gap-2">
                    <button
                      class="h-10 px-4 rounded-sm text-trustori-blue70 dark:text-trustori-blue40 font-medium hover:bg-trustori-blue10 dark:hover:bg-trustori-blue90/20 transition-all text-sm">
                      Ghost Action
                    </button>
                    <span class="text-[10px] font-mono text-trustori-slate40"
                      >Ghost</span
                    >
                  </div>
                </div>

                <!-- States -->
                <div
                  class="flex flex-wrap gap-6 justify-center items-center z-10 opacity-60">
                  <button
                    class="h-10 px-4 rounded-sm bg-trustori-blue80 text-white font-medium text-sm shadow-inner cursor-default">
                    Hover/Active
                  </button>
                  <button
                    class="h-10 px-4 rounded-sm bg-trustori-slate10 dark:bg-trustori-slate80 text-trustori-slate40 font-medium text-sm cursor-not-allowed">
                    Disabled
                  </button>
                </div>
              </div>
            </div>

            <!-- Specs Table -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="bento-card p-6 bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl">
                <h3
                  class="text-sm font-medium text-trustori-slate90 dark:text-white mb-4">
                  Properties (Desktop)
                </h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left">
                    <thead
                      class="text-xs text-trustori-slate50 uppercase border-b border-trustori-slate10 dark:border-trustori-slate80">
                      <tr>
                        <th class="py-2">Property</th>
                        <th class="py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody
                      class="text-trustori-slate70 dark:text-trustori-slate30 font-mono text-xs">
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Height</td>
                        <td class="py-2">40px (h-10)</td>
                      </tr>
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Padding X</td>
                        <td class="py-2">16px (px-4)</td>
                      </tr>
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Font Size</td>
                        <td class="py-2">14px (text-sm)</td>
                      </tr>
                      <tr>
                        <td class="py-2">Radius</td>
                        <td class="py-2">8px (rounded)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- Mobile Specs -->
              <div
                class="bento-card p-6 bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl">
                <h3
                  class="text-sm font-medium text-trustori-slate90 dark:text-white mb-4">
                  Properties (Mobile)
                </h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left">
                    <thead
                      class="text-xs text-trustori-slate50 uppercase border-b border-trustori-slate10 dark:border-trustori-slate80">
                      <tr>
                        <th class="py-2">Property</th>
                        <th class="py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody
                      class="text-trustori-slate70 dark:text-trustori-slate30 font-mono text-xs">
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Height</td>
                        <td class="py-2">36px (h-9)</td>
                      </tr>
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Padding X</td>
                        <td class="py-2">12px (px-3)</td>
                      </tr>
                      <tr
                        class="border-b border-trustori-slate10 dark:border-trustori-slate80/50">
                        <td class="py-2">Font Size</td>
                        <td class="py-2">14px (text-sm)</td>
                      </tr>
                      <tr>
                        <td class="py-2">Radius</td>
                        <td class="py-2">8px (rounded)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section
            id="data-inputs"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <div class="flex items-end justify-between mb-6">
              <h2
                class="text-3xl font-medium tracking-tight text-trustori-slate90 dark:text-white">
                Inputs & Forms
              </h2>
            </div>

            <div
              class="bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl p-8 lg:p-12 bento-card">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="space-y-6">
                  <div class="space-y-2">
                    <label
                      class="text-sm font-medium text-trustori-slate70 dark:text-trustori-slate40"
                      >Email Address</label
                    >
                    <input
                      type="text"
                      placeholder="name@company.com"
                      class="w-full px-4 py-3 bg-white dark:bg-[#050505] border border-trustori-slate20 dark:border-trustori-slate80 rounded-sm text-sm focus:outline-none focus:border-trustori-blue50 focus:ring-1 focus:ring-trustori-blue50 transition-all text-trustori-slate90 dark:text-white placeholder:text-trustori-slate40" />
                  </div>
                  <div class="group relative">
                    <label
                      class="text-sm font-medium text-trustori-slate70 dark:text-trustori-slate40"
                      >Search</label
                    >
                    <div class="relative mt-2">
                      <svg
                        class="w-5 h-5 absolute left-3 top-2.5 text-trustori-slate40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      <input
                        type="text"
                        placeholder="Search resources..."
                        class="w-full pl-10 px-4 py-3 bg-trustori-slate0 dark:bg-[#16181A] border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-trustori-blue50 text-trustori-slate90 dark:text-white" />
                    </div>
                  </div>
                </div>
                <div class="space-y-6">
                  <div class="space-y-2">
                    <label
                      class="text-sm font-medium text-trustori-slate70 dark:text-trustori-slate40"
                      >Validation Error</label
                    >
                    <div class="relative">
                      <input
                        type="text"
                        value="invalid-email"
                        class="w-full px-4 py-3 bg-red-50 dark:bg-red-900/10 border border-red-300 dark:border-red-800 rounded-sm text-sm text-red-900 dark:text-red-400 focus:outline-none pr-10" />
                      <svg
                        class="w-5 h-5 text-red-500 absolute right-3 top-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <p
                      class="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                      Please enter a valid email address.
                    </p>
                  </div>
                  <div class="flex items-center gap-6 pt-4">
                    <label class="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked
                        class="w-4 h-4 rounded border-trustori-slate30 text-trustori-blue60 focus:ring-trustori-blue50 cursor-pointer accent-trustori-blue60" />
                      <span
                        class="text-sm text-trustori-slate70 dark:text-trustori-slate40 group-hover:text-trustori-slate90 dark:group-hover:text-white transition-colors"
                        >Remember me</span
                      >
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer group">
                      <div class="relative">
                        <input
                          type="checkbox"
                          class="sr-only peer" />
                        <div
                          class="w-11 h-6 bg-trustori-slate20 dark:bg-trustori-slate80 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trustori-blue60"></div>
                      </div>
                      <span
                        class="text-sm text-trustori-slate70 dark:text-trustori-slate40"
                        >Toggle</span
                      >
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="nav-structures"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Tabs & Navigation
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Segmented Control -->
              <div
                class="p-8 border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bg-trustori-slate0 dark:bg-[#16181A] bento-card">
                <h3
                  class="text-sm font-medium text-trustori-slate50 uppercase tracking-widest mb-6">
                  Segmented Control
                </h3>
                <div
                  class="bg-trustori-slate20 dark:bg-[#000] p-1 rounded-lg inline-flex">
                  <button
                    class="px-4 py-1.5 rounded-md bg-white dark:bg-[#222] text-sm font-medium text-trustori-slate90 dark:text-white shadow-sm">
                    Daily
                  </button>
                  <button
                    class="px-4 py-1.5 rounded-md text-sm font-medium text-trustori-slate60 dark:text-trustori-slate50 hover:text-trustori-slate90">
                    Weekly
                  </button>
                  <button
                    class="px-4 py-1.5 rounded-md text-sm font-medium text-trustori-slate60 dark:text-trustori-slate50 hover:text-trustori-slate90">
                    Monthly
                  </button>
                </div>
              </div>

              <!-- Border Tabs -->
              <div
                class="p-8 border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bg-white dark:bg-[#111] bento-card">
                <h3
                  class="text-sm font-medium text-trustori-slate50 uppercase tracking-widest mb-6">
                  Underline Tabs
                </h3>
                <div
                  class="border-b border-trustori-slate20 dark:border-trustori-slate80">
                  <nav class="-mb-px flex space-x-8">
                    <a
                      href="#"
                      class="border-b-2 border-trustori-blue70 py-4 px-1 text-sm font-medium text-trustori-blue70 dark:text-trustori-blue40"
                      >User Profile</a
                    >
                    <a
                      href="#"
                      class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-trustori-slate50 hover:border-trustori-slate30 hover:text-trustori-slate70"
                      >Security</a
                    >
                    <a
                      href="#"
                      class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-trustori-slate50 hover:border-trustori-slate30 hover:text-trustori-slate70"
                      >Billing</a
                    >
                  </nav>
                </div>
              </div>
            </div>
          </section>

          <section
            id="nav-plus"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Navigation Patterns
            </h2>

            <div class="grid grid-cols-1 gap-8">
              <!-- Breadcrumbs & Pagination Combo -->
              <div
                class="bg-white dark:bg-[#111] p-8 border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3
                      class="text-sm font-medium text-trustori-slate50 uppercase tracking-widest mb-6">
                      Breadcrumbs
                    </h3>
                    <nav
                      class="flex"
                      aria-label="Breadcrumb">
                      <ol
                        class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                          <a
                            href="#"
                            class="inline-flex items-center text-sm font-medium text-trustori-slate60 dark:text-trustori-slate40 hover:text-trustori-blue70 dark:hover:text-white">
                            <svg
                              class="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Home
                          </a>
                        </li>
                        <li>
                          <div class="flex items-center">
                            <svg
                              class="w-6 h-6 text-trustori-slate30"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                            <a
                              href="#"
                              class="ml-1 text-sm font-medium text-trustori-slate60 dark:text-trustori-slate40 hover:text-trustori-blue70 dark:hover:text-white md:ml-2"
                              >Projects</a
                            >
                          </div>
                        </li>
                        <li aria-current="page">
                          <div class="flex items-center">
                            <svg
                              class="w-6 h-6 text-trustori-slate30"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                            <span
                              class="ml-1 text-sm font-medium text-trustori-slate90 dark:text-white md:ml-2"
                              >Nexus System</span
                            >
                          </div>
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div>
                    <h3
                      class="text-sm font-medium text-trustori-slate50 uppercase tracking-widest mb-6">
                      Pagination
                    </h3>
                    <nav aria-label="Page navigation example">
                      <ul class="inline-flex -space-x-px text-sm">
                        <li>
                          <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-trustori-slate60 bg-white dark:bg-[#16181A] border border-trustori-slate20 dark:border-trustori-slate80 rounded-l-lg hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 dark:text-trustori-slate40"
                            >Prev</a
                          >
                        </li>
                        <li>
                          <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-trustori-blue70 border border-trustori-blue70 hover:bg-trustori-blue80 hover:text-white"
                            >1</a
                          >
                        </li>
                        <li>
                          <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-trustori-slate60 bg-white dark:bg-[#16181A] border border-trustori-slate20 dark:border-trustori-slate80 hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 dark:text-trustori-slate40"
                            >2</a
                          >
                        </li>
                        <li>
                          <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-trustori-slate60 bg-white dark:bg-[#16181A] border border-trustori-slate20 dark:border-trustori-slate80 rounded-r-lg hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80 dark:text-trustori-slate40"
                            >Next</a
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              <!-- Stepper -->
              <div
                class="p-8 border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bg-trustori-slate0 dark:bg-[#16181A] bento-card">
                <h3
                  class="text-sm font-medium text-trustori-slate50 uppercase tracking-widest mb-6">
                  Progress Stepper
                </h3>
                <ol class="flex items-center w-full">
                  <li
                    class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-trustori-blue70 after:border-4 after:inline-block">
                    <span
                      class="flex items-center justify-center w-8 h-8 bg-trustori-blue70 rounded-full lg:h-10 lg:w-10 shrink-0 text-white font-medium text-sm"
                      >1</span
                    >
                  </li>
                  <li
                    class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-trustori-slate20 dark:after:border-trustori-slate80 after:border-4 after:inline-block">
                    <span
                      class="flex items-center justify-center w-8 h-8 bg-trustori-blue70 rounded-full lg:h-10 lg:w-10 shrink-0 text-white font-medium text-sm"
                      >2</span
                    >
                  </li>
                  <li class="flex items-center w-10">
                    <span
                      class="flex items-center justify-center w-8 h-8 bg-trustori-slate20 dark:bg-trustori-slate80 rounded-full lg:h-10 lg:w-10 shrink-0 text-trustori-slate50 font-medium text-sm"
                      >3</span
                    >
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section
            id="feedback"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Feedback & Modals
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Modal Viz (Static) -->
              <div
                class="lg:col-span-2 bg-trustori-slate90/5 dark:bg-white/5 rounded-2xl p-8 border-dashed border-2 border-trustori-slate20 dark:border-trustori-slate80 flex items-center justify-center min-h-[300px]">
                <!-- Modal Card -->
                <div
                  class="bg-white dark:bg-[#16181A] rounded-xl shadow-2xl dark:shadow-black/50 p-6 w-full max-w-sm border border-trustori-slate10 dark:border-trustori-slate80">
                  <div class="flex justify-between items-center mb-4">
                    <h3
                      class="text-lg font-medium text-trustori-slate90 dark:text-white">
                      Confirm Deletion
                    </h3>
                    <button
                      class="text-trustori-slate40 hover:text-trustori-slate60">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div
                    class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex gap-3 mb-6">
                    <svg
                      class="w-6 h-6 text-red-600 dark:text-red-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <div>
                      <p
                        class="text-sm text-red-900 dark:text-red-200 font-medium mb-1">
                        Warning
                      </p>
                      <p class="text-xs text-red-700 dark:text-red-300">
                        This action cannot be undone. This will permanently
                        delete the selected project.
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-end gap-3">
                    <button
                      class="px-4 py-2 rounded-md border border-trustori-slate20 dark:border-trustori-slate70 text-sm font-medium text-trustori-slate70 dark:text-trustori-slate30 hover:bg-trustori-slate10 dark:hover:bg-trustori-slate80">
                      Cancel
                    </button>
                    <button
                      class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow-sm">
                      Delete Project
                    </button>
                  </div>
                </div>
              </div>

              <!-- Toasts/Alerts column -->
              <div class="flex flex-col gap-4">
                <div
                  class="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-4 rounded-lg flex items-start gap-3 shadow-sm bento-card">
                  <svg
                    class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4
                      class="text-sm font-medium text-green-900 dark:text-green-300">
                      Success
                    </h4>
                    <p class="text-xs text-green-700 dark:text-green-400 mt-1">
                      Changes saved successfully.
                    </p>
                  </div>
                </div>

                <div
                  class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4 rounded-lg flex items-start gap-3 shadow-sm bento-card">
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4
                      class="text-sm font-medium text-blue-900 dark:text-blue-300">
                      Info
                    </h4>
                    <p class="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      New update available.
                    </p>
                  </div>
                </div>

                <div
                  class="bg-trustori-slate90 dark:bg-white p-4 rounded-lg shadow-lg flex items-center justify-between text-white dark:text-black mt-auto bento-card">
                  <span class="text-sm font-medium">Downloading...</span>
                  <svg
                    class="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section
            id="cards"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-12 text-trustori-slate90 dark:text-white">
              Card Patterns
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl overflow-hidden bento-card shadow-sm group">
                <div
                  class="aspect-video bg-trustori-slate10 dark:bg-trustori-slate80/50 overflow-hidden relative">
                  <div
                    class="absolute inset-0 flex items-center justify-center text-trustori-slate30 dark:text-trustori-slate60">
                    <svg
                      class="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <div class="p-6">
                  <span
                    class="text-[10px] font-bold text-trustori-blue70 dark:text-trustori-blue40 uppercase tracking-widest"
                    >Enterprise</span
                  >
                  <h3
                    class="text-xl font-medium text-trustori-slate90 dark:text-white mt-2 mb-3">
                    Portfolio Overview Card
                  </h3>
                  <p
                    class="text-sm text-trustori-slate60 dark:text-trustori-slate40 mb-6">
                    Standard pattern for object previews with metadata and
                    actions.
                  </p>
                  <div
                    class="flex items-center justify-between pt-4 border-t border-trustori-slate10 dark:border-trustori-slate80">
                    <div class="flex -space-x-2">
                      <div
                        class="w-6 h-6 rounded-full bg-trustori-blue50 border border-white"></div>
                      <div
                        class="w-6 h-6 rounded-full bg-trustori-slate70 border border-white"></div>
                    </div>
                    <button
                      class="text-trustori-blue70 dark:text-trustori-blue40 text-sm font-medium hover:underline">
                      View details
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl p-8 bento-card shadow-sm relative overflow-hidden group">
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 bg-trustori-blue70 rounded-xl flex items-center justify-center text-white mb-6">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <h3
                    class="text-2xl font-medium text-trustori-slate90 dark:text-white mb-4">
                    Analytics Widget
                  </h3>
                  <p
                    class="text-trustori-slate60 dark:text-trustori-slate40 mb-8">
                    Focus on data density and quick visualization for dashboard
                    metrics.
                  </p>
                  <div class="h-24 flex items-end gap-1">
                    <div
                      class="flex-1 bg-trustori-blue50/20 h-[40%] rounded-sm"></div>
                    <div
                      class="flex-1 bg-trustori-blue50/20 h-[60%] rounded-sm"></div>
                    <div
                      class="flex-1 bg-trustori-blue50/20 h-[90%] rounded-sm"></div>
                    <div
                      class="flex-1 bg-trustori-blue50 h-[75%] rounded-sm"></div>
                    <div
                      class="flex-1 bg-trustori-blue50/20 h-[50%] rounded-sm"></div>
                  </div>
                </div>
                <div
                  class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg
                    class="w-24 h-24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section
            id="data-display"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Data Display
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Avatars & Badges -->
              <div
                class="bg-white dark:bg-[#111] p-6 border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl bento-card flex flex-col gap-6">
                <div>
                  <h3
                    class="text-xs font-medium text-trustori-slate50 uppercase tracking-widest mb-4">
                    Avatars
                  </h3>
                  <div class="flex -space-x-3">
                    <img
                      class="w-10 h-10 rounded-full border-2 border-white dark:border-[#111]"
                      src="https://ui-avatars.com/api/?name=Alex+R&background=0047BA&color=fff"
                      alt="" />
                    <img
                      class="w-10 h-10 rounded-full border-2 border-white dark:border-[#111]"
                      src="https://ui-avatars.com/api/?name=Jane+D&background=2A7DE1&color=fff"
                      alt="" />
                    <img
                      class="w-10 h-10 rounded-full border-2 border-white dark:border-[#111]"
                      src="https://ui-avatars.com/api/?name=Mike+S&background=111&color=fff"
                      alt="" />
                    <a
                      class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-trustori-slate70 border-2 border-white dark:border-[#111] rounded-full hover:bg-gray-600"
                      href="#"
                      >+99</a
                    >
                  </div>
                </div>
                <div>
                  <h3
                    class="text-xs font-medium text-trustori-slate50 uppercase tracking-widest mb-4">
                    Status Badges
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800"
                      >Default</span
                    >
                    <span
                      class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200 dark:border-green-800"
                      >Verified</span
                    >
                    <span
                      class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-800"
                      >Pending</span
                    >
                  </div>
                </div>
              </div>

              <!-- Tooltips -->
              <div
                class="bg-trustori-slate90 dark:bg-black p-6 rounded-2xl bento-card flex items-center justify-center relative">
                <h3
                  class="absolute top-6 left-6 text-xs font-medium text-trustori-slate50 uppercase tracking-widest">
                  Tooltip
                </h3>
                <div class="relative group">
                  <button
                    class="text-white border border-white/20 px-4 py-2 rounded-md hover:bg-white/10">
                    Hover Me
                  </button>
                  <div
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-white text-black text-xs rounded shadow-lg opacity-100 transition-opacity whitespace-nowrap">
                    Helpful Information
                    <div
                      class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>

              <!-- Code Block -->
              <div
                class="bg-[#1e1e1e] p-6 rounded-2xl border border-trustori-slate80 bento-card font-mono text-xs text-gray-300 overflow-hidden relative">
                <div class="absolute top-4 right-4 flex space-x-1">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre class="mt-4"><code class="language-html">
<span class="text-blue-400">&lt;div</span> <span class="text-green-400">class</span>=<span class="text-orange-300">"card"</span><span class="text-blue-400">&gt;</span>
  <span class="text-blue-400">&lt;h1&gt;</span>Nexus<span class="text-blue-400">&lt;/h1&gt;</span>
  <span class="text-blue-400">&lt;p&gt;</span>System<span class="text-blue-400">&lt;/p&gt;</span>
<span class="text-blue-400">&lt;/div&gt;</span>
                             </code></pre>
              </div>
            </div>
          </section>

          <section
            id="tables"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90 dark:text-white">
              Data Tables
            </h2>

            <div
              class="bg-white dark:bg-[#111] border border-trustori-slate20 dark:border-trustori-slate80 rounded-2xl overflow-hidden bento-card shadow-sm">
              <div
                class="p-6 border-b border-trustori-slate20 dark:border-trustori-slate80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 class="font-medium text-trustori-slate90 dark:text-white">
                    Recent Transactions
                  </h3>
                  <p
                    class="text-xs text-trustori-slate60 dark:text-trustori-slate40 mt-1">
                    Manage your latest financial activities.
                  </p>
                </div>
                <div class="flex gap-2">
                  <button
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-black border border-trustori-slate20 dark:border-trustori-slate70 rounded hover:bg-trustori-slate10 text-trustori-slate70 dark:text-trustori-slate30 ml-auto">
                    Filter
                  </button>
                  <button
                    class="px-3 py-1.5 text-xs font-medium bg-trustori-blue70 text-white rounded shadow-sm hover:bg-trustori-blue80">
                    Export
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-left text-sm text-trustori-slate60 dark:text-trustori-slate40">
                  <thead
                    class="bg-trustori-slate0 dark:bg-[#16181A] text-xs uppercase font-medium text-trustori-slate50 border-b border-trustori-slate20 dark:border-trustori-slate80">
                    <tr>
                      <th
                        scope="col"
                        class="p-4 w-4">
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="w-4 h-4 rounded border-trustori-slate30 text-trustori-blue60 focus:ring-trustori-blue50" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3">
                        Transaction ID
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3">
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3">
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3">
                        Status
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="divide-y divide-trustori-slate10 dark:divide-trustori-slate80">
                    <tr
                      class="bg-white dark:bg-[#111] hover:bg-trustori-slate0 dark:hover:bg-white/5 transition-colors group">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="w-4 h-4 rounded border-trustori-slate30 text-trustori-blue60 focus:ring-trustori-blue50" />
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 font-medium text-trustori-slate90 dark:text-white">
                        #TRX-001-492
                      </td>
                      <td class="px-6 py-4">Jan 24, 2024</td>
                      <td
                        class="px-6 py-4 font-mono text-trustori-slate90 dark:text-white">
                        $420.00
                      </td>
                      <td class="px-6 py-4">
                        <span
                          class="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                          <span
                            class="w-1.5 h-1.5 mr-1.5 bg-green-500 rounded-full"></span>
                          Completed
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <a
                          href="#"
                          class="font-medium text-trustori-slate40 hover:text-trustori-blue60 dark:hover:text-white"
                          ><svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg
                        ></a>
                      </td>
                    </tr>
                    <tr
                      class="bg-white dark:bg-[#111] hover:bg-trustori-slate0 dark:hover:bg-white/5 transition-colors group">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="w-4 h-4 rounded border-trustori-slate30 text-trustori-blue60 focus:ring-trustori-blue50" />
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 font-medium text-trustori-slate90 dark:text-white">
                        #TRX-001-493
                      </td>
                      <td class="px-6 py-4">Jan 23, 2024</td>
                      <td
                        class="px-6 py-4 font-mono text-trustori-slate90 dark:text-white">
                        $120.50
                      </td>
                      <td class="px-6 py-4">
                        <span
                          class="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-200 dark:border-yellow-800">
                          <span
                            class="w-1.5 h-1.5 mr-1.5 bg-yellow-500 rounded-full"></span>
                          Processing
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <a
                          href="#"
                          class="font-medium text-trustori-slate40 hover:text-trustori-blue60 dark:hover:text-white"
                          ><svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg
                        ></a>
                      </td>
                    </tr>
                    <tr
                      class="bg-white dark:bg-[#111] hover:bg-trustori-slate0 dark:hover:bg-white/5 transition-colors group">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="w-4 h-4 rounded border-trustori-slate30 text-trustori-blue60 focus:ring-trustori-blue50" />
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 font-medium text-trustori-slate90 dark:text-white">
                        #TRX-001-494
                      </td>
                      <td class="px-6 py-4">Jan 22, 2024</td>
                      <td
                        class="px-6 py-4 font-mono text-trustori-slate90 dark:text-white">
                        $2,400.00
                      </td>
                      <td class="px-6 py-4">
                        <span
                          class="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                          <span
                            class="w-1.5 h-1.5 mr-1.5 bg-blue-500 rounded-full"></span>
                          Review
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <a
                          href="#"
                          class="font-medium text-trustori-slate40 hover:text-trustori-blue60 dark:hover:text-white"
                          ><svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg
                        ></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="p-4 border-t border-trustori-slate20 dark:border-trustori-slate80 bg-trustori-slate0 dark:bg-[#16181A] flex items-center justify-between">
                <span
                  class="text-xs text-trustori-slate60 dark:text-trustori-slate40"
                  >Showing
                  <span
                    class="font-medium text-trustori-slate90 dark:text-white"
                    >1-3</span
                  >
                  of
                  <span
                    class="font-medium text-trustori-slate90 dark:text-white"
                    >100</span
                  ></span
                >
                <div class="flex gap-1">
                  <button
                    class="p-1 rounded hover:bg-trustori-slate20 dark:hover:bg-trustori-slate80 disabled:opacity-50">
                    <svg
                      class="w-4 h-4 text-trustori-slate60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <button
                    class="p-1 rounded hover:bg-trustori-slate20 dark:hover:bg-trustori-slate80">
                    <svg
                      class="w-4 h-4 text-trustori-slate60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
