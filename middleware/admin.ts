export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const user = window.prompt("ユーザー名を入力してください。")
    const pass = window.prompt("パスワードを入力してください。");
    const verifyResult = await $fetch<boolean>("/api/verify", {
      method: "POST",
      body: {
        user: user,
        pass: pass
      }
    });
    if (!verifyResult) {
      return { path: '/' };
    };
  };
});