document.addEventListener('DOMContentLoaded', () => {
  const cleaningSections = document.querySelectorAll('.cleaning');

  cleaningSections.forEach(section => {
    const tabsContainer = section.querySelector('.cleaning__tabs');
    const contentContainer = section.querySelector('.cleaning__content');
    if (!tabsContainer || !contentContainer) return;

    const tabs = tabsContainer.querySelectorAll('.cleaning__tab');
    const blocks = contentContainer.querySelectorAll('.cleaningBlock');

    tabsContainer.addEventListener('click', e => {
      const tab = e.target.closest('.cleaning__tab');
      if (!tab) return;

      const key = tab.dataset.clean;
      requestAnimationFrame(() => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        blocks.forEach(b => {
          b.classList.toggle('active', b.dataset.cleanBlock === key);
        });
      });
    });

    blocks.forEach(block => {
      const leftContainer = block.querySelector('.cleaningBlock__left');
      const rightContainer = block.querySelector('.cleaningBlock__right');
      if (!leftContainer || !rightContainer) return;

      const items = Array.from(leftContainer.querySelectorAll('.cleaningItem'));
      const descs = Array.from(
        rightContainer.querySelectorAll('.cleaningDesc')
      );
      const placeholder = descs.find(d => !d.dataset.itemBlock);

      function isMobile() {
        return window.innerWidth < 900;
      }

      function isSingleColumn() {
        return window.innerWidth <= 420;
      }

      function resetToRight() {
        descs.forEach(desc => {
          desc.classList.remove('active');
          if (desc.parentElement !== rightContainer) {
            rightContainer.appendChild(desc);
          }
        });
        items.forEach(i => i.classList.remove('active'));

        if (placeholder) {
          placeholder.classList.add('active');
        }
      }

      leftContainer.addEventListener('click', e => {
        const item = e.target.closest('.cleaningItem');
        if (!item) return;

        const id = item.dataset.item;
        const desc = descs.find(d => d.dataset.itemBlock === id);
        if (!desc) return;

        const index = items.indexOf(item);

        requestAnimationFrame(() => {
          const isActive = item.classList.contains('active');

          items.forEach(i => i.classList.remove('active'));
          descs.forEach(d => {
            d.classList.remove('active');
            if (isMobile() && d.parentElement !== rightContainer) {
              rightContainer.appendChild(d);
            }
          });

          if (isActive) {
            if (placeholder) placeholder.classList.add('active');
            return;
          }

          item.classList.add('active');
          desc.classList.add('active');
          if (placeholder) placeholder.classList.remove('active');

          if (!isMobile()) return;

          if (isSingleColumn()) {
            item.after(desc);
            return;
          }

          const rowStart = Math.floor(index / 2) * 2;
          const rowEndItem = items[rowStart + 1] || items[rowStart];

          desc.classList.add('wide');
          rowEndItem.after(desc);
        });
      });

      window.addEventListener('resize', () => {
        if (!isMobile()) {
          resetToRight();
        }
      });
    });

    function makeKeyboardable(selector) {
      section.querySelectorAll(selector).forEach(el => {
        el.setAttribute('tabindex', '0');
        el.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') el.click();
        });
      });
    }

    makeKeyboardable('.cleaning__tab');
    makeKeyboardable('.cleaningItem');
  });
});
