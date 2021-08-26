<template>
  <div id="userLayout" class="user-layout">
    <div class="mian-wrap">
      <router-view />
    </div>

    <div class="footer">
      <div class="links">
        <a href="_self">帮助</a>
        <a href="_self">隐私</a>
        <a href="_self">条款</a>
      </div>
      <div class="copyright"> Copyright </div>
    </div>
  </div>
</template>

<style lang="scss">
  .user-layout {
    height: 100vh;
  }
  .mian-wrap {
    height: calc(100vh - 120px);
  }
  .footer {
    // position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
</style>
