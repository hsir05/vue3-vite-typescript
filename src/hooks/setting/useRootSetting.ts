
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import type { ProjectConfig } from '/#/config';

type RootSetting = Omit<
    ProjectConfig,
    'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;
  
export function useRootSetting() {
    const appStore = useAppStore();
    const getThemeColor = computed(() => appStore.getProjectConfig.themeColor);

    function setRootSetting(setting: Partial<RootSetting>) {
        appStore.setProjectConfig(setting);
    }   

    async function  changeThemeColor(color: string){
        // @ts-ignore
        window.less.modifyVars({ 
            '@primary-color': color
        }).then(() => {
            console.log('主题切换成功');
            setRootSetting({ themeColor: color})
        })
        .catch(error => {
            console.log(error);
        });
    }

    return {
        getThemeColor,
        setRootSetting,
        changeThemeColor
    }
}