import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';
import { nextTick, unref, watch } from 'vue';
import * as echarts from "echarts";
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'
export function useECharts(elRef: Ref<HTMLDivElement>){
    let chartInstance: echarts.ECharts | null = null;

    const { getCollapsed } = useMenuSetting()
    
    function initCharts(options, elRef: Ref<HTMLDivElement>) {
        chartInstance = echarts.init(unref(elRef) )
        chartInstance.setOption(options)

        window.onresize = () => {
            resize()
        }
    } 
    function resize():void{
        chartInstance?.resize();
    }

    watch(getCollapsed, () => {
        setTimeout(() => {
            resize()
        }, 180);
    })
    const { getShowFold } = useMultipleTabSetting()
    watch(getShowFold, () => {
        setTimeout(() => {
            resize()
        }, 180);
    })

    function setOptions(options: EChartsOption) {
        nextTick(() => {
            initCharts(options, elRef)
        });
    }

    return {
        setOptions,
    }
}