(() => {
  // <stdin>
  var sidebar = document.querySelector("aside.sidebar");
  var menuTrigger = document.querySelector("button.menu-trigger");
  var menuTriggerClose = document.querySelector("button.menu-trigger-close");
  var menuOpacity = document.querySelector("div.menu-overlay");
  var toggleSidebar = () => {
    if (sidebar.classList.contains("!translate-x-0")) {
      sidebar.classList.remove("!translate-x-0");
      menuOpacity.classList.add("hidden");
    } else {
      sidebar.classList.add("!translate-x-0");
      menuOpacity.classList.remove("hidden");
    }
  };
  menuTrigger.addEventListener("click", toggleSidebar);
  menuTriggerClose.addEventListener("click", toggleSidebar);
  menuOpacity.addEventListener("click", toggleSidebar);
  var scrollElement = document.querySelector(".scroll-area");
  var scrollElementStateKey = "ScrollElementPosition";
  window.onbeforeunload = function() {
    if (!scrollElement) return;
    const scrollPos = scrollElement.scrollTop;
    if (scrollPos) {
      localStorage.setItem(scrollElementStateKey, scrollPos);
    }
  };
  window.onload = function() {
    const scrollPos = localStorage.getItem(scrollElementStateKey);
    localStorage.removeItem(scrollElementStateKey);
    if (scrollElement) {
      scrollElement.scrollTop = scrollPos;
    }
  };
  var darkModeToggle = document.querySelector(".dark-mode-toggle");
  var darkModeStateKey = "DarkMode";
  var isDark = JSON.parse(localStorage.getItem(darkModeStateKey) || "false");
  if (isDark) {
    document.documentElement.classList.add("dark");
  }
  darkModeToggle.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(darkModeStateKey, false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem(darkModeStateKey, true);
    }
  });
  var storageKeys = {
    sectionHiddenKeyPrefix: "sectionHiddenState_"
  };
  document.querySelectorAll(".toggle-section-btn").forEach((button) => {
    const targetId = button.getAttribute("data-target");
    const section = document.getElementById(targetId);
    const showIcon = button.querySelector(".section-show-icon");
    const hideIcon = button.querySelector(".section-hide-icon");
    const syncStateWithStorage = () => {
      const storedValue = localStorage.getItem(`${storageKeys.sectionHiddenKeyPrefix}${targetId}`);
      const sectionHidden = JSON.parse(storedValue || "false");
      section.classList.toggle("hidden", sectionHidden);
      showIcon.classList.toggle("hidden", sectionHidden);
      hideIcon.classList.toggle("hidden", !sectionHidden);
    };
    const togglePostSection = () => {
      const isHidden = section.classList.toggle("hidden");
      localStorage.setItem(`${storageKeys.sectionHiddenKeyPrefix}${targetId}`, JSON.stringify(isHidden));
      syncStateWithStorage();
    };
    button.addEventListener("click", togglePostSection);
    syncStateWithStorage();
  });
})();
