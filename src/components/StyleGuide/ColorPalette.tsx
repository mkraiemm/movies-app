import { Card } from '@/components/ui/card';

interface ColorSwatch {
  name: string;
  value: string;
  textColor?: string;
}

const colors: ColorSwatch[] = [
  { name: 'Primary', value: 'bg-emerald-500', textColor: 'text-white' },
  { name: 'Error', value: 'bg-red-500', textColor: 'text-white' },
  { name: 'Background', value: 'bg-slate-900', textColor: 'text-white' },
  { name: 'Surface', value: 'bg-slate-800', textColor: 'text-white' },
  { name: 'Card', value: 'bg-slate-700', textColor: 'text-white' },
];

export function ColorPalette() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Colors</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {colors.map((color) => (
          <Card key={color.name} className="overflow-hidden">
            <div className={`h-24 ${color.value}`} />
            <div className="p-4">
              <h3 className="font-medium">{color.name}</h3>
              <p className="text-sm text-muted-foreground">{color.value.replace('bg-', '')}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}