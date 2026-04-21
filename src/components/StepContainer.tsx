import styles from './StepContainer.module.css';

const imgDepositIcon = 'https://www.figma.com/api/mcp/asset/3f6301b3-4839-4362-bfee-80139e7ced8d';
const imgUnion = 'https://www.figma.com/api/mcp/asset/c7bda41e-19d3-4684-9fb6-0c875d275993';

interface StepProps {
  number: number;
  title: string;
  description: string;
  state: 'done' | 'active' | 'upcoming';
  connector?: 'solid' | 'dashed' | 'none';
  showDepositBtn?: boolean;
}

function Step({ number, title, description, state, connector = 'none', showDepositBtn }: StepProps) {
  return (
    <div className={styles.stepBlock}>
      <div className={styles.stepHeader}>
        <div className={state === 'active' ? styles.stepCircleActive : styles.stepCircle}>
          {number}
        </div>
        {connector !== 'none' && (
          <div className={connector === 'dashed' ? styles.connectorDashed : styles.connector} />
        )}
      </div>
      <div className={styles.stepContent}>
        <p className={state === 'upcoming' ? styles.stepTitleSecondary : state === 'active' ? styles.stepTitleActive : styles.stepTitleDisabled}>
          {title}
        </p>
        <p className={state === 'active' ? styles.stepDescActive : styles.stepDescDisabled}>
          {description}
        </p>
        {showDepositBtn && (
          <button className={styles.depositBtn}>
            <span>Deposit</span>
            <div className={styles.depositIconWrap}>
              <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgDepositIcon} />
              <div style={{ position: 'absolute', inset: '18.13% 11.88%' }}>
                <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgUnion} />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function StepContainer() {
  return (
    <section className={styles.container}>
      <div className={styles.exposition}>
        <h2 className={styles.title}>Unlock the complete Pepperstone experience in 4 steps</h2>
      </div>

      <div className={styles.card}>
        <Step
          number={1}
          title="Trading suitability"
          description="To ensure responsible trading, we need to understand your trading knowledge"
          state="done"
          connector="solid"
        />

        <div className={styles.spacer} />

        <Step
          number={2}
          title="Verify identity"
          description="Secure your profile, deposit and trade with identity verification"
          state="done"
          connector="solid"
        />

        <div className={styles.spacer} />

        <Step
          number={3}
          title="Deposit"
          description="Explore all the symbols and instruments that Pepperstone offers to make your first trade"
          state="active"
          connector="dashed"
          showDepositBtn
        />

        <div className={styles.spacerDashed} />

        <Step
          number={4}
          title="Start trading"
          description="Explore all the symbols and instruments that Pepperstone offers to make your first trade"
          state="upcoming"
          connector="none"
        />
      </div>
    </section>
  );
}
