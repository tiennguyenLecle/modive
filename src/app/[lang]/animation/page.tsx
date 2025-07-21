'use client';

import LocalizedLink from '@/components/LocalizedLink';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function AnimationPage() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ padding: '2rem' }}>
      <LocalizedLink href="/">Back to Home</LocalizedLink>
      <Link href="/">Back to Home</Link>
      <LocalizedLink href="/animation/sub-animation">Sub Animation</LocalizedLink>
      <h1>Framer Motion Test Page</h1>
      <Button onClick={() => setIsVisible(!isVisible)} style={{ marginBottom: '1rem' }}>
        Toggle Visibility
      </Button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 100,
          height: 100,
          background: 'blue',
          borderRadius: 10,
        }}
      />
    </div>
  );
}
