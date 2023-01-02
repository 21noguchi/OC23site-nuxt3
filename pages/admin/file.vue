<template>
  <div>
    <form action="/ori/2023/visitor/api/file" method="post" enctype="multipart/form-data">
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
    <p v-for="file in files" :key="file.name"><a :href="`https://www.a103.net//ori/2023/visitor/upload/${file.name}`" target="_blank">{{ file.name }}</a>最終更新：{{ organizeDate(file.updatedAt) }}</p>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
definePageMeta({
    middleware: 'admin'
  });
const uploadingFile: Ref<any> = ref(null);
const fileName: Ref<string> = ref("")
const files = await $fetch('/api/file/read', {
  method: "GET"
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
const fileSendDone: Ref<string> = ref("")
const filePath: Ref<string> = ref("")
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
    }
  });
  await $fetch('/api/file/upload', {
    method: "POST",
    body: formData
  });
  fileSendDone.value = alreadyCheck.alreadyCheck ? "ファイルを更新しました。" : "ファイルをアップロードしました。"
  filePath.value = `https://www.a103.net//ori/2023/visitor/upload/${fileName.value}${fileExtention}`
}
</script>