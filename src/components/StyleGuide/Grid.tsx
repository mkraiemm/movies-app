import { Card } from '@/components/ui/card';

export function Grid() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Grid System</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">12-Column Grid</h3>
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-12">
                <div className="bg-primary/20 h-full rounded-md flex items-center justify-center text-sm">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Responsive Grid Examples</h3>
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-2">2 Columns (sm) / 3 Columns (md) / 4 Columns (lg)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-primary/20 h-20 rounded-md" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}