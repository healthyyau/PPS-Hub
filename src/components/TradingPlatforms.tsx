import styles from './TradingPlatforms.module.css';

const imgMT5Icon = 'https://www.figma.com/api/mcp/asset/768a4482-409a-417f-902f-d70c852ab3bf';
const imgCheckWhite = 'https://www.figma.com/api/mcp/asset/96342932-cbd7-431a-b380-cd5415f5011d';
const imgArrowWhite = 'https://www.figma.com/api/mcp/asset/f758e7cf-740f-47c0-8948-3e8294d662f8';
const imgUnionWhite = 'https://www.figma.com/api/mcp/asset/66d89e19-b0ba-4a07-b3ef-26708bec15a2';
const imgMT4Icon = 'https://www.figma.com/api/mcp/asset/68d569eb-f161-4a0b-af98-3078bdda0c48';
const imgCheckDark = 'https://www.figma.com/api/mcp/asset/f3b90838-f426-4ba2-80bf-675cc650ab89';
const imgArrowDark = 'https://www.figma.com/api/mcp/asset/f758e7cf-740f-47c0-8948-3e8294d662f8';
const imgUnionDark = 'https://www.figma.com/api/mcp/asset/bc7abadc-f325-4b16-997e-c839abd2307d';
const imgPepperstoneIcon = 'https://www.figma.com/api/mcp/asset/2bffe8b0-82a0-4f55-b143-3f5143c37ccd';
// Use the same flat TradingView logo asset as AddAccountDrawer (correct ratio)
const imgTradingViewIcon = 'https://www.figma.com/api/mcp/asset/ab6f63b0-5f1f-4563-9fa8-5784802ea67b';
const imgCTraderIcon = 'https://www.figma.com/api/mcp/asset/9751cbcf-1772-49c6-afea-19f2c738471e';

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
