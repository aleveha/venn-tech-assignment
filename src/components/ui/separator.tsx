"use client";

import { cn } from "@/lib/utils";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentProps } from "react";

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

export const Separator = ({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
}: SeparatorProps) => {
    return (
        <SeparatorPrimitive.Root
            data-slot="separator"
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                className
            )}
            {...props}
        />
    );
};
