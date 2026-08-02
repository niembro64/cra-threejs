const getScrollableAncestor = (element: HTMLElement): HTMLElement | null => {
  let ancestor = element.parentElement;

  while (ancestor) {
    const { overflowY } = window.getComputedStyle(ancestor);
    if (/(auto|scroll|overlay)/.test(overflowY) && ancestor.scrollHeight > ancestor.clientHeight) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }

  return null;
};

export const scrollElementToVisualViewportBottom = (element: HTMLElement, bottomGap = 16): void => {
  const visualViewport = window.visualViewport;
  const viewportBottom = visualViewport ? visualViewport.offsetTop + visualViewport.height : window.innerHeight;
  const distanceBelowViewport = element.getBoundingClientRect().bottom - (viewportBottom - bottomGap);

  if (distanceBelowViewport <= 1) return;

  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const scrollableAncestor = getScrollableAncestor(element);

  if (scrollableAncestor) {
    scrollableAncestor.scrollBy({ top: distanceBelowViewport, behavior });
  } else {
    window.scrollBy({ top: distanceBelowViewport, behavior });
  }
};
