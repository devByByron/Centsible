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

type DeleteConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionDescription?: string;
};

export const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  transactionDescription,
}: DeleteConfirmationDialogProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {transactionDescription ? (
              <>
                This will permanently delete the transaction:{" "}
                <span className="font-semibold">{transactionDescription}</span>
                <br />
                This action cannot be undone.
              </>
            ) : (
              "This action cannot be undone. This will permanently delete the transaction."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
              onClose();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
