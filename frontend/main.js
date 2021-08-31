import router from "./groupomania/src/router";

const app = Vue.createApp({
	template: "<h1>Hello World</h1>",
});

app.use(router).mount("#main");
