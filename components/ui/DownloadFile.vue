<template>
  <a :href="`${baseURL}/files${fileLink}`" target="_blank" class="download-button">
    <p>ダウンロード</p>
  </a>
</template>

<script setup lang="ts">
interface DownloadDetail {
  fileLink: string;
};
defineProps<DownloadDetail>();

const runtimeconfig = useRuntimeConfig();
const baseURL = runtimeconfig.app.baseURL;
</script>

<style lang="scss">
.download-button {
  width: 40vw;
  @include tab {
    width: 50vw;
  }
  @include pc {
    width: 50vw;
  }
  height: 60px;
  background-color: $main;
  border-radius: 10px;

  color: $catch;
  font-weight: bold;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>