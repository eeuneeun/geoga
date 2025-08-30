import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/components/ui/dialog";

type Props = {};

export default function AddDialog({}: Props) {
  return (
    <div className="dialog">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>수입 & 지출을 입력해주세요.</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
