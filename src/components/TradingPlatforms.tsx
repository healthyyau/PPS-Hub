import styles from './TradingPlatforms.module.css';

const imgMT5Icon = 'https://www.figma.com/api/mcp/asset/bbd0f5ab-88c6-416d-9146-61a5cb2fa374';
const imgCheckWhite = 'https://www.figma.com/api/mcp/asset/fecfaa20-2bb7-479c-90c7-3b6523dd1a6a';
const imgArrowWhite = 'https://www.figma.com/api/mcp/asset/53d0bbc0-2d3f-4b86-8c8a-9979c98cad43';
const imgUnionWhite = 'https://www.figma.com/api/mcp/asset/a67eb20a-5c58-42ee-a1b0-b5d45f879635';
const imgMT4Icon = 'https://www.figma.com/api/mcp/asset/69d8c046-5d26-479a-af3c-19605d99d68e';
const imgCheckDark = 'https://www.figma.com/api/mcp/asset/4b06a9fb-4410-4963-8e51-29146c058665';
const imgArrowDark = 'https://www.figma.com/api/mcp/asset/53d0bbc0-2d3f-4b86-8c8a-9979c98cad43';
const imgUnionDark = 'https://www.figma.com/api/mcp/asset/73c318bc-d059-4cf2-97d4-9a5f7e50b027';
const imgPepperstoneIcon = 'https://www.figma.com/api/mcp/asset/a0114ba4-238f-4931-97b4-8a5d59236172';
const imgTradingViewIcon = 'https://www.figma.com/api/mcp/asset/17f6e464-ecdb-4c3c-846c-aa0ce075bbae';
const imgCTraderIcon = 'https://www.figma.com/api/mcp/asset/fbc1bd1f-323e-4135-9205-39f0628d084b';

interface FeaturePoint {
  text: string;
}

function CheckItem({ text, white }: { text: string; white?: boolean }) {
  return (
    <div className={styles.point}>
      <div className={styles.checkWrap}>
        <div style={{ position: 'relative', width: 16, height: 16, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '25%', left: '16.67%', right: '16.67%', bottom: '29.17%' }}>
            <div style={{ position: 'absolute', inset: '-6.82% -4.69%' }}>
              <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={white ? imgCheckWhite : imgCheckDark} />
            </div>
          </div>
        </div>
      </div>
      <p className={white ? styles.pointTextWhite : styles.pointTextDark}>{text}</p>
    </div>
  );
}

function TradeNowBtn({ white }: { white?: boolean }) {
  return (
    <button className={white ? styles.tradeNowWhite : styles.tradeNowDark}>
      <span>Trade now</span>
      <div style={{ position: 'relative', width: 16, height: 16, overflow: 'hidden', flexShrink: 0 }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={white ? imgArrowWhite : imgArrowDark} />
        <div style={{ position: 'absolute', inset: '18.13% 11.88%' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={white ? imgUnionWhite : imgUnionDark} />
        </div>
      </div>
    </button>
  );
}

interface SmallCardProps {
  iconSrc: string;
  name: string;
  points: FeaturePoint[];
}

function SmallCard({ iconSrc, name, points }: SmallCardProps) {
  return (
    <div className={styles.smallCard}>
      <div className={styles.smallCardInner}>
        <div className={styles.smallCardHeader}>
          <div className={styles.platformIconSmall}>
            <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={iconSrc} />
          </div>
          <span className={styles.platformNameSmall}>{name}</span>
        </div>
        <div className={styles.pointList}>
          {points.map((p, i) => <CheckItem key={i} text={p.text} />)}
        </div>
        <TradeNowBtn />
      </div>
    </div>
  );
}

export default function TradingPlatforms() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleBlock}>
          <h2 className={styles.sectionTitle}>Trading platforms</h2>
          <p className={styles.sectionDesc}>
            Not sure what's the best trading platform for you? Learn more about how different trading platform can assist and better strategize your trading experience.{' '}
            <span className={styles.learnMore}>Learn more</span>
          </p>
        </div>

        <div className={styles.content}>
          {/* MT5 — featured card */}
          <div className={styles.featuredCard}>
            <div className={styles.featuredInner}>
              <div className={styles.featuredPlatformHeader}>
                <div className={styles.featuredIconWrap}>
                  <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain' }} src={imgMT5Icon} />
                </div>
                <h3 className={styles.featuredPlatformName}>MetaTrader5</h3>
              </div>
              <p className={styles.featuredDesc}>
                Trade on-the-go anytime, anywhere, with the app designed for traders by traders.
              </p>
              <div className={styles.pointList}>
                <CheckItem white text="Use and code easily with MQL5" />
                <CheckItem white text="Enjoy faster processing and inbuilt indicators" />
                <CheckItem white text="Tailor to your trading style with advanced customisation" />
                <CheckItem white text="Customisable and public watchlists" />
                <CheckItem white text="Available on browser, Android and iOS" />
              </div>
            </div>
            <TradeNowBtn white />
          </div>

          {/* Right column: MT4 + Pepperstone */}
          <div className={styles.col}>
            <SmallCard
              iconSrc={imgMT4Icon}
              name="MetaTrader4"
              points={[
                { text: 'Customise MT4 to the way you trade' },
                { text: 'Build and run your expert advisors using MQL4' },
              ]}
            />
            <SmallCard
              iconSrc={imgPepperstoneIcon}
              name="Pepperstone"
              points={[
                { text: 'One click trading' },
                { text: 'Manage positions in real time' },
              ]}
            />
          </div>

          {/* Far-right column: TradingView + cTrader */}
          <div className={styles.col}>
            <SmallCard
              iconSrc={imgTradingViewIcon}
              name="TradingView"
              points={[
                { text: 'Connect with the largest social trading network in the world' },
                { text: 'Industry-leading charting technology' },
              ]}
            />
            <SmallCard
              iconSrc={imgCTraderIcon}
              name="cTrader"
              points={[
                { text: 'Control slippage and order fills with advanced features' },
                { text: 'Code in C# with cTrader Automate' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
