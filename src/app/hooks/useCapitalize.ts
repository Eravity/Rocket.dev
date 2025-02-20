export default function useCapitalize({ title }: { title: string }): string {
  return title
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
