import '../styles/global.css';

import { StatsWrapper } from '../contexts/stats-context';
import { SaveWrapper } from '../contexts/save-context';
import { InventoryWrapper } from '../contexts/inventory-context';
import { DialogueWrapper } from '../contexts/dialogue-context';

export default function App({ Component, pageProps }) {
  return (
    <StatsWrapper>
      <InventoryWrapper>
        <SaveWrapper>
          <Component {...pageProps} />
        </SaveWrapper>
      </InventoryWrapper>
    </StatsWrapper>
  );
}
