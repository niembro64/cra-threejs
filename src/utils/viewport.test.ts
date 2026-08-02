import { scrollElementToVisualViewportBottom } from './viewport';

describe('visual viewport scrolling', () => {
  it('scrolls only enough to place an element at the visible viewport bottom', () => {
    const target = document.createElement('button');
    document.body.appendChild(target);
    jest.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      bottom: 940,
    } as DOMRect);

    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: { height: 800, offsetTop: 20 },
    });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches: true }),
    });
    const scrollBy = jest.fn();
    Object.defineProperty(window, 'scrollBy', { configurable: true, value: scrollBy });

    scrollElementToVisualViewportBottom(target, 16);

    expect(scrollBy).toHaveBeenCalledWith({ top: 136, behavior: 'auto' });
    target.remove();
  });
});
