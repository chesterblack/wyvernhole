import '../styles/global.css';
import { StatsWrapper } from '../contexts/stats-context';
import { InventoryWrapper } from '../contexts/inventory-context';

export default function App({ Component, pageProps }) {
  return (
    <StatsWrapper>
        <InventoryWrapper>
            <Component {...pageProps} />
        </InventoryWrapper>
    </StatsWrapper>
  );
}
