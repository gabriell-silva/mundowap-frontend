export default function handleAccessStorage<T>(formData: T): void {
  localStorage.setItem('visits', JSON.stringify(formData));
  window.dispatchEvent(new Event('storage'));
}