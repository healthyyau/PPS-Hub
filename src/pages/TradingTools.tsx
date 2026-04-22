import React from 'react';
import styles from './TradingTools.module.css';
import AppShell from '../components/AppShell';

const imgPip    = 'https://www.figma.com/api/mcp/asset/39d17917-f97a-4303-ae7c-67f22bba4160';
const imgMargin = 'https://www.figma.com/api/mcp/asset/c2fa3330-a8c2-4bd2-9546-4a567971e6e2';
const imgProfit = 'https://www.figma.com/api/mcp/asset/cd8465b8-9d6b-4a6b-8362-a1f160a66b42';

interface Tool {
  title: string;
  description: string;
  image: string;
  href: string;
}

const TOOLS: Tool[] = [
  {
    title: 'Pip calculator',
    description:
      'The PIP calculator provides a value per pip based on the trade volume entered on a particular asset.',
    image: imgPip,
    href: '#',
  },
  {
    title: 'Margin calculator',
    description:
      'The Margin calculator indicates the margin required to enter a position on an asset given the leverage of the account, volume and the asset traded.',
    image: imgMargin,
    href: '#',
  },
  {
    title: 'Profit calculator',
    description:
      'The Profit calculator reveals the trade profit on an asset given the volume of the trade, the difference in open and close price, and the asset traded.',
    image: imgProfit,
    href: '#',
  },
];

export default function TradingTools(): React.ReactElement {
  return (
    <AppShell activeKey="trading-tools" title="Trading tools">
      <section className={styles.card}>
        <div className={styles.grid}>
          {TOOLS.map(tool => (
            <article key={tool.title} className={styles.toolCard}>
              <img className={styles.toolImage} src={tool.image} alt="" />
              <div className={styles.toolBody}>
                <h2 className={styles.toolTitle}>{tool.title}</h2>
                <p className={styles.toolDesc}>{tool.description}</p>
              </div>
              <button type="button" className={styles.openBtn}>Open</button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
