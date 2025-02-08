export function useActiveSection() {
  let activeHeading = '';

  if (typeof window !== 'undefined') {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeHeading = entry.target.id;
          // Update active classes
          document.querySelectorAll('.toc-link').forEach((link) => {
            if (link.getAttribute('href') === `#${activeHeading}`) {
              link.classList.add('text-accent-foreground', 'font-medium');
              link.classList.remove('text-muted-foreground');
            } else {
              link.classList.remove('text-accent-foreground', 'font-medium');
              link.classList.add('text-muted-foreground');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -66%',
      threshold: 1.0
    });

    // Observe only h1 headings
    document.querySelectorAll('h1').forEach((heading) => {
      observer.observe(heading);
    });
  }
}
