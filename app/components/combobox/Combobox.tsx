import { Check, ChevronUp, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { frameworks } from "@/interface/combobox";

interface Props {
  frameworks: frameworks[];
  title: string;
  page: string;
  setFilterPrice: (value: string) => void;
  filterPrice: string;
}

export default function Combobox(props: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { frameworks } = props;

  useEffect(() => {
    if (value) {
      props.setFilterPrice(value);
    }
  }, [value]);

  useEffect(() => {
    if (props.filterPrice === "") {
      setValue("");
    }
  }, [props.filterPrice]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={`${
          props.page === "cart" ? "border-[1px] border-[#444444]" : ""
        }`}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[170px] justify-between rounded-[10px] ${
            props.page === "cart" ? "w-full h-[60px]" : ""
          }`}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : `${props.title}`}
          {open ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={` p-0 ${props.page === "cart" ? "w-[754px]" : "w-[170px]"}`}
      >
        <Command>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
