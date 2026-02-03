<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import useScrollSpy from "@/composables/useScrollSpy";

// --- Head Configuration ---
useHead({
  title: "Identity & Voice",
});

// --- Data ---
const navigationGroups = [
  {
    title: "Brand Core",
    items: [
      { id: "principles", label: "Principles" },
      { id: "tone", label: "Voice & Tone" },
    ],
  },
  {
    title: "Visual Identity",
    items: [
      { id: "logo", label: "Logo Guidelines" },
      { id: "visuals", label: "Visual System" },
      { id: "color-usage", label: "Color Usage" },
      { id: "motion", label: "Motion & Interaction" },
    ],
  },
  {
    title: "Resources",
    items: [{ id: "writing", label: "Writing Mechanics" }],
  },
];

// --- State ---
const { activeSection } = useScrollSpy(navigationGroups);

// --- Methods ---

// --- Lifecycle ---
onMounted(() => {
  // Initial check handled by composable
});
</script>

<template>
  <div
    class="bg-[#F9FAFB] font-sans text-trustori-slate90 selection:bg-trustori-blue10 selection:text-trustori-blue90 flex flex-col min-h-screen">
    <TheHeader
      :navigation-groups="navigationGroups"
      active-page="brand" />

    <!-- Main Content Grid -->
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
              Identity & Voice
            </h1>
            <p class="text-lg text-trustori-slate60">
              Guidelines for key messaging, tonal nuance, and brand personality.
            </p>
          </div>

          <!-- Brand Principles -->
          <section
            id="principles"
            class="space-y-8 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight text-trustori-slate90">
              Brand Principles
            </h2>
            <p
              class="text-xl text-trustori-slate60 max-w-3xl leading-relaxed mb-10">
              Our principles are the foundation of everything we build. They
              guide our decisions, shape our voice, and define our relationship
              with our users.
            </p>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
              <!-- Card 1 -->
              <div
                class="col-span-1 md:col-span-2 bg-white rounded-2xl p-8 border border-trustori-slate20 relative overflow-hidden bento-card flex flex-col justify-between">
                <div class="relative z-10">
                  <h3 class="text-2xl font-medium text-trustori-slate90 mb-4">
                    Secure by Design
                  </h3>
                  <p class="text-trustori-slate60 text-lg max-w-md">
                    Trust is not an add-on. We prioritize security and data
                    integrity in every pixel, ensuring our users feel protected
                    without friction.
                  </p>
                </div>
                <div
                  class="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-trustori-blue10 to-transparent rounded-tl-full opacity-50"></div>
                <div class="mt-8 flex gap-2">
                  <span
                    class="px-3 py-1 bg-trustori-blue0 text-trustori-blue70 rounded-full text-sm font-medium"
                    >Reliable</span
                  >
                  <span
                    class="px-3 py-1 bg-trustori-blue0 text-trustori-blue70 rounded-full text-sm font-medium"
                    >Proven</span
                  >
                </div>
              </div>

              <!-- Card 2 -->
              <div
                class="col-span-1 bg-trustori-blue70 rounded-2xl p-8 text-white relative overflow-hidden bento-card flex flex-col justify-between">
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      <path
                        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path
                        d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-medium mb-2">Spirited</h3>
                  <p class="text-white/80">
                    We are optimistic about the future. Our technology enables
                    new possibilities.
                  </p>
                </div>
              </div>

              <!-- Card 3 -->
              <div
                class="col-span-1 bg-white rounded-2xl p-8 border border-trustori-slate20 bento-card">
                <h3 class="text-xl font-medium text-trustori-slate90 mb-3">
                  Accessible
                </h3>
                <p class="text-trustori-slate60 mb-6">
                  Inclusive for everyone, everywhere. No barriers.
                </p>
                <div class="grid grid-cols-2 gap-2">
                  <div class="h-16 bg-trustori-slate10 rounded-lg"></div>
                  <div class="h-16 bg-trustori-slate10 rounded-lg"></div>
                </div>
              </div>

              <!-- Card 4 -->
              <div
                class="col-span-1 md:col-span-2 bg-[#111] text-white rounded-2xl p-8 bento-card flex gap-8 items-center">
                <div class="flex-1">
                  <h3 class="text-2xl font-medium mb-4">Human Centric</h3>
                  <p class="text-gray-400 text-lg">
                    We speak human, not machine. We translate complex blockchain
                    logic into simple, tangible benefits for everyday people.
                  </p>
                </div>
                <div
                  class="hidden md:block w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center">
                  <span class="text-4xl">☺</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Voice & Tone -->
          <section
            id="tone"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90">
              Voice & Tone Matrix
            </h2>
            <p class="text-base text-trustori-slate70 max-w-3xl mb-8">
              Our voice remains consistent, but our tone adapts to the context
              of the user journey. Use this matrix to determine the appropriate
              emotional resonance for your content.
            </p>

            <div
              class="w-full text-left text-sm border border-trustori-slate20 rounded-md overflow-hidden shadow-sm">
              <div
                class="grid grid-cols-[1fr_2fr_2fr] bg-trustori-slate0 p-4 border-b border-trustori-slate20 font-medium text-trustori-slate50 uppercase tracking-widest text-xs">
                <div>Context</div>
                <div>Tone Attribute</div>
                <div>Example</div>
              </div>
              <div class="divide-y divide-trustori-slate10 bg-white">
                <div class="grid grid-cols-[1fr_2fr_2fr] p-6 gap-4">
                  <div class="font-medium text-trustori-slate90">
                    Onboarding & Discovery
                  </div>
                  <div class="text-trustori-slate60">
                    <span class="text-trustori-blue60 font-medium"
                      >Inviting & Inspiring</span
                    >. Use active verbs and focus on benefits. Keep it light but
                    professional.
                  </div>
                  <div class="text-trustori-slate70 italic">
                    "Start your journey to total transparency. Verify your first
                    item in seconds."
                  </div>
                </div>
                <div class="grid grid-cols-[1fr_2fr_2fr] p-6 gap-4">
                  <div class="font-medium text-trustori-slate90">
                    System Status & Errors
                  </div>
                  <div class="text-trustori-slate60">
                    <span class="text-trustori-orange60 font-medium"
                      >Direct & Constructive</span
                    >. Avoid jargon. Explain exactly what happened and how to
                    fix it without blaming the user.
                  </div>
                  <div class="text-trustori-slate70 italic">
                    "We couldn't verify that code. Please check the serial
                    number and try again."
                  </div>
                </div>
                <div class="grid grid-cols-[1fr_2fr_2fr] p-6 gap-4">
                  <div class="font-medium text-trustori-slate90">
                    Legal & Compliance
                  </div>
                  <div class="text-trustori-slate60">
                    <span class="text-trustori-slate60 font-medium"
                      >Precise & Objective</span
                    >. Zero ambiguity. Use standard terminology where accuracy
                    is legally required.
                  </div>
                  <div class="text-trustori-slate70 italic">
                    "This asset was minted on the Ethereum blockchain on Jan 12,
                    2024."
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Logo Guidelines -->
          <section
            id="logo"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90">
              Logo Guidelines
            </h2>
            <p class="text-base text-trustori-slate70 max-w-3xl mb-8">
              The Trustori logo is the primary identifier of our brand. Proper
              usage ensures consistency and brand recognition across all
              touchpoints.
            </p>

            <div class="space-y-10">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Main Logo -->
                <div class="space-y-4">
                  <div
                    class="p-8 bg-white border border-trustori-slate20 rounded-xl flex items-center justify-center h-40 shadow-sm relative group overflow-hidden">
                    <img
                      src="@/assets/trustori_logo.svg"
                      alt="Trustori Main Logo"
                      class="h-10 w-auto relative z-10" />
                    <div
                      class="absolute inset-0 bg-trustori-blue50/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h4 class="font-medium text-trustori-slate90">Main Logo</h4>
                    <p class="text-xs text-trustori-slate60 mt-1">
                      Full color. Primary variant for light backgrounds.
                    </p>
                  </div>
                </div>

                <!-- Dark Logo -->
                <div class="space-y-4">
                  <div
                    class="p-8 bg-white border border-trustori-slate20 rounded-xl flex items-center justify-center h-40 shadow-sm relative group overflow-hidden">
                    <img
                      src="@/assets/trustori_logo_dark.svg"
                      alt="Trustori Dark Logo"
                      class="h-10 w-auto relative z-10" />
                    <div
                      class="absolute inset-0 bg-trustori-slate10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h4 class="font-medium text-trustori-slate90">Dark Logo</h4>
                    <p class="text-xs text-trustori-slate60 mt-1">
                      Monochrome Slate. Use when main color is too energetic.
                    </p>
                  </div>
                </div>

                <!-- Light Logo -->
                <div class="space-y-4">
                  <div
                    class="p-8 bg-trustori-slate100 rounded-xl flex items-center justify-center h-40 shadow-sm relative group overflow-hidden">
                    <img
                      src="@/assets/trustori_logo_light.svg"
                      alt="Trustori Light Logo"
                      class="h-10 w-auto relative z-10" />
                    <div
                      class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h4 class="font-medium text-trustori-slate90">
                      Light Logo
                    </h4>
                    <p class="text-xs text-trustori-slate60 mt-1">
                      Monochrome White. Required for dark backgrounds.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="p-12 bg-trustori-slate0 border border-trustori-slate20 rounded-md flex items-center justify-center relative overflow-hidden">
                <!-- Clear space visualization -->
                <div
                  class="relative p-8 border border-dashed border-trustori-blue40/50 rounded-sm">
                  <span
                    class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-trustori-blue50"
                    >x</span
                  >
                  <span
                    class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-trustori-blue50"
                    >x</span
                  >
                  <span
                    class="absolute top-1/2 -left-8 -translate-y-1/2 text-xs font-mono text-trustori-blue50"
                    >x</span
                  >
                  <span
                    class="absolute top-1/2 -right-8 -translate-y-1/2 text-xs font-mono text-trustori-blue50"
                    >x</span
                  >
                  <img
                    src="@/assets/trustori_logo.svg"
                    alt="Trustori Logo"
                    class="h-16 w-auto" />
                </div>
                <p
                  class="absolute bottom-4 right-4 text-xs text-trustori-slate50 font-mono">
                  x = Height of 'N'
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-medium text-trustori-slate90 mb-4">
                    Clear Space
                  </h3>
                  <p class="text-sm text-trustori-slate60 leading-relaxed">
                    Always maintain clear space around the logo to ensure
                    visibility and impact. The minimum clear space is defined as
                    'x', where 'x' is the height of the letter 'N' in the logo.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-trustori-slate90 mb-4">
                    Minimum Size
                  </h3>
                  <div
                    class="flex items-end gap-8 p-6 bg-trustori-slate0 rounded-md border border-trustori-slate10">
                    <div class="flex flex-col gap-2">
                      <img
                        src="@/assets/trustori_logo.svg"
                        alt="Trustori Logo"
                        class="h-8 w-auto" />
                      <span class="text-xs font-mono text-trustori-slate50"
                        >32px / 2rem</span
                      >
                    </div>
                    <div class="flex flex-col gap-2">
                      <img
                        src="@/assets/trustori_logo.svg"
                        alt="Trustori Logo"
                        class="h-6 w-auto" />
                      <span class="text-xs font-mono text-trustori-slate50"
                        >24px / 1.5rem</span
                      >
                    </div>
                  </div>
                  <p class="text-sm text-trustori-slate60 leading-relaxed mt-4">
                    The logo should never be rendered smaller than 24px in
                    height to maintain legibility.
                  </p>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-trustori-slate90 mb-6">
                  Misuse Examples (Don'ts)
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="space-y-3 group">
                    <div
                      class="aspect-video bg-trustori-slate0 border border-trustori-slate20 rounded-md flex items-center justify-center overflow-hidden relative">
                      <img
                        src="@/assets/trustori_logo.svg"
                        alt="Trustori Logo"
                        class="h-10 w-auto scale-x-[1.5] opacity-80" />
                      <div
                        class="absolute inset-0 bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="bg-red-600 text-white rounded-full p-1">
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p class="text-xs text-red-600 font-medium text-center">
                      Do not stretch
                    </p>
                  </div>
                  <div class="space-y-3 group">
                    <div
                      class="aspect-video bg-trustori-slate0 border border-trustori-slate20 rounded-md flex items-center justify-center overflow-hidden relative">
                      <img
                        src="@/assets/trustori_logo.svg"
                        alt="Trustori Logo"
                        class="h-10 w-auto rotate-12 opacity-80" />
                      <div
                        class="absolute inset-0 bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="bg-red-600 text-white rounded-full p-1">
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p class="text-xs text-red-600 font-medium text-center">
                      Do not rotate
                    </p>
                  </div>
                  <div class="space-y-3 group">
                    <div
                      class="aspect-video bg-trustori-slate0 border border-trustori-slate20 rounded-md flex items-center justify-center overflow-hidden relative">
                      <div class="relative">
                        <img
                          src="@/assets/trustori_logo.svg"
                          alt="Trustori Logo"
                          class="h-10 w-auto opacity-80 brightness-50 invert sepia(1) saturate(10000%) hue-rotate(120deg)" />
                      </div>
                      <div
                        class="absolute inset-0 bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="bg-red-600 text-white rounded-full p-1">
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p class="text-xs text-red-600 font-medium text-center">
                      Do not recolor
                    </p>
                  </div>
                  <div class="space-y-3 group">
                    <div
                      class="aspect-video bg-trustori-slate90 border border-trustori-slate20 rounded-md flex items-center justify-center overflow-hidden relative">
                      <img
                        src="@/assets/trustori_logo.svg"
                        alt="Trustori Logo"
                        class="h-10 w-auto opacity-50 contrast-50" />
                      <div
                        class="absolute inset-0 bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="bg-red-600 text-white rounded-full p-1">
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p class="text-xs text-red-600 font-medium text-center">
                      Do not use on low contrast
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Visual Identity -->
          <section
            id="visuals"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90">
              Visual Identity
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 class="text-xl font-medium text-trustori-slate90 mb-4">
                  Imagery Style
                </h3>
                <p class="text-trustori-slate60 mb-6">
                  Our imagery bridges the digital and physical worlds. It should
                  feel authentic, focusing on the human element behind the
                  technology.
                </p>
                <div class="space-y-4">
                  <div
                    class="h-48 rounded-md bg-gradient-to-br from-trustori-slate10 to-trustori-slate20 flex items-center justify-center border border-trustori-slate20">
                    <span class="text-trustori-slate50 italic"
                      >Human-focused photography placeholder</span
                    >
                  </div>
                  <div class="flex gap-4">
                    <div
                      class="h-24 flex-1 rounded-md bg-gradient-to-tr from-trustori-blue10 to-white border border-trustori-blue10"></div>
                    <div
                      class="h-24 flex-1 rounded-md bg-gradient-to-bl from-trustori-orange10 to-white border border-trustori-orange10"></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-medium text-trustori-slate90 mb-4">
                  Graphic Elements
                </h3>
                <p class="text-trustori-slate60 mb-6">
                  We use clean lines, ample whitespace, and subtle rounded
                  corners. Our "link" motif represents verification and
                  connection.
                </p>

                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="p-6 bg-trustori-slate0 border border-trustori-slate20 rounded-md">
                    <div
                      class="h-12 w-12 rounded-full border-2 border-trustori-blue50 flex items-center justify-center mb-2">
                      <div
                        class="h-2 w-2 bg-trustori-blue50 rounded-full"></div>
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >Connection Node</span
                    >
                  </div>
                  <div
                    class="p-6 bg-trustori-slate0 border border-trustori-slate20 rounded-md">
                    <div
                      class="w-full h-2 bg-trustori-slate10 rounded-full mb-3 overflow-hidden">
                      <div
                        class="h-full w-2/3 bg-trustori-blue50 rounded-full"></div>
                    </div>
                    <span class="text-xs font-mono text-trustori-slate50"
                      >Progress Line</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Color Usage -->
          <section
            id="color-usage"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90">
              Color Usage
            </h2>
            <p class="text-base text-trustori-slate70 max-w-3xl mb-8">
              While our palette is extensive, our usage is disciplined. We
              follow a 60-30-10 rule to maintain a clean, professional
              aesthetic.
            </p>

            <div
              class="w-full h-16 rounded-md flex overflow-hidden border border-trustori-slate20 mb-8">
              <div
                class="w-[60%] bg-trustori-slate0 flex items-center justify-center text-xs font-medium text-trustori-slate60">
                60% Neutral (Backgrounds/Surface)
              </div>
              <div
                class="w-[30%] bg-trustori-blue70 flex items-center justify-center text-xs font-medium text-white">
                30% Primary (Brand/Action)
              </div>
              <div
                class="w-[10%] bg-trustori-orange50 flex items-center justify-center text-xs font-medium text-white">
                10% Accent
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                class="bg-white p-6 rounded-md border border-trustori-slate20 shadow-sm">
                <h4 class="font-medium text-trustori-slate90 mb-2">Primary</h4>
                <div class="h-20 bg-trustori-blue70 rounded mb-3"></div>
                <p class="text-xs text-trustori-slate60">
                  Used for primary actions, header links, and key brand
                  elements.
                </p>
              </div>
              <div
                class="bg-white p-6 rounded-md border border-trustori-slate20 shadow-sm">
                <h4 class="font-medium text-trustori-slate90 mb-2">Neutral</h4>
                <div
                  class="h-20 bg-trustori-slate0 border border-trustori-slate10 rounded mb-3"></div>
                <p class="text-xs text-trustori-slate60">
                  Used for backgrounds, borders, and secondary text to reduce
                  visual load.
                </p>
              </div>
              <div
                class="bg-white p-6 rounded-md border border-trustori-slate20 shadow-sm">
                <h4 class="font-medium text-trustori-slate90 mb-2">Accent</h4>
                <div class="h-20 bg-trustori-orange50 rounded mb-3"></div>
                <p class="text-xs text-trustori-slate60">
                  Used sparingly for high-priority alerts, energetic highlights,
                  or "wow" moments.
                </p>
              </div>
            </div>
          </section>

          <!-- Motion & Interaction -->
          <section
            id="motion"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90">
              Motion & Interaction
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                class="bg-trustori-slate90 text-white p-8 rounded-2xl col-span-1 md:col-span-2 flex flex-col justify-center bento-card">
                <h3 class="text-2xl font-medium mb-4">Natural Easing</h3>
                <p class="text-gray-400 mb-8 max-w-md">
                  Objects should move with weight and momentum. Avoid linear
                  transitions. Use our standard cubic-bezier for consistency.
                </p>
                <div
                  class="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    class="absolute top-0 left-0 h-full w-1/3 bg-trustori-blue50 rounded-full animate-pulse"></div>
                </div>
                <p class="font-mono text-xs mt-4 text-trustori-blue20">
                  cubic-bezier(0.16, 1, 0.3, 1)
                </p>
              </div>
              <div
                class="bg-white border border-trustori-slate20 p-8 rounded-2xl bento-card flex flex-col items-center justify-center text-center">
                <div
                  class="w-16 h-16 bg-trustori-orange10 text-trustori-orange60 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M12 2v4" />
                    <path d="m16.2 7.8 2.9-2.9" />
                    <path d="M18 12h4" />
                    <path d="m16.2 16.2 2.9 2.9" />
                    <path d="M12 18v4" />
                    <path d="m4.9 19.1 2.9-2.9" />
                    <path d="M2 12h4" />
                    <path d="m4.9 4.9 2.9 2.9" />
                  </svg>
                </div>
                <h4 class="font-medium text-trustori-slate90">
                  Micro-interactions
                </h4>
                <p class="text-xs text-trustori-slate60 mt-2">
                  Delight users with subtle feedback.
                </p>
              </div>
            </div>
          </section>

          <!-- Writing Mechanics -->
          <section
            id="writing"
            class="space-y-12 scroll-m-24 fade-in-section py-16 px-0">
            <h2
              class="text-3xl font-medium tracking-tight mb-6 text-trustori-slate90">
              Writing Mechanics
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-trustori-slate90">Do's</h3>
                <ul class="space-y-4">
                  <li
                    class="flex items-start gap-3 text-sm text-trustori-slate70">
                    <svg
                      class="w-5 h-5 text-green-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      ><strong>Use Sentence Case</strong> for all headlines,
                      buttons, and navigation (e.g., "Sign up," not "Sign
                      Up").</span
                    >
                  </li>
                  <li
                    class="flex items-start gap-3 text-sm text-trustori-slate70">
                    <svg
                      class="w-5 h-5 text-green-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      ><strong>Be concise.</strong> If you can say it in three
                      words, don't use five.</span
                    >
                  </li>
                  <li
                    class="flex items-start gap-3 text-sm text-trustori-slate70">
                    <svg
                      class="w-5 h-5 text-green-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      ><strong>Focus on the user.</strong> Use "You" and "Your"
                      more than "We" or "Our."</span
                    >
                  </li>
                </ul>
              </div>
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-trustori-slate90">
                  Don'ts
                </h3>
                <ul class="space-y-4">
                  <li
                    class="flex items-start gap-3 text-sm text-trustori-slate70">
                    <svg
                      class="w-5 h-5 text-red-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span
                      ><strong>Don't use tech jargon</strong> like "hash,"
                      "node," or "distributed ledger" unless the user is an
                      admin.</span
                    >
                  </li>
                  <li
                    class="flex items-start gap-3 text-sm text-trustori-slate70">
                    <svg
                      class="w-5 h-5 text-red-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span
                      ><strong>Don't blame the user.</strong> Avoid "You entered
                      the wrong password." Use "Password not recognized."</span
                    >
                  </li>
                  <li
                    class="flex items-start gap-3 text-sm text-trustori-slate70">
                    <svg
                      class="w-5 h-5 text-red-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span
                      ><strong>Don't mix button styles.</strong> Stick to the
                      designated verb-noun structure (e.g., "Save
                      Changes").</span
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="mt-8 p-6 bg-trustori-slate0 border border-trustori-slate10 rounded-md">
              <h4
                class="text-sm font-medium text-trustori-slate90 uppercase tracking-wide mb-4">
                Date & Time Formatting
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span class="block text-xs text-trustori-slate50 mb-1"
                    >Standard Date</span
                  >
                  <span class="font-mono text-sm text-trustori-slate90"
                    >Jan 12, 2024</span
                  >
                </div>
                <div>
                  <span class="block text-xs text-trustori-slate50 mb-1"
                    >Full Date</span
                  >
                  <span class="font-mono text-sm text-trustori-slate90"
                    >January 12, 2024</span
                  >
                </div>
                <div>
                  <span class="block text-xs text-trustori-slate50 mb-1"
                    >Time</span
                  >
                  <span class="font-mono text-sm text-trustori-slate90"
                    >14:30 GMT</span
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* Global Vignette Glow */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(0, 71, 186, 0.03) 100%
  );
}

/* Animations */
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
  will-change: opacity, visibility;
}
.fade-in-section.is-visible {
  opacity: 1;
  transform: none;
}

/* Bento Card Utility */
.bento-card {
  border-radius: 8px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.bento-card:hover {
  border-color: #adccff; /* trustori-blue20 */
  box-shadow: 0 4px 8px -2px rgba(0, 71, 186, 0.05);
}
</style>
