import { createApp } from 'vue';
import { createPinia } from 'pinia';

import SolanaWallets from 'solana-wallets-vue';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SlopeWalletAdapter
} from '@solana/wallet-adapter-wallets';

import App from './App.vue';
import router from './router';

import 'solana-wallets-vue/styles.css';

import FontAwesomeIcon from '@app/FontAwesomeLoader';

import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import Knob from 'primevue/knob';

const app = createApp(App);

const walletOpts = {
  wallets: [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SlopeWalletAdapter(),
  ],
  autoConnect: true
}

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(SolanaWallets, walletOpts);

app.directive('tooltip', Tooltip);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Knob', Knob);

app.mount('#app');