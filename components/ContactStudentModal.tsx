"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Mail, Phone, Copy, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  matricNumber?: string;
}

interface RepInfo {
  name: string;
  phone: string;
  location?: string;
}

export function ContactStudentModal({
  student,
  repInfo,
  open,
  onOpenChange,
}: {
  student: ContactInfo;
  repInfo?: RepInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!student.name) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {student.name}</DialogTitle>
          {student.matricNumber && (
            <DialogDescription>
              Matric No: {student.matricNumber}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Student Information</h4>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{student.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(student.email)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-500" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(student.phone)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {repInfo && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Course Representative</h4>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-purple-500" />
                  <span className="text-sm">{repInfo.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span className="text-sm">{repInfo.phone}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(repInfo.phone)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {repInfo.location && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="font-medium">Location:</span> {repInfo.location}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" className="flex-1">
            <a href={`mailto:${student.email}`} className="flex gap-2">
              <Mail className="h-4 w-4" />
              Email Student
            </a>
          </Button>

          <Button asChild variant="outline" className="flex-1">
            <a href={`tel:${student.phone}`} className="flex gap-2">
              <Phone className="h-4 w-4" />
              Call Student
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}