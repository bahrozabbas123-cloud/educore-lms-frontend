import Card from "@/components/ui/Card";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return <Card className="animate-pulse text-sm text-foreground/60">{label}</Card>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="text-center">
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-foreground/60">{description}</p>
    </Card>
  );
}

export function ErrorState({ message }: { message: string }) {
  return <Card className="border-red-400/20 text-sm text-red-300">{message}</Card>;
}
