import React from 'react';

export const Story = {
  Image: React.lazy(() => import('@/components/Story/Image')),
  Text: React.lazy(() => import('@/components/Story/Text')),
};
