document
  .querySelectorAll("ul > li")
  .forEach((e) => e.addEventListener("click", () => alert("WIP")));

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
   * @private
   * @param {string} hash
   * @param {boolean} mode
   */
  toggleHashClasses(hash, mode) {
    console.log(hash);
    const selectors = this.map.get(hash);
    if (selectors !== undefined) {
      console.log(selectors);
      for (const [selector, classes] of selectors) {
        console.log(selector);
        console.log(classes);
        document.querySelectorAll(selector).forEach((elem) => {
          console.log(elem);
          elem.classList.toggle(...classes, mode);
        });
      }
    }
  }

  /**
   * @method
   * @public
   * @param {string} prev
   * @param {string} curr
   */
  handleHashChange(prev, curr) {
    console.log(`prev: ${prev}, curr: ${curr}`);
    this.toggleHashClasses(prev, Registry.REMOVE_MODE);
    this.toggleHashClasses(curr, Registry.ADD_MODE);
  }
}

const registry = new Registry();

registry.add("me", "section#me", ["appear"]);

window.addEventListener("hashchange", (e) => {
  const prev = e.oldURL.substring(e.oldURL.indexOf("#") + 1);
  const curr = e.newURL.substring(e.newURL.indexOf("#") + 1);
  registry.handleHashChange(prev, curr);
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
