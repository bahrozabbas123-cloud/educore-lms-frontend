import Card, { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const summaryCards = [
  { title: "Enrolled Courses", value: "—", badge: "Coming soon" as const },
  { title: "Pending Assignments", value: "—", badge: "Coming soon" as const },
  { title: "Certificates Earned", value: "—", badge: "Coming soon" as const },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{card.title}</CardTitle>
                <Badge variant="info">{card.badge}</Badge>
              </div>
            </CardHeader>
            <p className="font-heading text-3xl font-bold text-foreground">
              {card.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Empty content area — real course/assignment data wires up in a later week */}
      <Card className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <span className="text-3xl">📭</span>
        <CardTitle>Nothing to show yet</CardTitle>
        <CardDescription>
          This content area is a static shell. Course data, assignments, and
          progress tracking will be connected in the coming weeks.
        </CardDescription>
      </Card>
    </div>
  );
}
