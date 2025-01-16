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
   * @type {Map<String, Map<String, Array<String>>>}
   */
  map;

  constructor() {
    this.map = new Map();
  }

  /**
   * @method
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

registry.add("me", "li#me", ["focused"]);
registry.add("projects", "li#projects", ["focused"]);
registry.add("interests", "li#interests", ["focused"]);

const initialHash = window.location.hash.substring(1);
registry.handleHashChange("", initialHash);

window.addEventListener("hashchange", (e) => {
  const curr = e.newURL.substring(e.newURL.indexOf("#") + 1);
  registry.handleHashChange(curr);
});

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

theme.addEventListener("click", () => document.body.classList.toggle("dark"));
