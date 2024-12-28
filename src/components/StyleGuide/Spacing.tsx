import { Card } from '@/components/ui/card';

const spacingValues = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

export function Spacing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Spacing</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Padding & Margin Scale</h3>
          <div className="flex flex-wrap gap-4">
            {spacingValues.map((value) => (
              <Card key={value} className="p-4">
                <div className={`bg-primary/20 p-${value}`}>
                  <div className="bg-primary min-w-[2rem] min-h-[2rem] flex items-center justify-center text-sm">
                    {value}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">p-{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}