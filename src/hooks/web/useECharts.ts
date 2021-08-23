import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';
import { nextTick, unref } from 'vue';
import * as echarts from "echarts";

export function useECharts(elRef: Ref<HTMLDivElement>){

    function initCharts(options, elRef: Ref<HTMLDivElement>) {
        let myChart = echarts.init(unref(elRef) )
        myChart.setOption(options)
    }

    function setOptions(options: EChartsOption) {
        nextTick(() => {
            initCharts(options, elRef)
        });
    }

    return {
        setOptions,
    }
}