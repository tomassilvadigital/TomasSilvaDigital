/* Analytics apenas após consentimento explícito — GitHub Pages */
(() => {
  'use strict';
  const ID = 'G-YH14QPT81E';
  const KEY = 'tsd_analytics_consent_v1';
  let activated = false;
  let banner;

  function storedChoice() {
    try { const choice = localStorage.getItem(KEY); return choice === 'accepted' || choice === 'rejected' ? choice : null; }
    catch { return null; }
  }
  function saveChoice(choice) {
    try { localStorage.setItem(KEY, choice); } catch { /* Quando o armazenamento está bloqueado, pedir consentimento novamente na próxima visita. */ }
  }
  function removeGaCookies() {
    const known = document.cookie.split(';').map(x => x.trim().split('=')[0])
      .filter(n => /^_ga(?:_|$)/.test(n));
    const paths = ['/', '/TomasSilvaDigital/'];
    for (const name of known) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; path=${path}; SameSite=Lax`;
    }
  }
  function activateAnalytics() {
    if (activated) return;
    activated = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ID, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    script.onerror = () => console.warn('Não foi possível carregar o Google Analytics.');
    document.head.appendChild(script);
  }
  function hideBanner() { if (banner) banner.hidden = true; }
  function showBanner() {
    if (!banner) return;
    banner.hidden = false;
    const config = banner.querySelector('#tsd-consent-settings');
    if (config) config.hidden = true;
    banner.querySelector('#tsd-consent-accept')?.focus();
  }
  function decide(choice) {
    const previous = storedChoice();
    saveChoice(choice);
    hideBanner();
    if (choice === 'accepted') activateAnalytics();
    else if (previous === 'accepted' || activated) {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
      }
      removeGaCookies();
      // Remove a etiqueta previamente carregada da página reiniciando-a sem consentimento.
      window.location.reload();
    }
  }
  function addBanner() {
    banner = document.createElement('section');
    banner.id = 'tsd-consent';
    banner.setAttribute('aria-labelledby', 'tsd-consent-title');
    banner.setAttribute('role', 'region');
    banner.hidden = true;
    banner.innerHTML = `
      <div class="tsd-consent-panel">
        <h2 id="tsd-consent-title">Privacidade e estatísticas</h2>
        <p>Utilizamos armazenamento essencial para guardar a tua preferência. Com a tua autorização, usamos Google Analytics 4 para compreender visitas e cliques no website. Podes recusar sem perder acesso ao conteúdo.</p>
        <p>Consulta a nossa <a href="politica-privacidade.html">Política de Privacidade</a>. Podes mudar a decisão a qualquer momento no rodapé.</p>
        <div class="tsd-consent-settings" id="tsd-consent-settings" hidden>
          <label><input type="checkbox" checked disabled> Preferência de consentimento (necessária para guardar a decisão)</label>
          <label><input id="tsd-consent-analytics" type="checkbox"> Estatísticas (Google Analytics 4) — opcional</label>
        </div>
        <div class="tsd-consent-actions">
          <button type="button" id="tsd-consent-accept" class="tsd-consent-accept">Aceitar estatísticas</button>
          <button type="button" id="tsd-consent-reject" class="tsd-consent-reject">Rejeitar estatísticas</button>
          <button type="button" id="tsd-consent-options" class="tsd-consent-preferences" aria-expanded="false" aria-controls="tsd-consent-settings">Personalizar</button>
          <button type="button" id="tsd-consent-save" class="tsd-consent-preferences" hidden>Guardar preferências</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelector('#tsd-consent-accept').addEventListener('click', () => decide('accepted'));
    banner.querySelector('#tsd-consent-reject').addEventListener('click', () => decide('rejected'));
    const options = banner.querySelector('#tsd-consent-options');
    const settings = banner.querySelector('#tsd-consent-settings');
    const save = banner.querySelector('#tsd-consent-save');
    options.addEventListener('click', () => {
      settings.hidden = !settings.hidden;
      options.setAttribute('aria-expanded', String(!settings.hidden));
      save.hidden = settings.hidden;
    });
    save.addEventListener('click', () => decide(banner.querySelector('#tsd-consent-analytics').checked ? 'accepted' : 'rejected'));
    if (!storedChoice()) showBanner();
    else if (storedChoice() === 'accepted') activateAnalytics();
  }
  function addFooterControls() {
    const footer = document.querySelector('#site-footer .footer-bottom');
    if (!footer || footer.querySelector('.tsd-privacy-trigger')) return;
    const separator = document.createTextNode(' · ');
    const policy = document.createElement('a');
    policy.href = 'politica-privacidade.html';
    policy.textContent = 'Política de Privacidade';
    const anotherSeparator = document.createTextNode(' · ');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tsd-privacy-trigger';
    button.textContent = 'Preferências de privacidade';
    button.addEventListener('click', () => {
      const cb = banner.querySelector('#tsd-consent-analytics');
      cb.checked = storedChoice() === 'accepted';
      showBanner();
    });
    footer.append(separator, policy, anotherSeparator, button);
  }
  // Eventos não incluem nomes, email, telefone, nem conteúdo de formulários.
  document.addEventListener('click', event => {
    if (storedChoice() !== 'accepted' || !activated || typeof window.gtag !== 'function') return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (/^(https?:)?\/\/(?:www\.)?wa\.me\//i.test(href) || /api\.whatsapp\.com/i.test(href)) {
      window.gtag('event', 'click_whatsapp', { transport_type: 'beacon' });
    } else if (/contacto\.html(?:[?#]|$)/i.test(href) && (/or[cç]amento/i.test(link.textContent) || /or[cç]amento/i.test(link.getAttribute('aria-label') || ''))) {
      window.gtag('event', 'click_orcamento', { transport_type: 'beacon' });
    }
  }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addBanner, { once: true });
  else addBanner();
  document.addEventListener('layout:ready', addFooterControls);
  if (document.readyState !== 'loading') addFooterControls();
})();
