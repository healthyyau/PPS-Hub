import styles from './TradingPlatforms.module.css';
import {
  platformMT5, platformMT4, platformPepperstone, platformTradingView, platformCTrader,
  checkGlyphWhite, checkGlyphDark,
  arrowGlyphWhite, arrowGlyphDark,
} from './platformIcons';

interface FeaturePoint {
  text: string;
}

function CheckItem({ text, white }: { text: string; white?: boolean }) {
  return (
    <div className={styles.point}>
      <div className={styles.checkWrap}>
        <img
          alt=""
          src={white ? checkGlyphWhite : checkGlyphDark}
          style={{ display: 'block', width: 16, height: 16, objectFit: 'contain' }}
        />
      </div>
      <p className={white ? styles.pointTextWhite : styles.pointTextDark}>{text}</p>
    </div>
  );
}

function TradeNowBtn({ white }: { white?: boolean }) {
  return (
    <button className={white ? styles.tradeNowWhite : styles.tradeNowDark}>
      <span>Trade now</span>
      <img
        alt=""
        src={white ? arrowGlyphWhite : arrowGlyphDark}
        style={{ display: 'block', width: 16, height: 16, objectFit: 'contain', flexShrink: 0 }}
      />
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
            <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain' }} src={iconSrc} />
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
                  <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain' }} src={platformMT5} />
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
              iconSrc={platformMT4}
              name="MetaTrader4"
              points={[
                { text: 'Customise MT4 to the way you trade' },
                { text: 'Build and run your expert advisors using MQL4' },
              ]}
            />
            <SmallCard
              iconSrc={platformPepperstone}
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
              iconSrc={platformTradingView}
              name="TradingView"
              points={[
                { text: 'Connect with the largest social trading network in the world' },
                { text: 'Industry-leading charting technology' },
              ]}
            />
            <SmallCard
              iconSrc={platformCTrader}
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
