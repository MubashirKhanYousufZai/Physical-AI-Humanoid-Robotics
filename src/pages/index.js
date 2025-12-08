import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Explore AI-powered humanoid robots">
      <header className={clsx(styles.hero, 'hero hero--primary')}>
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Physical AI & Humanoid Robotics</h1>
            <p className={styles.heroSubtitle}>
              Dive into the world of AI-powered humanoid robots, explore their design, perception, and interaction technologies.
            </p>
            <div className={styles.heroButtons}>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                Start Learning..
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/img/logo.png" alt="AI & Humanoid Robotics" />
          </div>
        </div>
      </header>
    </Layout>
  );
}
