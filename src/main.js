import { createApp } from 'vue';
import App from './App.vue'
import routing from './router.js'
import store from './vuex/index.js'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'
import BaseDialog from './components/UI/BaseDialog.vue'


const app = createApp(App)

app.use(store)

app.use(routing)

app.component('BaseCard',BaseCard)
app.component('BaseButton',BaseButton)
app.component('BaseBadge',BaseBadge)
app.component('BaseDialog',BaseDialog)

app.mount('#app');