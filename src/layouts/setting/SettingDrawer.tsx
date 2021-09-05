import { defineComponent } from 'vue';

import { Divider } from 'ant-design-vue';
import BasicDrawer from './BasicDrawer.vue'
export default defineComponent({
    name: 'SettingDrawer',
    components: {
        Divider,
        BasicDrawer
    },
    setup(){
        return () => (
            <BasicDrawer />
        )
    }
})