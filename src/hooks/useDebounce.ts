import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useDebounce(
  value: string,
  action: { (data: string): { type: string; data: string } },
  delay: number,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(action(value));
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
}
