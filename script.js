/* ═══════════════════════════════════════════════════
   SHELL — script.js
   Organised: state → elements → helpers → gate →
   navigation → pointer → events → init
════════════════════════════════════════════════════ */

'use strict';

const EXIT_DURATION = 520;
const ENTER_DELAY = 610;
const TRANSITION_LOCK = 1500;
const GATE_SUCCESS_DELAY = 760;
const PANEL_REVEAL_DELAY = 200;
const BACKGROUND_REVEAL_DELAY = 80;
const WORDMARK_REVEAL_DELAY = 800;
const SUBMARK_REVEAL_DELAY = 1200;
const FORM_REVEAL_DELAY = 1800;
const FONT_REVEAL_FALLBACK = 3000;

const state = {
  currentSection: 'home',
  currentIndex: 0,
  isTransitioning: false,
  menuOpen: false,
  hoveredNavIndex: 0,
};

const header = document.getElementById('site-header');
const body = document.body;
const root = document.documentElement;
const navOverlay = document.getElementById('nav-overlay');
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sectionLabel = document.getElementById('section-label');
const sectionIndex = document.getElementById('section-index');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const railDots = Array.from(document.querySelectorAll('.rail-dot'));
const sections = Array.from(document.querySelectorAll('.section'));
const previewIndex = document.getElementById('nav-preview-index');
const previewTitle = document.getElementById('nav-preview-title');
const previewCopy = document.getElementById('nav-preview-copy');
const introVeil = document.getElementById('intro-veil');
const veilForm = document.getElementById('veil-form');
const veilInput = document.getElementById('veil-input');
const veilMark = document.getElementById('veil-mark');
const veilSubmark = document.getElementById('veil-submark');
const veilLabel = document.getElementById('veil-label');
const pointer = document.querySelector('.mc-pointer');

const sectionIds = sections.map(section => section.id.replace('section-', ''));
const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
const pointerState = {
  enabled: false,
  visible: false,
};

function getSection(id) {
  return document.getElementById(`section-${id}`);
}

function getSectionPosition(id) {
  return sectionIds.indexOf(id);
}

function getNavItemBySection(id) {
  return navItems.find(item => item.dataset.section === id);
}

function getActiveSection() {
  return getSection(state.currentSection);
}

function updateHeaderMeta(section) {
  const label = section?.dataset.label || 'Home';
  const index = section?.dataset.index || '01';

  sectionLabel.style.opacity = '0';
  sectionIndex.style.opacity = '0';

  setTimeout(() => {
    sectionLabel.textContent = label;
    sectionIndex.textContent = index;
    sectionLabel.style.opacity = '1';
    sectionIndex.style.opacity = '1';
  }, 120);
}

function setBodySection(id) {
  body.dataset.section = id;
}

function syncActiveNav(id) {
  navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  railDots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === id));
}

function updatePreviewFromItem(item) {
  if (!item) return;

  previewIndex.textContent = item.dataset.index || '01';
  previewTitle.textContent = item.dataset.previewTitle || item.textContent.trim();
  previewCopy.textContent = item.dataset.previewCopy || '';

  navItems.forEach(entry => {
    const isActive = state.menuOpen ? entry === item : entry.dataset.section === state.currentSection;
    entry.classList.toggle('active', isActive);
  });
}

function updateSectionSizing() {
  sections.forEach(section => {
    const inner = section.querySelector('.section-inner');
    if (!inner) return;

    const style = window.getComputedStyle(section);
    const availableHeight = window.innerHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const needsScroll = inner.scrollHeight > availableHeight - 2;

    section.classList.toggle('is-scrollable', needsScroll);
    if (!needsScroll) section.scrollTop = 0;
  });

  updateHeaderScrolled();
}

function updateHeaderScrolled() {
  const activeSection = getActiveSection();
  if (!activeSection) return;
  header.classList.toggle('scrolled', activeSection.scrollTop > 24);
}

function flashVeilError() {
  if (!veilLabel) return;

  veilLabel.classList.remove('is-error');
  void veilLabel.offsetWidth;
  veilLabel.classList.add('is-error');
  setTimeout(() => veilLabel.classList.remove('is-error'), 1100);
}

function unlockGate() {
  if (veilForm) veilForm.classList.add('is-success');

  setTimeout(() => {
    body.classList.add('gate-cleared');
    body.classList.remove('gate-active');

    if (introVeil) introVeil.setAttribute('aria-hidden', 'true');
    if (veilInput) veilInput.blur();

    setTimeout(() => {
      if (introVeil) introVeil.style.pointerEvents = 'none';
    }, 1200);
  }, GATE_SUCCESS_DELAY);
}

function handleVeilSubmit(event) {
  event.preventDefault();
  if (!veilInput) return;

  const value = veilInput.value.trim().toLowerCase();
  if (value === 'silentium') {
    unlockGate();
    return;
  }

  veilInput.value = '';
  flashVeilError();
  veilInput.focus();
}

function revealVeilSequence() {
  const fontsReady = document.fonts?.ready
    ? Promise.race([
        document.fonts.ready.catch(() => undefined),
        new Promise(resolve => window.setTimeout(resolve, FONT_REVEAL_FALLBACK)),
      ])
    : Promise.resolve();

  window.setTimeout(() => {
    body.classList.add('background-revealed');
  }, BACKGROUND_REVEAL_DELAY);

  window.setTimeout(() => {
    body.classList.add('panel-revealed');
  }, PANEL_REVEAL_DELAY);

  Promise.all([fontsReady, new Promise(resolve => window.setTimeout(resolve, WORDMARK_REVEAL_DELAY))]).then(() => {
    body.classList.add('wordmark-revealed');
  });

  window.setTimeout(() => {
    body.classList.add('submark-revealed');
  }, SUBMARK_REVEAL_DELAY);

  window.setTimeout(() => {
    body.classList.add('form-revealed');
  }, FORM_REVEAL_DELAY);
}

function goToSection(targetId) {
  if (state.isTransitioning || targetId === state.currentSection) return;

  const current = getSection(state.currentSection);
  const next = getSection(targetId);
  if (!next) return;

  state.isTransitioning = true;

  const fromIndex = getSectionPosition(state.currentSection);
  const toIndex = getSectionPosition(targetId);
  const directionClass = toIndex > fromIndex ? 'transition-forward' : 'transition-backward';

  body.classList.remove('transition-forward', 'transition-backward');
  body.classList.add('is-transitioning', directionClass);

  if (current) {
    current.classList.remove('active');
    current.classList.add('exiting');

    setTimeout(() => {
      current.classList.remove('exiting');
      current.scrollTop = 0;
    }, EXIT_DURATION);
  }

  state.currentSection = targetId;
  state.currentIndex = toIndex;

  updateHeaderMeta(next);
  syncActiveNav(targetId);
  setBodySection(targetId);
  updatePreviewFromItem(getNavItemBySection(targetId));

  setTimeout(() => {
    next.classList.add('active');
    next.scrollTop = 0;
    updateHeaderScrolled();
  }, ENTER_DELAY);

  setTimeout(() => {
    state.isTransitioning = false;
    body.classList.remove('is-transitioning', 'transition-forward', 'transition-backward');
    updateSectionSizing();
  }, TRANSITION_LOCK);
}

function goHome() {
  goToSection('home');
}

function goRelative(step) {
  const nextIndex = state.currentIndex + step;
  if (nextIndex < 0 || nextIndex >= sectionIds.length) return;
  goToSection(sectionIds[nextIndex]);
}

function openMenu() {
  if (state.menuOpen || body.classList.contains('gate-active')) return;

  state.menuOpen = true;
  navOverlay.classList.add('open');
  navOverlay.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  body.classList.add('menu-open');

  const activeNav = getNavItemBySection(state.currentSection);
  state.hoveredNavIndex = Math.max(0, navItems.indexOf(activeNav));
  updatePreviewFromItem(activeNav);
}

function closeMenu() {
  if (!state.menuOpen) return;

  state.menuOpen = false;
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  body.classList.remove('menu-open');
}

function updateSpotlight(x, y) {
  body.style.setProperty('--spot-x', `${x}px`);
  body.style.setProperty('--spot-y', `${y}px`);
}

function enableCustomPointer() {
  if (!pointer || !pointerQuery.matches) return;
  pointerState.enabled = true;
  root.classList.add('has-mc-pointer');
}

function disableCustomPointer() {
  pointerState.enabled = false;
  root.classList.remove('has-mc-pointer');
  if (pointer) {
    pointer.classList.remove('is-visible', 'is-hover-text', 'is-hover-action', 'is-hover-media', 'is-pressed');
  }
}

function showPointer() {
  if (!pointerState.enabled || !pointer) return;
  pointer.classList.add('is-visible');
}

function hidePointer() {
  if (!pointer) return;
  pointer.classList.remove('is-visible', 'is-pressed');
}

function movePointer(x, y) {
  if (!pointerState.enabled || !pointer) return;
  pointer.style.left = `${x}px`;
  pointer.style.top = `${y}px`;
}

function classifyPointerTarget(target) {
  if (!pointer) return;

  const isAction = !!target.closest(
    'a, button, [role="button"], [data-action], .nav-item, .rail-dot, .archive-row, .gallery-cell, .header-logo, .menu-toggle, .contact-link, .contact-email, .btn-primary, .btn-ghost, .btn-back'
  );
  const isInput = !!target.closest('input, textarea, select, [contenteditable="true"]');
  const isMedia = !!target.closest('.gallery-cell, .focus-panel, .side-note, .veil-panel');
  const isText = !isAction && (!!target.closest('p, h1, h2, h3, blockquote, .sub, .studio-sub, .contact-invite') || isInput);

  pointer.classList.toggle('is-hover-action', isAction);
  pointer.classList.toggle('is-hover-media', !isAction && !isInput && isMedia);
  pointer.classList.toggle('is-hover-text', !isAction && isText);
  pointer.classList.toggle('is-hover-input', !isAction && isInput);
}

function bindSectionScrolls() {
  sections.forEach(section => {
    section.addEventListener('scroll', () => {
      if (section.classList.contains('active')) updateHeaderScrolled();
    }, { passive: true });
  });
}

menuToggle?.addEventListener('click', () => {
  state.menuOpen ? closeMenu() : openMenu();
});

menuClose?.addEventListener('click', closeMenu);

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    state.hoveredNavIndex = navItems.indexOf(item);
    updatePreviewFromItem(item);
  });

  item.addEventListener('click', () => {
    closeMenu();
    setTimeout(() => goToSection(item.dataset.section), 70);
  });
});

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;

  const action = trigger.dataset.action;

  switch (action) {
    case 'go-home':
      goHome();
      break;
    case 'go-section':
      if (trigger.dataset.target) goToSection(trigger.dataset.target);
      break;
    case 'open-menu':
      openMenu();
      break;
    default:
      break;
  }
});

if (veilForm) {
  veilForm.addEventListener('submit', handleVeilSubmit);
}

if (veilInput) {
  veilInput.addEventListener('keydown', event => {
    if (event.key === 'Escape') event.stopPropagation();
  });
}

document.addEventListener('keydown', event => {
  if (body.classList.contains('gate-active') && event.target !== veilInput) {
    if (event.key === 'Tab') return;
    event.preventDefault();
    veilInput?.focus();
    return;
  }

  if (event.key === 'Escape' && state.menuOpen) {
    closeMenu();
    return;
  }

  if (state.menuOpen) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      state.hoveredNavIndex = (state.hoveredNavIndex + 1) % navItems.length;
      updatePreviewFromItem(navItems[state.hoveredNavIndex]);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      state.hoveredNavIndex = (state.hoveredNavIndex - 1 + navItems.length) % navItems.length;
      updatePreviewFromItem(navItems[state.hoveredNavIndex]);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selected = navItems[state.hoveredNavIndex] || getNavItemBySection(state.currentSection);
      if (!selected) return;
      closeMenu();
      setTimeout(() => goToSection(selected.dataset.section), 70);
    }
    return;
  }

  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;

  if (event.key === 'ArrowRight' || event.key === 'PageDown') {
    event.preventDefault();
    goRelative(1);
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    goRelative(-1);
  }

  if (event.key.toLowerCase() === 'm') {
    event.preventDefault();
    openMenu();
  }

  if (event.key.toLowerCase() === 'h') {
    event.preventDefault();
    goHome();
  }
});

window.addEventListener('pointermove', event => {
  if (!pointerState.enabled) return;
  movePointer(event.clientX, event.clientY);
  updateSpotlight(event.clientX, event.clientY);
  showPointer();
  classifyPointerTarget(event.target);
}, { passive: true });

window.addEventListener('mousemove', event => {
  updateSpotlight(event.clientX, event.clientY);
}, { passive: true });

window.addEventListener('pointerdown', () => {
  if (!pointerState.enabled || !pointer) return;
  pointer.classList.add('is-pressed');
}, { passive: true });

window.addEventListener('pointerup', () => {
  if (!pointer) return;
  pointer.classList.remove('is-pressed');
}, { passive: true });

window.addEventListener('pointerleave', hidePointer, { passive: true });
window.addEventListener('blur', hidePointer, { passive: true });

pointerQuery.addEventListener('change', event => {
  if (event.matches) {
    enableCustomPointer();
  } else {
    disableCustomPointer();
  }
});

window.addEventListener('load', () => {
  body.classList.remove('preload');
  updateSectionSizing();
  revealVeilSequence();

  if (body.classList.contains('gate-active') && veilInput) {
    setTimeout(() => veilInput.focus(), FORM_REVEAL_DELAY + 160);
  }
});

window.addEventListener('resize', updateSectionSizing, { passive: true });

(function init() {
  const homeSection = getSection('home');
  if (homeSection) {
    homeSection.classList.add('active');
    state.currentSection = 'home';
    state.currentIndex = 0;
  }

  enableCustomPointer();
  bindSectionScrolls();
  syncActiveNav('home');
  setBodySection('home');
  updateHeaderMeta(homeSection);
  updatePreviewFromItem(getNavItemBySection('home'));
  updateSpotlight(window.innerWidth * 0.5, window.innerHeight * 0.5);
  updateSectionSizing();
})();
