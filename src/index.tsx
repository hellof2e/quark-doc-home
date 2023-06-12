import { QuarkElement, Fragment, state, property, customElement } from "quarkc"
import style from "./index.less?inline"
import langs from "./lang"
import quarkLogo from "./images/quark-logo.png"
import arrow2 from "./images/arrow2.png"
import arrowLight from "./images/arrow-light.png"
import iDownLight from "./images/i-down-light.png"
import iDown from "./images/i-down.png"
import "quark-doc-header"

declare global {
  interface HTMLElementTagNameMap {
    "quark-doc-home": QuarkDocHome;
  }
}

@customElement({ tag: "quark-doc-home", style })
export default class QuarkDocHome extends QuarkElement {
  #isZhLang
  #ecosystemLangs
  #framework

  constructor() {
    super()
    this.#isZhLang = localStorage.getItem("language") === "zh-CN"
    this.#ecosystemLangs = this.#isZhLang ? langs["zh-CN"] : langs["en-US"]
    this.#framework = ["Vue2.x", "Vue3.x", "React", "Angular", "Svelte", "Vanilla"]
  }

  @state()
  darkMode = false

  @state()
  activeFwIndex = 0

  @state()
  timeInter = null

  componentDidMount() {
    if(localStorage.getItem('theme') === 'dark') {
      this.darkMode = true;
    }

    this.timeInter = setInterval(() => {
      if (this.activeFwIndex >= 5) {
        this.activeFwIndex = 0;
      } else {
        this.activeFwIndex ++;
      }
    }, 3000);

    console.log(this.shadowRoot.querySelector("#we-believe"), this.shadowRoot.querySelector("#scroll-down"), 22);

    const scrollDown = this.shadowRoot.querySelector("#scroll-down")

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        console.log(entries, 989);

        // 进入视窗
        if (entries[0].isIntersecting) {
          console.log(1);

          scrollDown.style.opacity = 0;
        } else {
          console.log(2);
          scrollDown.style.opacity = 1;
        }
      }
    )
    intersectionObserver.observe(this.shadowRoot.querySelector("#we-believe"));


    // this.activeFwIndex = new Proxy({}, {
    //   get: function(target, name){
    //     console.log(target, name, 111);
    //     this.shadowRoot.querySelector(".tech-name").style.animation =
    //     "3s infinite text-alter";

    //     return target[name]
    //   },
    //   set: function(target, prop, value, receiver) {
    //     console.log(target, prop, value, receiver, 2222);
    //     // target[prop] = value;
    //     // console.log('property set: ' + prop + ' = ' + value);
    //     return true;
    //   }
    // })

  }

  render() {
    return (
      <Fragment>
        <quark-doc-header></quark-doc-header>
        <main class="home-main">
          <section class="home-section">
              <div class="home-text">
                <div>
                  <div class="home-logo">
                    <img src={quarkLogo} alt="" />
                  </div>
                  <h1 class="home-title">
                    { this.#ecosystemLangs.homeTitle }
                  </h1>
                  <p class="home-subtitle2 text-grad">
                    { this.#ecosystemLangs.homeSubtitle2 }
                    &nbsp;
                    <span class="tech-name text-grad">{ this.#framework[this.activeFwIndex] }</span>
                  </p>

                  <div class="actions">
                    <div class="action">
                      <a
                        class="get-started"
                        href={ this.#isZhLang ? `#/zh-CN/guide/quickstart`: `#/en-US/guide/quickstart`}
                        >
                          { this.#ecosystemLangs.getStarted }
                      </a>
                    </div>
                    <div class="action">
                      <a
                        class="why-quark"
                        href={this.#isZhLang ? `#/zh-CN/guide/introduction` : `#/en-US/guide/introduction`}
                        >
                          { this.#ecosystemLangs.whyQuark }
                        </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="scroll-down"
                id="scroll-down"
                href="#we-believe"
                style="opacity: 1"
              >
                <span>{ this.#ecosystemLangs.scrollDown }</span>
                <span class="arrow">
                  {
                    this.darkMode ?
                    <img
                      src={arrow2}
                      alt="arrow"
                    /> :
                    <img src={arrowLight} alt="arrow" />
                  }
                </span>
              </a>
            </section>

            <section class="we-believe" id="we-believe">
              <div class="wrap">
                <h2>
                  { this.#ecosystemLangs.weBelieve }

                  {
                    this.darkMode ?
                    <img
                      class="down-icon"
                      alt="down-icon"
                      src={iDown}
                      height="34"
                      width="36"
                    />:
                    <img
                      class="down-icon"
                      alt="down-icon"
                      src={iDownLight}
                      height="34"
                      width="36"
                    />
                  }
                </h2>
                <p>
                  { this.#ecosystemLangs.weBelieveDesc1 }
                </p>
                <p style="margin-top: 1.5rem">
                  { this.#ecosystemLangs.weBelieveDesc2 }
                </p>
                <p style="margin-top: 1.5rem">
                  { this.#ecosystemLangs.weBelieveDesc3 }
                </p>
              </div>
            </section>

            <section class="what-we-do" id="what-we-do">
              <div class="wrap">
                <h2>
                  { this.#ecosystemLangs.whatWeDo }
                  {
                    this.darkMode ?
                    <img
                      class="down-icon"
                      alt="down-icon"
                      src={iDown}
                      height="34"
                      width="36"
                    /> :
                    <img
                      class="down-icon"
                      alt="down-icon"
                      src={iDownLight}
                      height="34"
                      width="36"
                    />
                  }

                </h2>
                <p>
                  { this.#ecosystemLangs.whatWeDoDesc1 }
                </p>
                <p style="margin-top: 1.5rem">
                  { this.#ecosystemLangs.whatWeDoDesc2 }
                </p>

                {/* <div class="code-demo-tab-group">
                  <button
                    v-for="item in tabs"
                    :key="item"
                    @click="handleTabSwitch(item)"
                    :class="activeTab === item ? 'active-tab' : ''"
                  >
                    { item }
                  </button>
                </div>

                <div class="code-demo-container">
                  <div class="code-demo relative">
                    <div>
                      <div class="editor-skin-header">
                        <div class="editor-skin-header-btn-group">
                          <span class="editor-skin-header-btn red"></span>
                          <span class="editor-skin-header-btn yellow"></span>
                          <span class="editor-skin-header-btn green"></span>
                        </div>
                      </div>
                      <CodeDemo :tabName="activeTab" />
                    </div>

                    <div class="preview">
                      <quark-button size="big" :loading="isLoading" @click="handleClick"
                        >Button</quark-button
                      >
                    </div>
                  </div>
                </div> */}
              </div>
            </section>

            {/* <section class="advantage" id="advantage">
              <div class="wrap">
                <h2>
                  { this.#ecosystemLangs.advantage }
                  {
                    this.darkMode ?
                    <img
                      class="down-icon"
                      alt="down-icon"
                      src={iDown}
                      height="34"
                      width="36"
                    />
                    :
                    <img
                      class="down-icon"
                      alt="down-icon"
                      src={iDownLight}
                      height="34"
                      width="36"
                    />
                  }
                </h2>
                <div class="box-group">
                  <div class="box1">
                    <h2>{ this.#ecosystemLangs.box1Title }</h2>
                    <p>{ this.#ecosystemLangs.box1Desc }</p>
                  </div>
                  <div class="box2">
                    <h2>{ this.#ecosystemLangs.box2Title }</h2>
                    <p>{ this.#ecosystemLangs.box2Desc }</p>
                  </div>
                  <div class="box3">
                    <h2>{ this.#ecosystemLangs.box3Title }</h2>
                    <p>{ this.#ecosystemLangs.box3Desc }</p>
                  </div>
                  <div class="what">
                    <p>{ this.#ecosystemLangs.whatDesc1 }</p>
                    <p>{ this.#ecosystemLangs.whatDesc2 }</p>
                    <p>
                      <a href="https://github.com/hellof2e/quark-cli" target="_blank"
                        >阅读此篇</a
                      >
                      了解更多信息。
                    </p>
                  </div>
                  <div class="how">
                    <div class="bash-code">
                      <pre class="language-bash">
        npx create-quark-app create project-name
        cd project-name

        npm install
        npm start
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </main>

        <div class="footer-container">
          <footer>
            <div class="text-xs text-gray-400">
              A project by <a href="/"> Quark Labs</a>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}