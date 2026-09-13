import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;

export function SheetContent({
  className,
  children,
  side = "start",
  tone = "nav",
  title = "Menu",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "start" | "end";
  tone?: "nav" | "panel";
  title?: string;
}) {
  const panel = tone === "panel";
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/30" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col shadow-xl",
          panel
            ? "w-[min(28rem,100vw)] bg-surface text-ink"
            : "w-[min(20rem,90vw)] bg-sidebar text-sidebar-fg",
          side === "start" ? "start-0" : "end-0",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        {children}
        <DialogPrimitive.Close
          className={cn(
            "absolute top-3 end-3 grid size-10 place-items-center rounded-[var(--radius-sm)]",
            panel ? "text-muted hover:bg-accent-soft hover:text-ink" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg",
          )}
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
