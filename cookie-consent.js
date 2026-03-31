// Cookie consent helper for d4riusTAX pages.
(function () {
  var STORAGE_KEY = "cookie_consent";
  var COOKIE_NAME = "cookie_consent";
  var COOKIE_DAYS = 180;

  function setCookie(name, value, days) {
    var expires = "";
    if (typeof days === "number") {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
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

  function getConsent() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "refused") {
        return stored;
      }
    } catch (error) {}

    var cookieValue = getCookie(COOKIE_NAME);
    if (cookieValue === "accepted" || cookieValue === "refused") {
      return cookieValue;
    }

    return "";
  }

  function persistConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {}

    setCookie(COOKIE_NAME, value, COOKIE_DAYS);
    document.documentElement.setAttribute("data-cookie-consent", value);
  }

  function updateBannerVisibility() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) {
      return;
    }

    var consent = getConsent();
    banner.style.display = consent ? "none" : "flex";

    if (consent) {
      document.documentElement.setAttribute("data-cookie-consent", consent);
    }
  }

  window.cookieChoice = function (accepted) {
    var value = accepted ? "accepted" : "refused";
    persistConsent(value);
    updateBannerVisibility();
  };

  window.getCookieConsent = getConsent;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateBannerVisibility);
  } else {
    updateBannerVisibility();
  }
})();
