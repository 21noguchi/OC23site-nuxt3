<template>
  <div>
    <form :action="`${runtimeConfig.public.nodeEnv.BASE_PATH}/api/file`" method="post" enctype="multipart/form-data">
      <select v-model="fileName">
        <option v-for="file in files" :key="file.name">{{ getFileNameBody(file.name) }}</option>
      </select>
      <input type="text" v-model="fileName"/>
      <input type="file" name="uploadedFile" ref="uploadingFile"/>
      <button type="button" @click="sendFile">アップロード</button>
    </form>
    <p>{{ fileSendDone }}</p>
    <a :href="filePath" target="_blank">{{ filePath }}</a>
    <br>
    <p v-for="file in files" :key="file.name"><a :href="`${runtimeConfig.public.nodeEnv.BASE_URL}/upload/${file.name}`" target="_blank">{{ file.name }}</a>最終更新：{{ organizeDate(file.updatedAt) }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
});
const runtimeConfig = useRuntimeConfig()
const uploadingFile = ref<any>(null);
const fileName = ref("")
const files = await $fetch('/api/file/read', {
  method: "GET",
  baseURL: runtimeConfig.public.nodeEnv.BASE_URL
});
const getFileNameBody = (fileNameWithType: string): string => {
  const lengthOfDot = fileNameWithType.indexOf('.')
  return fileNameWithType.substring(0, lengthOfDot)
}
const organizeDate = (date: string| undefined ): string => {
  if (date) {
    const dt = new Date(date)
    const time = dt.toLocaleString()
    return time
  }
  else {
    return ""
  }
}
const fileSendDone = ref("")
const filePath = ref("")
const sendFile = async () => {
  const uploadFile: Blob = uploadingFile.value.files[0];
  const fileExtention = uploadFile.name.substring(uploadFile.name.lastIndexOf("."));
  const renamedFile = new File([uploadFile], fileName.value + fileExtention, {type: uploadFile.type});
  const formData = new FormData();
  formData.append('uploadedFile', renamedFile);
  const alreadyCheck = await $fetch('/api/file/write', {
    method: "POST",
    body: {
      fileName: fileName.value + fileExtention
    },
      baseURL: runtimeConfig.public.nodeEnv.BASE_URL
  });
  await $fetch('/api/file/upload', {
    method: "POST",
    body: formData,
    baseURL: runtimeConfig.public.nodeEnv.BASE_URL
  });
  fileSendDone.value = alreadyCheck.alreadyCheck ? "ファイルを更新しました。" : "ファイルをアップロードしました。"
  filePath.value = `${runtimeConfig.public.nodeEnv.BASE_URL}/upload/${fileName.value}${fileExtention}`
}
</script>