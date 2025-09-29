import { MyCashProvider } from './provider';

const MyCashLayout = ({ children }: { children: React.ReactNode }) => {
  return <MyCashProvider>{children}</MyCashProvider>;
};

export default MyCashLayout;
