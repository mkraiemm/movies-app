import { Separator } from '@/components/ui/separator';
import { ColorPalette } from './ColorPalette';
import { Typography } from './Typography';
import { Spacing } from './Spacing';
import { Grid } from './Grid';

export function StyleGuide() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Style Guide</h1>
        <p className="text-muted-foreground mt-2">
          A comprehensive guide to our design system's colors, typography, spacing, and grid.
        </p>
      </div>
      
      <Separator />
      <ColorPalette />
      
      <Separator />
      <Typography />
      
      <Separator />
      <Spacing />
      
      <Separator />
      <Grid />
    </div>
  );
}