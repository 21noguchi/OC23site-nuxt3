export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const runtimeConfig = useRuntimeConfig();
    const user = window.prompt("ユーザー名を入力してください。");
    const verifyResult = await $fetch<boolean>("/api/verify/user", {
      method: "POST",
      body: {
        user: user,
      },
      baseURL: runtimeConfig.public.nodeEnv.BASE_URL
    });
    if (!verifyResult) {
      return { path: '/' };
    };
  };
});