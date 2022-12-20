import { onMounted, onUnmounted } from "vue";
export const useEscapeKey = (cb) => {
  const handler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cb();
    }
  };
  onMounted(() => {
    window.document.body.addEventListener("keyup", handler);
  });
  onUnmounted(() => {
    window.document.body.removeEventListener("keyup", handler);
  });
};
