import { defineComponent } from 'vue';

import { Divider, Drawer } from 'ant-design-vue';
import BasicDrawer from './BasicDrawer.vue'
export default defineComponent({
    name: 'SettingDrawer',
    components: {
        Drawer,
        Divider,
        BasicDrawer
    },
    setup(){
        
        return () => {
            <BasicDrawer>

            </BasicDrawer>
        }
    }
})