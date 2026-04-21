import styles from './ReferFriend.module.css';

const imgHandshake = 'https://www.figma.com/api/mcp/asset/baab994e-d264-409b-8c7c-18c7d075f675';
const imgOverlay = 'https://www.figma.com/api/mcp/asset/13052614-7a1e-4edc-a298-8928baa578a8';
const imgIconCopy = 'https://www.figma.com/api/mcp/asset/4a43dc3d-3e28-4288-9305-66cb87a2921d';
const imgIconLearn = 'https://www.figma.com/api/mcp/asset/9e1f7365-ca29-4ca2-b132-d8f43bf108f6';
const imgDecor1Vector = 'https://www.figma.com/api/mcp/asset/e8572435-daf2-4bbe-a1c0-f232b0480b51';
const imgDecor1Shape = 'https://www.figma.com/api/mcp/asset/131a413f-646e-4680-918d-1ca92268b9c2';
const imgDecor2Shape = 'https://www.figma.com/api/mcp/asset/59bb2e86-7464-4ea4-9170-f53d4232ca10';

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
