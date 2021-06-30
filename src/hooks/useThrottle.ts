export default function useThrottle(callback: { (): void }, limit: number) {
  let waiting = false;
  return () => {
    if (!waiting) {
      callback();
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}
