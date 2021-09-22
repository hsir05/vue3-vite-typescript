import { RouterTransitionEnum } from '/@/enums/appEnum';

export const routerTransitionOptions = [
    RouterTransitionEnum.ZOOM_FADE,
    RouterTransitionEnum.FADE,
    RouterTransitionEnum.ZOOM_OUT,
    RouterTransitionEnum.FADE_SIDE,
    RouterTransitionEnum.FADE_BOTTOM,
    RouterTransitionEnum.FADE_SCALE,
].map((item) => {
    return {
        label: item,
        value: item,
    };
});