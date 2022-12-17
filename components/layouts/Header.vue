<template>
  <div>
    <div class="front">
      <NuxtLink to="/" class="top">
        <div class="logo">
          <img src="/logo.png" alt="オリエンテーション委員会ロゴ">
        </div>
        <div class="org">
          <p class="full">
            <span class="prefix">2023年度東京大学教養学部</span>
            <span class="name">オリエンテーション委員会</span>
          </p>
        </div>
      </NuxtLink>
    </div>
    <div class="backspace"></div>
  </div>
</template>

<style lang="scss" scoped>
.front {
  width: 100%;
  background-color: $header;
  position: fixed;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.top {
  width: fit-content;
  height: 48px;

  display: flex;
  align-items: center;

  text-decoration: none;
}
.logo {
  height: 40px;
  width: 40px;
  margin: 0 10px;
  img {
    height: 40px;
  }
}
.org {
  color: $text;

  .full {
    margin: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    line-height: 16px;

    .prefix {
      font-size: 6px;
    }
    .name {
      font-size: 16px;
    } 
  }
}
.backspace {
  height: 60px;
}
</style>