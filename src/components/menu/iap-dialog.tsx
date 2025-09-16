'use client';
import type { Character } from "@/lib/data";
import { useIAP } from "@/contexts/IAPContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface IAPDialogProps {
  character: Character;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IAPDialog({ character, open, onOpenChange }: IAPDialogProps) {
  const { unlockCharacter } = useIAP();
  const { toast } = useToast();

  const handlePurchase = () => {
    unlockCharacter(character.id);
    onOpenChange(false);
    toast({
      title: "Content Unlocked!",
      description: `You can now enjoy the "${character.name}" scenes.`,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unlock "{character.name}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This will unlock all 6 high-definition video scenes for this category. This is a one-time purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePurchase}>
            Unlock for $1.99
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
