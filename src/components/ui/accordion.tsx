"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "group rounded-2xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-200",
        "hover:border-line-strong data-[state=open]:border-accent/25 data-[state=open]:shadow-card-open",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex min-h-14 w-full cursor-pointer items-start gap-4 rounded-2xl px-4 py-4 text-left sm:px-5",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          className,
        )}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-canvas text-muted transition-colors duration-200 group-hover:text-ink group-data-[state=open]:bg-accent-soft group-data-[state=open]:text-accent-strong"
        >
          <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Content stays in the HTML while closed (`forceMount`, hidden with CSS),
 * so answers are part of the page HTML for search engines.
 */
export function AccordionContent({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof AccordionPrimitive.Content>, "forceMount">) {
  return (
    <AccordionPrimitive.Content
      forceMount
      className={cn(
        "overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}
