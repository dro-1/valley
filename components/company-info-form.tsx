"use client";

import { SubmitErrorHandler, useForm } from "react-hook-form";
import Image from "next/image";
import companyLogo from "@/assets/png/company-logo.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  SelectValue,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";

const EMPLOYEE_RANGES = ["1-10", "10-100", "100-500", "1000+"] as const;
const employeeRangesSchema = z.enum(EMPLOYEE_RANGES);
const SEED_ROUNDS = [
  {
    value: "pre-seed",
    label: "Pre-Seed",
  },
  {
    value: "seed",
    label: "Seed",
  },
  {
    value: "series a",
    label: "Series A",
  },
  {
    value: "series b",
    label: "Series B",
  },
  {
    value: "series c",
    label: "Series C",
  },
] as const;

const fundingRoundSchema = z.enum([
  "pre-seed",
  "seed",
  "series a",
  "series b",
  "series c",
]);

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg",
];

const formSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Company Name must be at least 2 characters" }),
  companyWebsite: z
    .string()
    .url({ message: "Company Website must be a valid URL" }),
  companyLinkedIn: z
    .string()
    .url({ message: "Company LinkedIn must be a valid URL" }),
  companyIndustry: z
    .string()
    .min(2, { message: "Please enter a valid company industry" })
    .max(40, { message: "Please enter a valid company industry" }),
  employeeCount: employeeRangesSchema,
  companyDescription: z.string().min(10),
  companyGoals: z.string().min(10),
  hq: z.string().min(3, { message: "Please enter a valid location" }),
  fundingRound: fundingRoundSchema,
  faq: z.string().url({ message: "Company FAQa must be a valid URL" }),
  image: z
    .any()
    .refine((file) => !!file, `Image has not been selected`)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const CompanyInfoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      companyLinkedIn: "",
      companyDescription: "",
      companyGoals: "",
      companyIndustry: "",
      employeeCount: "1-10",
      faq: "",
      fundingRound: "seed",
      hq: "",
      image: "",
    },
  });

  //This is just a dummy value used to trigger rerenders
  const [trigger, setTrigger] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (error) => {
    console.log(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-7 md:p-[20px] lg:space-y-10"
      >
        <div className="md:flex md:flex-row-reverse md:justify-between md:mb-12">
          <div className="flex justify-between mb-[30px] md:mb-0">
            <Button
              variant="outline"
              className="w-[48%] font-normal tracking-wide md:w-[67px] md:mr-3"
            >
              Cancel
            </Button>
            <Button
              className="w-[48%] font-normal tracking-wide md:w-[110px]"
              type="submit"
            >
              Save changes
            </Button>
          </div>
          <section className="flex mb-12 md:mb-0">
            <Image
              src={
                form.getValues("image")
                  ? URL.createObjectURL(form.getValues("image"))
                  : companyLogo
              }
              width={108}
              height={108}
              alt="Company Logo"
              className="inline-block mr-[30px] w-[108px] h-[108px] rounded-full"
            />
            <div className="flex flex-col justify-center">
              <div className="mb-3">
                <Button
                  variant="destructive"
                  className="mr-3 w-[64px] font-medium text-[12px] py-[6px] px-[10px] tracking-wide"
                  onClick={() => {
                    form.setValue("image", "");
                    setTrigger((trigger) => !trigger);
                  }}
                >
                  Remove
                </Button>

                <input
                  type="file"
                  id="file"
                  className="hidden"
                  accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                  onChange={(e) => {
                    if (e.target.files) {
                      form.setValue("image", e.target.files[0]);
                      setTrigger((trigger) => !trigger);
                    }
                  }}
                />
                <Button
                  variant="outline"
                  className="font-medium text-[12px] py-[6px] px-[10px] tracking-wide"
                  onClick={(e) => {
                    e.preventDefault();
                    const elem = document.querySelector("#file") as HTMLElement;
                    if (elem) elem.click();
                  }}
                >
                  Change Photo
                </Button>
              </div>
              <em className="not-italic text-[#17171f] text-[14px] opacity-40">
                or drag and drop (SVG, PNG, JPG)
              </em>
            </div>
          </section>
        </div>
        <div className="space-y-7 md:grid md:grid-rows-2 md:grid-flow-col md:space-y-0 md:gap-x-10 md:gap-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wide">
                  Company&lsquo;s Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wide">
                  Company&lsquo;s Website
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyLinkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wide">
                  Company&lsquo;s Linkedin
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.linkedin.com/company/example"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyIndustry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wide">
                  Company&lsquo;s Industry
                </FormLabel>
                <FormControl>
                  <Input placeholder="Agrotech" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="employeeCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wide">Employee Count</FormLabel>
              <FormControl>
                <div>
                  {EMPLOYEE_RANGES.map((range, idx) => (
                    <Button
                      variant={range == field.value ? "default" : "outline"}
                      className={cn(
                        "rounded-full",
                        idx != EMPLOYEE_RANGES.length - 1 && "mr-3"
                      )}
                      key={idx}
                      onClick={() => form.setValue("employeeCount", range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wide">
                Company Description
              </FormLabel>
              <FormControl>
                <Input placeholder="Redesign your digital life" {...field} />
              </FormControl>
              <FormDescription>
                Your detailed company description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wide">
                What are your company goals?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bring goodness to the world"
                  className="resize-none h-[60px]"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hq"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wide">Headquarters</FormLabel>
              <FormControl>
                <Input placeholder="New York, USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fundingRound"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wide block">
                Funding Round
              </FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Funding Round ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEED_ROUNDS.map((round, idx) => (
                    <SelectItem key={idx} value={round.value}>
                      {round.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="faq"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wide">FAQs</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/faq" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const Combobox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? SEED_ROUNDS.find((round) => round.value === value)?.label
            : "Select Funding Round"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {SEED_ROUNDS.map((round, idx) => (
              <CommandItem
                key={idx}
                value={round.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value == round.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {round.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
