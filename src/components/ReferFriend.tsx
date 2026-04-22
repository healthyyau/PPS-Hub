import styles from './ReferFriend.module.css';

const imgHandshake = 'https://www.figma.com/api/mcp/asset/b3528637-01e0-4f15-8b42-54885655417c';
const imgOverlay = 'https://www.figma.com/api/mcp/asset/251cda8d-20e8-4b28-a5c6-11b3f5cea966';
const imgIconCopy = 'https://www.figma.com/api/mcp/asset/85ec62da-792d-4444-994a-eed359788f03';
const imgIconLearn = 'https://www.figma.com/api/mcp/asset/85ec62da-792d-4444-994a-eed359788f03';
const imgDecor1Vector = 'https://www.figma.com/api/mcp/asset/13e9c051-118b-4e5d-8518-045c28277ce0';
const imgDecor1Shape = 'https://www.figma.com/api/mcp/asset/6fc30abb-dc18-4465-9fa5-85b84085e76b';
const imgDecor2Shape = 'https://www.figma.com/api/mcp/asset/0349c5fd-afa2-4959-8e81-7fcb60c62a1e';

const REFERRAL_LINK = 'https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=33155';

export default function ReferFriend() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {/* Left — text content */}
        <div className={styles.contentBlock}>
          <h2 className={styles.title}>
            <span>Earn rewards up to </span>
            <span>5,000 AUD</span>
          </h2>

          <div className={styles.features}>
            {/* Feature 1 */}
            <div className={styles.featureRow}>
              <div className={styles.decorIcon}>
                <div style={{ position: 'absolute', inset: '20.13% -0.33% 4.06% 21.29%' }}>
                  <div style={{ position: 'absolute', inset: '-3.3% -15.82% -29.68% -15.82%' }}>
                    <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgDecor1Vector} />
                  </div>
                </div>
                <div style={{ position: 'absolute', inset: 0 }}>
                  <img alt="" style={{ width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain', display: 'block' }} src={imgDecor1Shape} />
                </div>
              </div>
              <div className={styles.featureCopy}>
                <p className={styles.featureHeading}>Get rewarded for each qualified referral</p>
                <p className={styles.featureDesc}>
                  Earn cash rewards for up to 5 friends who sign up, meets eligibility criteria, and starts trading.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureRow}>
              <div className={styles.decorIcon}>
                <div style={{ position: 'absolute', inset: '14.2% 4.8% 5.8% 15.2%' }}>
                  <div style={{ position: 'absolute', inset: '-3.12% -15.63% -28.12% -15.63%' }}>
                    <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgDecor2Shape} />
                  </div>
                </div>
              </div>
              <div className={styles.featureCopy}>
                <p className={styles.featureHeading}>Built-in eligibility checks</p>
                <p className={styles.featureDesc}>
                  Referrals are reviewed against programme criteria before rewards are paid, helping ensure fair and accurate payouts.
                </p>
              </div>
            </div>
          </div>

          {/* Link + CTAs */}
          <div className={styles.linkSection}>
            <div className={styles.linkInput}>
              <p className={styles.linkText}>{REFERRAL_LINK}</p>
            </div>
            <div className={styles.btnGroup}>
              <button className={styles.copyBtn}>
                <span>Copy</span>
                <div style={{ position: 'relative', width: 20, height: 20, overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: '8.33%' }}>
                    <div style={{ position: 'absolute', inset: '-3%' }}>
                      <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgIconCopy} />
                    </div>
                  </div>
                </div>
              </button>
              <button className={styles.learnBtn}>
                <span>Learn more</span>
                <div style={{ position: 'relative', width: 20, height: 20, overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: '8.33%' }}>
                    <div style={{ position: 'absolute', inset: '-6%' }}>
                      <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgIconLearn} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right — image */}
        <div className={styles.imageBlock}>
          <div aria-hidden="true" className={styles.imageInner}>
            <img alt="" className={styles.mainPhoto} src={imgHandshake} />
            <div className={styles.overlayWrap}>
              <img alt="" className={styles.overlayImg} src={imgOverlay} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
