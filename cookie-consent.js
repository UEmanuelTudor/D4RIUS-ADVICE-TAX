(function () {
  var STORAGE_KEY = "cookie_consent_v2";
  var COOKIE_NAME = "cookie_consent_v2";
  var COOKIE_DAYS = 180;

  function setCookie(name, value, days) {
    var expires = "";
    if (typeof days === "number") {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    var prefix = name + "=";
    var parts = document.cookie ? document.cookie.split(";") : [];
    for (var i = 0; i < parts.length; i++) {
      var cookie = parts[i].trim();
      if (cookie.indexOf(prefix) === 0) {
        return decodeURIComponent(cookie.substring(prefix.length));
      }
    }
    return "";
  }

  function getPrefs() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    var cookieValue = getCookie(COOKIE_NAME);
    if (cookieValue) {
      try { return JSON.parse(cookieValue); } catch (e) {}
    }
    return null;
  }

  function savePrefs(prefs) {
    prefs.necessary = true;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) {}
    setCookie(COOKIE_NAME, JSON.stringify(prefs), COOKIE_DAYS);
    document.documentElement.setAttribute("data-cookie-consent", JSON.stringify(prefs));
    applyServices(prefs);
  }

  function applyServices(prefs) {
    // Aici pornesti scripturi optionale in functie de categoria acceptata.
    // Exemplu: if (prefs.analytics) { /* incarca Google Analytics */ }
    window.cookiePrefs = prefs;
  }

  function showBanner() {
    var banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "flex";
  }
  function hideBanner() {
    var banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "none";
  }

  function showModal() {
    var modal = document.getElementById("cookie-modal-overlay");
    if (!modal) return;
    var prefs = getPrefs() || { necessary: true, functional: false, analytics: false };
    var fEl = document.getElementById("cookie-pref-functional");
    var aEl = document.getElementById("cookie-pref-analytics");
    if (fEl) fEl.checked = !!prefs.functional;
    if (aEl) aEl.checked = !!prefs.analytics;
    modal.style.display = "flex";
    hideBanner();
  }
  function hideModal() {
    var modal = document.getElementById("cookie-modal-overlay");
    if (modal) modal.style.display = "none";
  }

  function init() {
    var prefs = getPrefs();
    if (!prefs) { showBanner(); return; }
    document.documentElement.setAttribute("data-cookie-consent", JSON.stringify(prefs));
    applyServices(prefs);
    hideBanner();
  }

  // Butoane din banner
  window.cookieAcceptAll = function () {
    savePrefs({ necessary: true, functional: true, analytics: true });
    hideBanner(); hideModal();
  };
  window.cookieRefuseAll = function () {
    savePrefs({ necessary: true, functional: false, analytics: false });
    hideBanner(); hideModal();
  };

  // Buton "Salveaza preferintele" din meniul de editare
  window.cookieSavePrefs = function () {
    var fEl = document.getElementById("cookie-pref-functional");
    var aEl = document.getElementById("cookie-pref-analytics");
    savePrefs({
      necessary: true,
      functional: fEl ? fEl.checked : false,
      analytics: aEl ? aEl.checked : false
    });
    hideBanner(); hideModal();
  };

  // Apelat de butonul plutitor si de linkul din footer -> deschide meniul de editare
  window.openCookieBanner = function () { showModal(); };
  window.closeCookieModal = function () { hideModal(); };
  window.getCookieConsent = getPrefs;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();