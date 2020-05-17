import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes : {
            light : {
                primary : colors.red.lighten1,
                secondary : colors.red.lighten4,
                accent : colors.indigo.base
            }
        }
    },
    icons: {
        iconfont: 'mdi'
    }
});
