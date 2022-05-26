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
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


import FontAwesomeIcon from '@app/FontAwesomeLoader';

/*
new FontAwesomeLoader()
  .load();


import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
dom.watch()
*/

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
app.use(SolanaWallets, walletOpts);

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app');
