<script setup lang="ts">
import { onMounted, ref } from "vue";

const footerRef = ref<HTMLElement | null>(null);

const resizeFooter = () => {
  if (footerRef.value) {
    const height = footerRef.value.offsetHeight;
    document.documentElement.style.setProperty(
      "--footer-height",
      `${height}px`
    );
  }
};

onMounted(() => {
  resizeFooter();
  window.addEventListener("resize", resizeFooter);
});
</script>

<template>
  <footer class="footer" ref="footerRef">
    <span class="footer__line">
      Modified ❤️ by
      <a href="https://github.com/Linux-qitong" target="_blank">青稚</a> & <a href="https://icp.gov.moe/?keyword=20249989" target="_blank">萌ICP备20249989号</a>
    </span>
    <span class="footer__line">
    </span>
  </footer>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: calc(var(--footer-height, 80px) * -1);
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  text-align: center;
  background-color: var(--background-color);
  transition: bottom 0.3s ease;
  box-sizing: border-box;
  line-height: 24px;
}

.footer__line > a {
  color: var(--text-color);
  text-decoration: underline;
  transition: 0.3s;
}
.footer__line > a:hover {
  color: var(--font-color-hover);
}
</style>
