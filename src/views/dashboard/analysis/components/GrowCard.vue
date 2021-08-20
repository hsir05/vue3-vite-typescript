<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="false"
        :title="item.title"
        class="w25"
        :class="[index + 1 < 4 && 'mr10']"
        :canExpan="false"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between">
          <CountTo prefix="$" :startVal="1" :endVal="item.value" class="text-2xl" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { CountTo } from '/@/components/CountTo/index'
  import { Tag, Card } from 'ant-design-vue'
  import { growCardList } from '../data'
  export default defineComponent({
    components: { CountTo, Tag, Card },
    setup() {
      return { growCardList }
    }
  })
</script>
<style lang="less">
  .w25 {
    width: 25%;
  }
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-weight: 600;
  }
</style>
