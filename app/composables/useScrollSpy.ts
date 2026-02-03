import { ref, onMounted, onUnmounted } from 'vue'

export default function useScrollSpy (navigationGroups: any[]) {
  const activeSection = ref('')

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150 // Increased offset for better feel
    
    // Get all sections and their offsets
    const sections = navigationGroups
      .flatMap(g => g.items)
      .map(item => {
        const el = document.getElementById(item.id)
        return {
          id: item.id,
          offsetTop: el ? el.offsetTop : 0,
          height: el ? el.offsetHeight : 0
        }
      })
      .filter(section => section.offsetTop > 0)
      .sort((a, b) => a.offsetTop - b.offsetTop)
    
    // Find the section that is currently at the top of the viewport
    let current = ''
    for (const section of sections) {
      if (scrollPosition >= section.offsetTop) {
        current = section.id
      } else {
        break // Stop at the first section that is below the scroll position
      }
    }
    
    // Optional: If we are at the very bottom, highlight the last section
    const lastSection = sections[sections.length - 1]
    if (lastSection && window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = lastSection.id
    }

    if (current) {
      activeSection.value = current
    }
  }

  const setupFadeInObserver = () => {
    if (!process.client || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section)
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial delay to ensure DOM is fully ready and IDs are rendered
    setTimeout(() => {
        handleScroll()
        setupFadeInObserver()
    }, 100)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    activeSection
  }
}
