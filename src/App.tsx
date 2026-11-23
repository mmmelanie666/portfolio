import { Suspense, lazy, useState } from 'react';
import { RetroComputerV2 } from '@/components/RetroComputerV2';

const LegacyV1Page = lazy(() => import('./LegacyV1Page'));

function App() {
  const [version, setVersion] = useState<'v1' | 'v2'>('v2');

  if (version === 'v2') {
    return <RetroComputerV2 onSwitchVersion={() => setVersion('v1')} />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FEF9F4]" />}>
      <LegacyV1Page onSwitchToV2={() => setVersion('v2')} />
    </Suspense>
  );
}

export default App;
