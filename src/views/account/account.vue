<template>
  <section class="account">
    <Row>
      <Col :span="6">
        <Department />
      </Col>
      <Col :span="1" />
      <Col :span="17">
        <DepartmentContent />
      </Col>
    </Row>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Row, Col } from 'ant-design-vue'
  import Department from './components/departentment.vue'
  import DepartmentContent from './components/departmentContent.vue'
  export default defineComponent({
    name: 'Account',
    components: {
      Row,
      Col,
      Department,
      DepartmentContent
    },
    setup() {}
  })
</script>
<style lang="less">
  .account {
    height: 100%;
  }
</style>
