"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/app/lib/utils"
import { Button, buttonVariants } from "@/app/_components/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-6 [--cell-size:2.5rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-30 hover:bg-violet-50 transition-colors",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-30 hover:bg-violet-50 transition-colors",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size] mb-4",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-semibold tracking-wide",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-semibold tracking-wide",
          captionLayout === "label"
            ? "text-base"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-xs font-medium uppercase tracking-wider pb-2 cursor-pointer",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full gap-1", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",  
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square flex justify-center items-center h-[--cell-size] w-[--cell-size] select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-lg [&:last-child[data-selected=true]_button]:rounded-lg hover:bg-violet-200 rounded-lg active:bg-violet-200 active:border active:border-violet-100",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-primary/10 rounded-lg",
          defaultClassNames.range_start
        ),
        range_middle: cn("bg-primary/5 rounded-lg", defaultClassNames.range_middle),
        range_end: cn("bg-primary/10 rounded-lg", defaultClassNames.range_end),
        today: cn(
          "bg-violet-100 text-accent-foreground rounded-lg data-[selected=true]:rounded-lg font-medium",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground/40 aria-selected:text-muted-foreground/40",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground/30 opacity-30",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      className={cn(
        "data-[today=true]:border-2 data-[today=true]:border-violet-200 data-[selected-single=true]:bg-violet-100 data-[selected-single=true]:border-2 data-[selected-single=true]:border-violet-100 data-[selected-single=true]:text-accent-foreground data-[range-middle=true]:bg-primary/10 data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-violet-100 data-[range-start=true]:border data-[range-start=true]:border-violet-100 data-[range-start=true]:text-accent-foreground data-[range-end=true]:bg-violet-100 data-[range-end=true]:border data-[range-end=true]:border-violet-100 data-[range-end=true]:text-accent-foreground group-data-[focused=true]/day:border-violet-200 group-data-[focused=true]/day:ring-violet-200/30 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-medium leading-none rounded-lg hover:bg-muted/50 transition-all duration-200 ease-in-out data-[range-end=true]:rounded-lg data-[range-middle=true]:rounded-lg data-[range-start=true]:rounded-lg group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
