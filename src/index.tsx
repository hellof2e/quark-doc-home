import { QuarkElement, state, customElement } from "quarkc"
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

  @state()
  iconCopiedChange = false

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
    }, 2500);

    const scrollDown: any = this.shadowRoot.querySelector("#scroll-down")
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        // 进入视窗
        if (entries[0].isIntersecting) {
          scrollDown.style.opacity = 0;
        } else {
          scrollDown.style.opacity = 1;
        }
      }
    )
    intersectionObserver.observe(this.shadowRoot.querySelector("#we-believe"));
  }

  copyPrompt = () => {
    const text = "npn install quarkd";
    if (navigator.clipboard) {
      // clipboard api 复制
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      // 隐藏此输入框
      textarea.style.position = "fixed";
      textarea.style.clip = "rect(0 0 0 0)";
      textarea.style.top = "10px";
      // 赋值
      textarea.value = text;
      // 选中
      textarea.select();
      // 复制
      document.execCommand("copy", true);
      // 移除输入框
      document.body.removeChild(textarea);
    }

    this.iconCopiedChange = true;

    setTimeout(() => {
      this.iconCopiedChange = false;
    }, 2000);
  };

  render() {
    return (
      <>
        <quark-doc-header></quark-doc-header>
        <main class="home-main">
          <section class="home-section">
              <div class="home-text">
                <div class="paragraph">
                  <p>{this.#ecosystemLangs.allegory}</p>
                </div>
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
                    <button class="install-btn" onClick={this.copyPrompt}>
                      npm install quarkd
                      <div class="cta-icon">
                        <svg
                          class={`${this.iconCopiedChange ? 'copy icon-copied' : 'copy' }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          aria-label="copy icon"
                        >
                          <path
                            stroke="#73849A"
                            stroke-linejoin="round"
                            d="M12.72 4H5.78C4.8 4 4 4.8 4 5.78v6.94c0 .98.8 1.78 1.78 1.78h6.94c.98 0 1.78-.8 1.78-1.78V5.78c0-.98-.8-1.78-1.78-1.78Z"
                          ></path>
                          <path
                            stroke="#73849A"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m11.98 4 .02-.75a1.75 1.75 0 0 0-1.75-1.75H3.5a2 2 0 0 0-2 2v6.75A1.76 1.76 0 0 0 3.25 12H4"
                          ></path>
                        </svg>

                        <svg
                          class={`${this.iconCopiedChange ? 'checkmark icon-copied' : 'checkmark'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                          aria-label="checkmark icon"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="32"
                            d="M416 128L192 384l-96-96"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <a
                class="scroll-down"
                id="scroll-down"
                href="#advantage"
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

          <section class="advantage" id="advantage">
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
                    <a href="https://github.com/hellof2e/quark" target="_blank"
                      >{ this.#ecosystemLangs.read4More }</a
                    >
                    { this.#ecosystemLangs.moreInfo }
                  </p>
                </div>
              </div>
            </div>
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

              <a class="get-started" href={ this.#isZhLang ? `#/zh-CN/guide/quickstart`: `#/en-US/guide/quickstart`}>
                { this.#ecosystemLangs.getStarted }
              </a>

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

        </main>

        <div class="footer-container">
          <footer>
            <div class="text-xs text-gray-400">
              A project by <a href="/"> Quark Labs</a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}