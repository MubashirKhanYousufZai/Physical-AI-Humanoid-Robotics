import React from 'react';
import Layout from '@theme/Layout';
import styles from './blog.module.css';

export default function Blog() {
  return (
    <Layout
      title="AI & Humanoid Robotics Blog"
      description="Articles and tutorials about Physical AI and Humanoid Robotics"
    >
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>AI & Humanoid Robotics Blog</h1>
          <p>Explore articles, tutorials, and updates related to AI-powered humanoid robots.</p>
        </header>

        <section className={styles.blogCards}>
          <div className={styles.card}>
            <h2>Introduction to Physical AI</h2>
            <p>Learn the basics of embedding AI into humanoid robots for real-world tasks.</p>
            <a href="/docs/chapter1" className={styles.button}>Read More</a>
          </div>

          <div className={styles.card}>
            <h2>Advanced Perception Systems</h2>
            <p>Discover sensors and algorithms that help robots navigate and understand environments.</p>
            <a href="/docs/chapter3" className={styles.button}>Read More</a>
          </div>

          <div className={styles.card}>
            <h2>Human-Robot Interaction (HRI)</h2>
            <p>Understand how robots communicate naturally with humans through gestures and language.</p>
            <a href="/docs/chapter4" className={styles.button}>Read More</a>
          </div>
        </section>

        <section className={styles.comingSoon}>
          <h2>More Articles Coming Soon...</h2>
          <p>Stay tuned for updates and new tutorials on humanoid robotics and AI!</p>
        </section>
      </main>
    </Layout>
  );
}
