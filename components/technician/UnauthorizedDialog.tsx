"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface UnauthorizedDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnauthorizedDialog({
  isOpen,
  onClose,
}: UnauthorizedDialogProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleReLogin = () => {
    onClose();
    logout();
    router.push("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Session Expired
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Your session has expired or you are not authorized to access this
            resource. Please sign in again to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleReLogin}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600"
          >
            Sign In Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
