import React from 'react';

const Story = {
  Image: React.lazy(() => import('./Image')),
  Text: React.lazy(() => import('./Text')),
};

export default Story;
