
/* v91 patch 8/8 — translation dictionaries extracted for lighter boot parsing. */
'use strict';

const EXIT_DURATION = 360;
const ENTER_DELAY = 140;
const TRANSITION_LOCK = 560;
const LANG_FADE_OUT = 720;
const LANG_FADE_IN_DELAY = 120;
const LANGUAGE_STORAGE_KEY = 'moscatelli-studio-lang';

const SUPPORTED_LANGUAGES = ['en', 'it', 'pt'];
const TRANSLATION_PATHS = Object.freeze({
  en: './lang/en.json',
  it: './lang/it.json',
  pt: './lang/pt.json'
});
const translations = {};
let activeLanguageRequest = 0;
let appInitialized = false;
let pageLoaded = false;

function isSupportedLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

async function loadTranslation(lang) {
  if (!isSupportedLanguage(lang)) return null;
  if (translations[lang]) return translations[lang];

  try {
    const response = await fetch(TRANSLATION_PATHS[lang], { cache: 'force-cache', credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Translation ${lang} failed with ${response.status}`);
    translations[lang] = await response.json();
    return translations[lang];
  } catch (error) {
    console.error(`[Moscatelli Studio] Could not load ${lang} translations.`, error);
    return null;
  }
}

async function resolveInitialLanguage(preferredLang) {
  const fallback = await loadTranslation('en');
  if (!fallback) return 'en';
  if (preferredLang === 'en') return 'en';
  const preferred = await loadTranslation(preferredLang);
  return preferred ? preferredLang : 'en';
}

function runStartupSequence() {
  if (!appInitialized || !pageLoaded) return;
  body.classList.remove('preload', 'gate-active', 'session-returning');
  body.classList.add('gate-cleared', 'background-revealed');
  if (introVeil) {
    introVeil.setAttribute('aria-hidden', 'true');
    introVeil.style.display = 'none';
    introVeil.style.pointerEvents = 'none';
  }
  try { veilInput?.blur(); } catch (_) {}
  updateSectionSizing();
  requestAnimationFrame(() => scrollMobileNavToActive());
}


const state = {
  currentSection: 'home',
  currentIndex: 0,
  isTransitioning: false,
  menuOpen: false,
  hoveredNavIndex: 0,
  currentLang: 'en',
  openDetailKey: null,
  activeCodexFilter: null,
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
const navList = document.querySelector('.nav-list');
const railDots = Array.from(document.querySelectorAll('.rail-dot'));
const mobileNavBar = document.querySelector('.mobile-nav-bar');
let mobileNavItems = Array.from(document.querySelectorAll('.mobile-nav-item'));
let mobileNavBaseCount = mobileNavItems.length;
let mobileNavLoopJumping = false;
let mobileNavLoopRaf = 0;
let mobileNavSmoothRaf = 0;
let mobileNavSmoothScrolling = false;
let mobileNavLastScrollLeft = 0;
let mobileNavLastScrollTime = 0;
let mobileNavAnticipationTimer = 0;
let mobileNavSettleTimer = 0;
let mobileNavLastSyncedId = null;
let mobileNavFocusedTargetId = null;
let mobileNavLastFocusUpdate = 0;
const MOBILE_NAV_LIVE_FOCUS_INTERVAL = 110;
const MOBILE_NAV_FAST_SCROLL_DELTA = 18;
const NAV_ANTICIPATION_VELOCITY = 2;
const NAV_LOOP_RESISTANCE_DISTANCE = 40;
const SECTION_AMBIENTS = {
  home: 'rgba(182, 142, 88, 0.055)',
  briefing: 'rgba(58, 88, 138, 0.055)',
  atlas: 'rgba(48, 92, 150, 0.060)',
  vault: 'rgba(118, 52, 38, 0.058)',
  decisions: 'rgba(132, 76, 42, 0.056)',
  lotto: 'rgba(152, 110, 70, 0.055)',
  studio: 'rgba(136, 70, 36, 0.060)',
  signal: 'rgba(78, 86, 112, 0.052)',
  links: 'rgba(116, 48, 36, 0.055)'
};
const sections = Array.from(document.querySelectorAll('.section'));
const previewIndex = document.getElementById('nav-preview-index');
const previewTitle = document.getElementById('nav-preview-title');
const previewCopy = document.getElementById('nav-preview-copy');
const navPreviewShell = document.querySelector('.nav-preview-shell');
const introVeil = null; /* PATCH 4 OF 6: old PIN threshold DOM removed. */
const veilForm = null;
const veilPanel = null;
const veilInput = null;
const veilLabel = null;
const veilPinSlots = [];
const pointer = document.querySelector('.mc-pointer');
const langSwitchers = Array.from(document.querySelectorAll('[data-lang-switcher]'));
const langChoices = Array.from(document.querySelectorAll('.lang-choice'));
const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
const htmlNodes = Array.from(document.querySelectorAll('[data-i18n-html]'));
const detailTriggers = Array.from(document.querySelectorAll('.is-detail-trigger'));
const detailOverlay = document.getElementById('detail-overlay');
const detailImage = document.getElementById('detail-image');
const detailKicker = document.getElementById('detail-kicker');
const detailTitle = document.getElementById('detail-title');
const detailBody = document.getElementById('detail-body');
const detailCloseButtons = Array.from(document.querySelectorAll('[data-detail-close]'));
const codexFilters = Array.from(document.querySelectorAll('[data-codex-filter]'));
const codexRows = Array.from(document.querySelectorAll('.archive-row'));
const supplierDeskPanel = document.getElementById('supplier-desk-panel');
const supplierDeskButtons = Array.from(document.querySelectorAll('[data-action="toggle-supplier-desk"]'));
const galleryGrid = document.getElementById('gallery-grid');
const galleryDots = Array.from(document.querySelectorAll('.gallery-dot'));
const mobileLayoutQuery = window.matchMedia('(max-width: 768px)');

const sectionIds = sections.map(section => section.id.replace('section-', ''));
const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
const pointerState = { enabled: false, visible: false, frame: 0, x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
let lastPointerTarget = null;
let spotlightFrame = 0;
let spotlightTimer = 0;
let spotlightLastCommit = 0;
let pendingSpotlightX = window.innerWidth * 0.5;
let pendingSpotlightY = window.innerHeight * 0.5;
const SPOTLIGHT_UPDATE_INTERVAL = 48;

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

function getTranslationValue(path, lang = state.currentLang) {
  const source = translations[lang] || translations.en || {};
  return path.split('.').reduce((accumulator, part) => accumulator && accumulator[part], source);
}

function t(path, lang = state.currentLang) {
  return getTranslationValue(path, lang) ?? getTranslationValue(path, 'en') ?? path;
}

function getSectionLabel(section) {
  return t(section?.dataset.labelKey || 'sections.threshold');
}

function setDocumentLanguage(lang) {
  body.dataset.lang = lang;
  root.lang = lang === 'pt' ? 'pt-BR' : lang;
}

function syncLanguageSwitchers() {
  langSwitchers.forEach(switcher => {
    switcher.dataset.lang = state.currentLang;
    const choices = switcher.querySelectorAll('.lang-choice');
    choices.forEach(choice => {
      const active = choice.dataset.lang === state.currentLang;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  });
}

function updateStaticTranslations() {
  /* PATCH 3 OF 6 — use cached i18n lists for the main text/html passes. */
  textNodes.forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });

  htmlNodes.forEach(node => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(node => {
    node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel));
  });

  document.querySelectorAll('[data-i18n-dashboard-detail]').forEach(node => {
    node.setAttribute('data-dashboard-detail', t(node.dataset.i18nDashboardDetail));
  });

  document.querySelectorAll('[data-i18n-status-detail]').forEach(node => {
    node.setAttribute('data-status-detail', t(node.dataset.i18nStatusDetail));
  });

  document.querySelectorAll('[data-i18n-last-change]').forEach(node => {
    node.setAttribute('data-last-change', t(node.dataset.i18nLastChange));
  });

  document.title = t('page.title');
}

function updateHeaderMeta(section) {
  const label = getSectionLabel(section);
  const index = section?.dataset.index || '01';

  sectionLabel.style.opacity = '0';
  sectionIndex.style.opacity = '0';

  window.setTimeout(() => {
    sectionLabel.textContent = label;
    sectionIndex.textContent = index;
    sectionLabel.style.opacity = '1';
    sectionIndex.style.opacity = '1';
  }, 120);
}

function setBodySection(id) {
  body.dataset.section = id;
}



function initializeMobileNavLoop() {
  /* PATCH 3 OF 6 — simplified mobile navigation.
     The old version cloned the mobile nav into prev/base/next sets, then
     constantly measured offsetLeft/offsetWidth during scroll. This single-set
     version keeps the same navigation behaviour without the infinite-loop cost. */
  if (!mobileNavBar) return;
  mobileNavItems = Array.from(mobileNavBar.querySelectorAll('.mobile-nav-item'));
  mobileNavBaseCount = mobileNavItems.length;
  mobileNavBar.dataset.loopReady = 'single';
  mobileNavBar.dataset.loopScrollReady = 'single';
  updateMobileNavFocusByTarget(state.currentSection || 'home');
}

function getMobileNavLoopMetrics() { return null; }
function setMobileNavLoopResistance(active) {
  if (!mobileNavBar) return;
  mobileNavBar.classList.toggle('is-loop-resisting', Boolean(active));
}
function normalizeMobileNavLoopScroll() {}
function updateMobileNavLoopResistance() {}
function clearMobileNavAnticipation() {
  if (mobileNavAnticipationTimer) {
    window.clearTimeout(mobileNavAnticipationTimer);
    mobileNavAnticipationTimer = 0;
  }
  mobileNavItems.forEach(item => item.classList.remove('anticipating'));
}
function getCenteredMobileNavItem() {
  if (!mobileNavBar || !mobileNavItems.length) return null;
  const center = mobileNavBar.scrollLeft + (mobileNavBar.clientWidth / 2);
  return mobileNavItems.reduce((best, item) => {
    if (!best) return item;
    const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
    const bestCenter = best.offsetLeft + (best.offsetWidth / 2);
    return Math.abs(itemCenter - center) < Math.abs(bestCenter - center) ? item : best;
  }, null);
}
function updateMobileNavAnticipation() { clearMobileNavAnticipation(); }
function settleMobileNavAfterScroll() {
  if (!mobileNavBar) return;
  clearMobileNavAnticipation();
  updateMobileNavFocusByTarget(state.currentSection);
}
function scheduleMobileNavSettle() {
  if (mobileNavSettleTimer) window.clearTimeout(mobileNavSettleTimer);
  mobileNavSettleTimer = window.setTimeout(() => {
    mobileNavSettleTimer = 0;
    settleMobileNavAfterScroll();
  }, 140);
}
function handleMobileNavScrollMotion() { scheduleMobileNavSettle(); }
function bindMobileNavLoopScroll() {
  if (!mobileNavBar || mobileNavBar.dataset.loopScrollReady === 'true') return;
  mobileNavBar.dataset.loopScrollReady = 'true';
  mobileNavBar.addEventListener('scroll', () => {
    if (mobileNavLoopRaf) return;
    mobileNavLoopRaf = requestAnimationFrame(() => {
      mobileNavLoopRaf = 0;
      handleMobileNavScrollMotion();
    });
  }, { passive: true });
}
function getCircularNavDistance(indexA, indexB, total) {
  if (indexA < 0 || indexB < 0 || total <= 0) return Infinity;
  const direct = Math.abs(indexA - indexB);
  return Math.min(direct, total - direct);
}
function updateMobileNavFocusByTarget(targetId) {
  if (!targetId || !mobileNavItems.length) return;
  const focusIndex = sectionIds.indexOf(targetId);
  const total = sectionIds.length;
  if (focusIndex < 0 || total <= 0) return;

  mobileNavFocusedTargetId = targetId;
  mobileNavItems.forEach(item => {
    const itemIndex = sectionIds.indexOf(item.dataset.target);
    const distance = Math.abs(itemIndex - focusIndex);
    const isFocused = item.dataset.target === targetId;
    const isCurrentPage = item.dataset.target === state.currentSection;
    item.classList.toggle('active', isFocused);
    item.classList.toggle('near-active', distance === 1 && !isFocused);
    item.classList.toggle('far-active', distance === 2 && !isFocused);
    item.classList.toggle('current-page', isCurrentPage);
  });
}
function updateMobileNavFocusFromCenter(options = {}) {
  if (options.force) updateMobileNavFocusByTarget(state.currentSection);
}
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function getMobileNavTargetScroll(item) {
  if (!mobileNavBar || !item) return null;
  return item.offsetLeft - ((mobileNavBar.clientWidth - item.offsetWidth) / 2);
}
function getBestMobileNavItemForTarget(targetId) {
  if (!targetId) return null;
  return mobileNavItems.find(item => item.dataset.target === targetId) || null;
}
function scrollMobileNavToTarget(targetId) {
  if (!mobileNavBar || !mobileNavItems.length || !targetId) return;
  const targetItem = getBestMobileNavItemForTarget(targetId);
  if (!targetItem) return;

  updateMobileNavFocusByTarget(targetId);

  if (typeof targetItem.scrollIntoView === 'function') {
    targetItem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  } else {
    const target = getMobileNavTargetScroll(targetItem);
    if (Number.isFinite(target)) mobileNavBar.scrollLeft = target;
  }
}
function scrollMobileNavToActive() {
  scrollMobileNavToTarget(state.currentSection);
}

function prepareMobileNavLabelTransition(id) {
  if (!mobileNavItems.length || mobileNavLastSyncedId === null || mobileNavLastSyncedId === id) {
    mobileNavLastSyncedId = id;
    return;
  }

  const outgoingLabels = mobileNavItems
    .filter(item => item.dataset.target === mobileNavLastSyncedId)
    .map(item => item.querySelector('span:last-child'))
    .filter(Boolean);

  const incomingLabels = mobileNavItems
    .filter(item => item.dataset.target === id)
    .map(item => item.querySelector('span:last-child'))
    .filter(Boolean);

  outgoingLabels.forEach(label => label.classList.add('is-exiting'));
  incomingLabels.forEach(label => label.classList.add('is-entering'));

  requestAnimationFrame(() => {
    incomingLabels.forEach(label => label.classList.remove('is-entering'));
  });

  window.setTimeout(() => {
    outgoingLabels.forEach(label => label.classList.remove('is-exiting'));
    incomingLabels.forEach(label => label.classList.remove('is-entering'));
  }, 220);

  mobileNavLastSyncedId = id;
}

function applySectionAmbientToNav(id) {
  const ambient = SECTION_AMBIENTS[id] || 'rgba(235, 226, 210, 0.045)';
  if (mobileNavBar) mobileNavBar.style.setProperty('--nav-ambient', ambient);
  body.style.setProperty('--body-ambient', ambient);
}

function syncActiveNav(id) {
  prepareMobileNavLabelTransition(id);

  navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  railDots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === id));

  mobileNavItems.forEach(item => {
    item.classList.toggle('current-page', item.dataset.target === id);
    item.classList.remove('anticipating');
  });

  updateMobileNavFocusByTarget(id);
  applySectionAmbientToNav(id);
  scrollMobileNavToTarget(id);
}


function updateNavListAccent(item) {
  if (!navList || !item) return;
  window.requestAnimationFrame(() => {
    if (!navList || !item.isConnected) return;
    const listRect = navList.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const y = itemRect.top - listRect.top + (itemRect.height / 2);
    const height = Math.max(24, itemRect.height * 0.60);
    navList.style.setProperty('--nav-accent-y', `${y}px`);
    navList.style.setProperty('--nav-accent-height', `${height}px`);
    navList.style.setProperty('--nav-accent-scale', '1');
    navList.classList.add('has-accent');
  });
}

function setPreviewContentFromItem(item) {
  if (!item) return;
  previewIndex.textContent = item.dataset.index || '01';
  previewTitle.textContent = t(item.dataset.previewTitleKey || 'sections.threshold');
  previewCopy.textContent = t(item.dataset.previewCopyKey || 'preview.threshold');
}

function applyPreviewAmbientFromItem(item) {
  if (!navPreviewShell || !item) return;
  const ambient = SECTION_AMBIENTS[item.dataset.section] || 'rgba(235, 226, 210, 0.045)';
  navPreviewShell.style.setProperty('--preview-ambient', ambient);
}

function updatePreviewFromItem(item) {
  if (!item) return;
  const previewNodes = [previewIndex, previewTitle, previewCopy].filter(Boolean);

  previewNodes.forEach(node => node.classList.add('is-swapping'));
  applyPreviewAmbientFromItem(item);
  updateNavListAccent(item);

  requestAnimationFrame(() => {
    setPreviewContentFromItem(item);
    requestAnimationFrame(() => {
      previewNodes.forEach(node => node.classList.remove('is-swapping'));
    });
  });

  navItems.forEach(entry => {
    const isActive = state.menuOpen ? entry === item : entry.dataset.section === state.currentSection;
    entry.classList.toggle('active', isActive);
  });
}

function isMobileLayout() { return mobileLayoutQuery.matches; }

function getTransitionTiming() {
  return isMobileLayout()
    ? { exit: 200, enter: 110, lock: 330 }
    : { exit: EXIT_DURATION, enter: ENTER_DELAY, lock: TRANSITION_LOCK };
}

function syncGalleryDots() {
  if (!galleryGrid || !galleryDots.length) return;
  const cards = Array.from(galleryGrid.querySelectorAll('.gallery-cell'));
  if (!cards.length) return;

  if (!isMobileLayout()) {
    galleryDots.forEach((dot, index) => dot.classList.toggle('active', index === 0));
    return;
  }

  const center = galleryGrid.scrollLeft + (galleryGrid.clientWidth * 0.5);
  let activeIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + (card.offsetWidth * 0.5);
    const distance = Math.abs(center - cardCenter);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeIndex = index;
    }
  });

  galleryDots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
}

function bindGalleryTracking() {
  if (!galleryGrid || !galleryDots.length) return;
  let rafId = 0;
  const onScroll = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      syncGalleryDots();
      rafId = 0;
    });
  };
  galleryGrid.addEventListener('scroll', onScroll, { passive: true });
  syncGalleryDots();
}


function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 0;
}

function getSectionAvailableHeight(section) {
  const style = window.getComputedStyle(section);
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;
  return Math.max(0, getViewportHeight() - paddingTop - paddingBottom);
}

/* PATCH 3 OF 6 — JAVASCRIPT PERFORMANCE REPAIR
   Measure only the active section. The previous version iterated through every
   hidden section, wrote inline styles, and then read scrollHeight/offsetHeight/
   getBoundingClientRect, which caused unnecessary layout recalculation. */
function updateSectionSizing() {
  const activeSection = getActiveSection();
  if (!activeSection) {
    updateHeaderScrolled();
    return;
  }

  const mobile = isMobileLayout();

  sections.forEach(section => {
    if (section !== activeSection) {
      section.classList.remove('is-scrollable');
      return;
    }

    const inner = section.querySelector('.section-inner');
    if (!inner) return;

    if (mobile) {
      inner.style.maxHeight = 'none';
      inner.style.height = 'auto';
      inner.style.overflow = 'visible';
      section.classList.add('is-scrollable');
      updateHeaderScrolled();
      return;
    }

    inner.style.maxHeight = '';
    inner.style.height = '';
    inner.style.overflow = '';

    const availableHeight = getSectionAvailableHeight(section);
    const needsScroll = inner.scrollHeight > availableHeight - 2 || inner.clientHeight > availableHeight - 2;

    section.classList.toggle('is-scrollable', needsScroll);
    if (!needsScroll) section.scrollTop = 0;
  });

  updateHeaderScrolled();
}

function updateHeaderScrolled() {
  const activeSection = getActiveSection();
  if (!activeSection) return;
  header.classList.toggle('scrolled', activeSection.scrollTop > 24 || body.classList.contains('detail-open'));
}

/* PATCH 4 OF 6 — old PIN threshold helpers removed/neutralised.
   HQ is direct-entry only; Studio Index will eventually carry PWA/threshold duties. */
function focusPinInput() {}
function requestPinKeyboard() {}
function bindVeilFocusInteractions() {}
function resetPinFeedback() {}
function flashVeilError() {}
function updatePinSlots() {}
function sanitizePinValue(value = '') { return String(value || '').replace(/\D/g, '').slice(0, 6); }
function rememberGateSession() {}
function hasGateSession() { return true; }

function completeGateClear() {
  body.classList.add('gate-cleared');
  body.classList.remove('gate-active', 'session-returning');
  requestAnimationFrame(() => scrollMobileNavToActive());
  introVeil?.setAttribute('aria-hidden', 'true');
  veilInput?.blur();
  if (introVeil) {
    introVeil.style.pointerEvents = 'none';
    introVeil.style.display = 'none';
  }
}

function unlockGate() {
  completeGateClear();
}

function handleVeilSubmit(event) {
  event?.preventDefault?.();
  completeGateClear();
}

function revealVeilSequence() {
  completeGateClear();
}

function revealReturningSessionMiniThreshold() {
  completeGateClear();
}


function goToSection(targetId) {
  if (state.isTransitioning || targetId === state.currentSection || body.classList.contains('detail-open')) return;
  const current = getSection(state.currentSection);
  const next = getSection(targetId);
  if (!next) return;

  const timing = getTransitionTiming();
  state.isTransitioning = true;
  const fromIndex = getSectionPosition(state.currentSection);
  const toIndex = getSectionPosition(targetId);
  const directionClass = toIndex > fromIndex ? 'transition-forward' : 'transition-backward';
  body.classList.remove('transition-forward', 'transition-backward');
  body.classList.add('is-transitioning', directionClass);

  if (current) {
    current.classList.remove('active');
    current.classList.add('exiting');
    window.setTimeout(() => { current.classList.remove('exiting'); current.scrollTop = 0; }, timing.exit);
  }

  state.currentSection = targetId;
  state.currentIndex = toIndex;
  window.__moscatelliObserveActiveSection?.();
  updateHeaderMeta(next);
  syncActiveNav(targetId);
  setBodySection(targetId);
  updatePreviewFromItem(getNavItemBySection(targetId));

  window.setTimeout(() => {
    next.classList.add('active');
    next.scrollTop = 0;
    updateHeaderScrolled();
    scheduleSectionSizing();
    window.setTimeout(scheduleSectionSizing, 80);
    syncGalleryDots();
  }, timing.enter);

  window.setTimeout(() => {
    state.isTransitioning = false;
    body.classList.remove('is-transitioning', 'transition-forward', 'transition-backward');
    updateSectionSizing();
    syncGalleryDots();
  }, timing.lock);
}

function goHome() { goToSection('home'); }
function goRelative(step) {
  if (!sectionIds.length) return;
  const nextIndex = (state.currentIndex + step + sectionIds.length) % sectionIds.length;
  goToSection(sectionIds[nextIndex]);
}

function openMenu() {
  if (state.menuOpen || body.classList.contains('gate-active') || body.classList.contains('detail-open')) return;
  state.menuOpen = true;
  navOverlay.classList.add('open');
  navOverlay.setAttribute('aria-hidden', 'false');
  menuToggle?.setAttribute('aria-expanded', 'true');
  body.classList.add('menu-open');
  const activeNav = getNavItemBySection(state.currentSection);
  state.hoveredNavIndex = Math.max(0, navItems.indexOf(activeNav));
  updatePreviewFromItem(activeNav);
}

function closeMenu() {
  if (!state.menuOpen && !navOverlay?.classList.contains('open')) return;
  state.menuOpen = false;

  if (navOverlay) {
    navOverlay.classList.remove('is-opening');

    const finishClosing = event => {
      if (event && event.target !== navOverlay) return;
      if (event && event.type === 'transitionend' && event.propertyName !== 'opacity' && event.propertyName !== 'transform') return;
      navOverlay.classList.remove('open', 'is-closing');
      navOverlay.removeEventListener('transitionend', finishClosing);
      body.classList.remove('menu-open');
    };

    navOverlay.addEventListener('transitionend', finishClosing);
    navOverlay.setAttribute('aria-hidden', 'true');
    menuToggle?.setAttribute('aria-expanded', 'false');

    window.requestAnimationFrame(() => {
      navOverlay.classList.add('is-closing');
    });

    window.setTimeout(finishClosing, 1100);
    return;
  }

  navOverlay?.classList.remove('open', 'is-closing');
  navOverlay?.setAttribute('aria-hidden', 'true');
  menuToggle?.setAttribute('aria-expanded', 'false');
  body.classList.remove('menu-open');
}


function updateSpotlight() { /* Patch 1/6: live spotlight disabled for performance. */ }

function commitSpotlightUpdate() { spotlightFrame = 0; spotlightTimer = 0; }

function scheduleSpotlightUpdate() { /* Patch 1/6: no per-pointer full-page repaint. */ }

function enableCustomPointer() { disableCustomPointer(); }
function disableCustomPointer() {
  pointerState.enabled = false;
  pointerState.visible = false;
  if (pointerState.frame) {
    cancelAnimationFrame(pointerState.frame);
    pointerState.frame = 0;
  }
  root.classList.remove('has-mc-pointer');
  pointer?.classList.remove('is-visible', 'is-hover-text', 'is-hover-action', 'is-hover-media', 'is-hover-input', 'is-pressed');
}
function showPointer() {
  if (!pointerState.enabled || !pointer || pointerState.visible) return;
  pointerState.visible = true;
  pointer.classList.add('is-visible');
}
function hidePointer() {
  pointerState.visible = false;
  if (!pointer) return;
  pointer.classList.remove('is-visible', 'is-pressed');
}
function movePointer() { /* Patch 1/6: custom cursor disabled. */ }

function classifyPointerTarget(target) {
  if (!pointer) return;
  const isAction = !!target.closest('a, button, [role="button"], [data-action], .nav-item, .rail-dot, .mobile-nav-item, .archive-row, .gallery-cell, .header-logo, .menu-toggle, .contact-link, .contact-email, .btn-primary, .btn-ghost, .btn-back, .lang-choice, .detail-close, .vault-filter, .directory-item, .directory-status');
  const isInput = !!target.closest('input, textarea, select, [contenteditable="true"]');
  const isMedia = !!target.closest('.gallery-cell, .focus-panel, .side-note, .veil-panel, .studio-figure, .team-card, .circuit-note, .detail-dialog');
  const isText = !isAction && (!!target.closest('p, h1, h2, h3, blockquote, .sub, .studio-sub, .contact-invite, .archive-sub, .detail-body, .gallery-meta') || isInput);
  pointer.classList.toggle('is-hover-action', isAction);
  pointer.classList.toggle('is-hover-media', !isAction && !isInput && isMedia);
  pointer.classList.toggle('is-hover-text', !isAction && isText);
  pointer.classList.toggle('is-hover-input', !isAction && isInput);
}

function bindSectionScrolls() {
  sections.forEach(section => {
    section.addEventListener('scroll', () => { if (section.classList.contains('active')) updateHeaderScrolled(); }, { passive: true });
  });
}

let sectionSizingFrame = 0;
function scheduleSectionSizing() {
  if (sectionSizingFrame) cancelAnimationFrame(sectionSizingFrame);
  sectionSizingFrame = requestAnimationFrame(() => {
    sectionSizingFrame = 0;
    updateSectionSizing();
  });
}

function bindSectionSizingObservers() {
  /* PATCH 3 OF 6 — observe the active section only. */
  let observedInner = null;
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(() => scheduleSectionSizing()) : null;

  function observeActiveInner() {
    if (!resizeObserver) return;
    const activeInner = getActiveSection()?.querySelector('.section-inner') || null;
    if (activeInner === observedInner) return;

    if (observedInner) resizeObserver.unobserve(observedInner);
    observedInner = activeInner;
    if (observedInner) resizeObserver.observe(observedInner);
  }

  window.__moscatelliObserveActiveSection = observeActiveInner;
  observeActiveInner();

  document.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', scheduleSectionSizing, { once: true });
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleSectionSizing, { passive: true });
  }
}

function persistLanguage(lang) { try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch (error) {} }
function getStoredLanguage() { try { return window.localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch (error) { return null; } }

function detectBrowserLanguage() {
  const langs = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || 'en'];

  const normalized = langs
    .filter(Boolean)
    .map(lang => String(lang).toLowerCase());

  if (normalized.some(lang => lang.startsWith('it'))) return 'it';
  if (normalized.some(lang => lang === 'pt-br' || lang.startsWith('pt'))) return 'pt';
  return 'en';
}

function populateDetail() {
  if (!state.openDetailKey) return;
  const detail = t(`details.${state.openDetailKey}`);
  if (!detail) return;
  detailKicker.textContent = detail.kicker || '';
  detailTitle.textContent = detail.title || '';
  detailBody.innerHTML = detail.body || '';

  if (detail.image) {
    detailImage.style.opacity = '0';
    detailImage.style.transition = '';
    detailImage.onload = null;
    detailImage.alt = detail.alt || '';
    detailOverlay.classList.remove('no-media');

    detailImage.onload = () => {
      detailImage.style.transition = 'opacity 380ms ease';
      detailImage.style.opacity = '1';
      detailImage.onload = null;
    };

    detailImage.src = detail.image;

    if (detailImage.complete) {
      detailImage.style.transition = 'opacity 380ms ease';
      detailImage.style.opacity = '1';
      detailImage.onload = null;
    }
  } else {
    detailImage.onload = null;
    detailImage.removeAttribute('src');
    detailImage.alt = '';
    detailImage.style.opacity = '1';
    detailOverlay.classList.add('no-media');
  }
}

function openDetail(key) {
  if (!key) return;
  state.openDetailKey = key;
  populateDetail();
  body.classList.add('detail-open');
  detailOverlay.classList.add('open');
  detailOverlay.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => updateHeaderScrolled());
}

function closeDetail() {
  if (!state.openDetailKey) return;
  state.openDetailKey = null;
  body.classList.remove('detail-open');
  detailOverlay.classList.remove('open');
  detailOverlay.setAttribute('aria-hidden', 'true');
  requestAnimationFrame(() => updateHeaderScrolled());
}

function updateCodexFilter() {
  const filter = state.activeCodexFilter;
  codexFilters.forEach(btn => {
    const active = btn.dataset.codexFilter === filter;
    btn.classList.toggle('is-filter-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  codexRows.forEach(row => {
    if (!filter) {
      row.classList.remove('is-filter-hidden');
      return;
    }
    const categories = (row.dataset.categories || '').split(/\s+/);
    row.classList.toggle('is-filter-hidden', !categories.includes(filter));
  });
  window.setTimeout(updateSectionSizing, 20);
}

function applyLanguage(immediate = false) {
  setDocumentLanguage(state.currentLang);
  syncLanguageSwitchers();

  const performUpdate = () => {
    updateStaticTranslations();
    updateHeaderMeta(getActiveSection());
    const previewSource = state.menuOpen ? navItems[state.hoveredNavIndex] || getNavItemBySection(state.currentSection) : getNavItemBySection(state.currentSection);
    updatePreviewFromItem(previewSource);
    if (state.openDetailKey) populateDetail();
    scheduleSectionSizing();
    window.setTimeout(scheduleSectionSizing, 90);
  };

  if (immediate) {
    performUpdate();
    return;
  }

  body.classList.add('lang-switching');
  window.setTimeout(() => {
    performUpdate();
  }, LANG_FADE_OUT + 10);
  window.setTimeout(() => {
    body.classList.remove('lang-switching');
    scheduleSectionSizing();
    scrollMobileNavToActive();
  }, LANG_FADE_OUT + LANG_FADE_IN_DELAY);
}

async function setLanguage(lang, immediate = false) {
  if (!isSupportedLanguage(lang)) return;
  const requestId = ++activeLanguageRequest;
  const loaded = await loadTranslation(lang);
  if (!loaded || requestId !== activeLanguageRequest) return;
  state.currentLang = lang;
  persistLanguage(lang);
  applyLanguage(immediate);
}

menuToggle?.addEventListener('click', () => { state.menuOpen ? closeMenu() : openMenu(); });
menuClose?.addEventListener('click', closeMenu);

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => { state.hoveredNavIndex = navItems.indexOf(item); updatePreviewFromItem(item); });
  item.addEventListener('click', () => { closeMenu(); window.setTimeout(() => goToSection(item.dataset.section), 70); });
});

langChoices.forEach(choice => { choice.addEventListener('click', () => setLanguage(choice.dataset.lang)); });

detailTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => openDetail(trigger.dataset.detail));
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(trigger.dataset.detail); }
  });
});

detailCloseButtons.forEach(btn => btn.addEventListener('click', closeDetail));

codexFilters.forEach(button => {
  button.addEventListener('click', () => {
    state.activeCodexFilter = state.activeCodexFilter === button.dataset.codexFilter ? null : button.dataset.codexFilter;
    updateCodexFilter();
  });
});

function toggleSupplierDesk(forceOpen = null) {
  if (!supplierDeskPanel) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !supplierDeskPanel.classList.contains('is-open');
  supplierDeskPanel.hidden = !shouldOpen;
  supplierDeskPanel.classList.toggle('is-open', shouldOpen);
  supplierDeskPanel.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
  supplierDeskButtons.forEach(button => button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false'));
  window.setTimeout(() => {
    scheduleSectionSizing();
    if (shouldOpen) supplierDeskPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, shouldOpen ? 40 : 0);
}

document.addEventListener('click', event => {
  if (event.target.closest('[data-placeholder-link]')) {
    event.preventDefault();
    return;
  }
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;
  const action = trigger.dataset.action;
  switch (action) {
    case 'go-home': goHome(); break;
    case 'go-section': if (trigger.dataset.target) goToSection(trigger.dataset.target); break;
    case 'toggle-supplier-desk': toggleSupplierDesk(); break;
    case 'open-menu': openMenu(); break;
    default: break;
  }
});

/* Former PIN form submit disabled in HQ direct-entry mode. */
/* Former PIN pointer focus disabled. */
/* Former PIN touch focus disabled. */
/* Former PIN input listeners disabled. */
document.addEventListener('keydown', event => {
  const isLanguageControl = !!event.target.closest('.lang-switcher');
  if (event.key === 'Escape') {
    if (state.openDetailKey) { closeDetail(); return; }
    if (state.menuOpen) { closeMenu(); return; }
  }

  if (state.menuOpen) {
    if (event.key === 'ArrowDown') { event.preventDefault(); state.hoveredNavIndex = (state.hoveredNavIndex + 1) % navItems.length; updatePreviewFromItem(navItems[state.hoveredNavIndex]); }
    if (event.key === 'ArrowUp') { event.preventDefault(); state.hoveredNavIndex = (state.hoveredNavIndex - 1 + navItems.length) % navItems.length; updatePreviewFromItem(navItems[state.hoveredNavIndex]); }
    if (event.key === 'Enter') { event.preventDefault(); const selected = navItems[state.hoveredNavIndex] || getNavItemBySection(state.currentSection); if (!selected) return; closeMenu(); window.setTimeout(() => goToSection(selected.dataset.section), 70); }
    return;
  }

  if (state.openDetailKey) return;
  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); goRelative(1); }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goRelative(-1); }
  if (event.key.toLowerCase() === 'm') { event.preventDefault(); openMenu(); }
  if (event.key.toLowerCase() === 'h') { event.preventDefault(); goHome(); }
});

/* Patch 1/6: pointermove/mousemove spotlight and custom cursor handlers removed for performance. */
window.addEventListener('pointerdown', () => { if (!pointerState.enabled || !pointer) return; pointer.classList.add('is-pressed'); }, { passive: true });
window.addEventListener('pointerup', () => pointer?.classList.remove('is-pressed'), { passive: true });
window.addEventListener('pointerleave', hidePointer, { passive: true });
window.addEventListener('blur', hidePointer, { passive: true });

pointerQuery.addEventListener('change', disableCustomPointer);

window.addEventListener('load', () => {
  pageLoaded = true;
  runStartupSequence();
});
window.addEventListener('resize', () => { scheduleSectionSizing(); syncGalleryDots(); }, { passive: true });

(async function init() {
  const storedLang = getStoredLanguage();
  const preferredLang = isSupportedLanguage(storedLang) ? storedLang : detectBrowserLanguage();
  state.currentLang = await resolveInitialLanguage(preferredLang);
  const homeSection = getSection('home');
  if (homeSection) { homeSection.classList.add('active'); state.currentSection = 'home'; state.currentIndex = 0; }
  disableCustomPointer();
  initializeMobileNavLoop();
  bindSectionScrolls();
  bindSectionSizingObservers();
  syncActiveNav('home');
  setBodySection('home');
  applyLanguage(true);
  bindVeilFocusInteractions();
  bindGalleryTracking();
  updatePinSlots('');
  updateCodexFilter();
  updateSpotlight(window.innerWidth * 0.5, window.innerHeight * 0.5);
  updateSectionSizing();
  syncGalleryDots();
  appInitialized = true;
  runStartupSequence();
})();


// PWA foundation
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  window.deferredInstallPrompt = deferredInstallPrompt;
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  window.deferredInstallPrompt = null;
});
if ('serviceWorker' in navigator) {
  /* PATCH 4 OF 6 — PWA removed from HQ. Unregister old service workers so stale heavy shells do not control testing/deployment. */
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations?.()
      .then(registrations => registrations.forEach(registration => registration.unregister()))
      .catch(() => {});
  });
}


document.addEventListener('visibilitychange', () => {
  if (!document.hidden && body.classList.contains('gate-active') && !body.classList.contains('session-returning') && body.classList.contains('form-revealed')) {
    requestPinKeyboard();
  }
});

if (typeof mobileLayoutQuery.addEventListener === 'function') {
  mobileLayoutQuery.addEventListener('change', () => { scheduleSectionSizing(); syncGalleryDots(); });
} else if (typeof mobileLayoutQuery.addListener === 'function') {
  mobileLayoutQuery.addListener(() => { scheduleSectionSizing(); syncGalleryDots(); });
}
