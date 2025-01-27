/* -------------.
 *              |
 *   WIP NOTE   |
 *              |
 */ // ---------`

// alert("This site is a Work In Progress");

/* ----------------.
 *                 |
 *   VIMIUM NOTE   |
 *                 |
 */ // ------------`

// alert(
//   "This site has key bindings (try `?`). If you have Vimium, you should turn it of for this site",
// );

/* --------------------.
 *                     |
 *   CONTENT MANAGER   |
 *                     |
 * to switch classes   |
 * on element by the   |
 * value of the URL    |
 * hash (after the #)  |
 *                     |
 */ // ----------------`

class Registry {
  /**
   * @private
   * @type {boolean}
   */
  static ADD_MODE = true;
  /**
   * @private
   * @type {boolean}
   */
  static REMOVE_MODE = false;

  /**
   * @private
   * @type {Map.<String, Map.<String, Array.<String>>>}
   */
  map;

  constructor() {
    this.map = new Map();
  }

  /**
   * @method
   * @public
   * @param {string} hash
   * @returns {boolean}
   */
  hasHash(hash) {
    return this.map.has(hash);
  }

  /**
   * @method
   * @public
   * @param {string} hash
   * @param {string} selector
   * @param {Array.<string>} classes
   */
  add(hash, selector, classes) {
    let selectors = this.map.get(hash);
    if (selectors === undefined) {
      selectors = new Map();
    }
    selectors.set(selector, classes);
    this.map.set(hash, selectors);
  }

  /**
   * @method
   * @public
   * @param {string} currHash
   */
  handleHashChange(currHash) {
    for (const [hash, selectors] of this.map) {
      let mode = Registry.REMOVE_MODE;
      if (hash === currHash) {
        console.log(`${hash} === ${currHash}`);
        mode = Registry.ADD_MODE;
      }

      for (const [selector, classes] of selectors) {
        document.querySelectorAll(selector).forEach((elem) => {
          elem.classList.toggle(...classes, mode);
        });
      }
    }
  }
}

const registry = new Registry();

registry.add("", "h1#hero", ["appear"]);

registry.add("me", "section#me", ["appear"]);
registry.add("projects", "section#projects", ["appear"]);
registry.add("interests", "section#interests", ["appear"]);

registry.add("help", "section#help", ["appear"]);

registry.add("404", "section#code-404", ["appear"]);

registry.add("me", "li#me > a", ["focused"]);
registry.add("projects", "li#projects > a", ["focused"]);
registry.add("interests", "li#interests > a", ["focused"]);

window.addEventListener("hashchange", (e) => {
  const curr = e.newURL.substring(e.newURL.indexOf("#") + 1);
  if (registry.hasHash(curr)) {
    registry.handleHashChange(curr);
  } else {
    registry.handleHashChange("404");
  }
});

/* ------------------------.
 *                         |
 *   HANDLE INITIAL HASH   |
 *                         |
 */ // --------------------`

const initialHash = window.location.hash;
window.location.hash = "#404";
window.location.hash = initialHash;

/* ----------------.
 *                 |
 *   404 BUBBLES   |
 *                 |
 */ // ------------`

const bubbles = document.getElementsByClassName("code-404");

for (const bubble of bubbles) {
  bubble.style.fontSize = "0em";

  const interval = randomInt(400, 5000);
  setInterval(() => {
    const x = randomInt(20, 80);
    const y = randomInt(20, 80);
    const fontSize = randomInt(1, 8);
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;
    bubble.style.fontSize = `${fontSize}em`;
  }, interval);
}

/**
 * @function
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* --------------------.
 *                     |
 *   BLINKING CURSOR   |
 *                     |
 */ // ----------------`

const cursor = document.getElementById("cursor");

setInterval(() => {
  cursor.classList.toggle("disappear");
}, 1000);

/* -------------------.
 *                    |
 *   THEME SWITCHER   |
 *                    |
 */ // ---------------`

const theme = document.getElementById("theme");

theme.addEventListener("click", toggleTheme);

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const dark = document.documentElement.classList.contains("dark");
  localStorage.theme = dark ? "dark" : "light";
}

/* ----------------.
 *                 |
 *   FULL SCREEN   |
 *                 |
 */ // ------------`

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen().catch((err) => {
      console.error(`Error attempting to exit fullscreen: ${err.message}`);
    });
  }
}

/* -----------------.
 *                  |
 *   KEY BINDINGS   |
 *                  |
 */ // -------------`

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "t":
      toggleTheme();
      break;
    case "f":
      toggleFullscreen();
      break;
    case "m":
      if (e.ctrlKey) {
        window.location.hash = "me";
      } else {
        return;
      }
      break;
    case "p":
      if (e.ctrlKey) {
        window.location.hash = "projects";
      } else {
        return;
      }
      break;
    case "i":
      if (e.ctrlKey) {
        window.location.hash = "interests";
      } else {
        return;
      }
      break;
    case "?":
      window.location.hash = "help";
      break;
    case "Escape":
      window.location.hash = "";
      break;
    default:
      return;
  }
  e.preventDefault();
});
