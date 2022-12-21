<template>
  <div>

  </div>
</template>

<script setup lang="ts">
console.log(await $fetch('/api/hello', {
  method: "POST",
  body: {
    hoge: "a"
  }
}))
</script>