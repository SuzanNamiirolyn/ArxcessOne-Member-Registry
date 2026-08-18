import type { UseFormReturn } from "react-hook-form";
import type { Member } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface MemberFormProps {
  form: UseFormReturn<Member>;
  onSubmit: (data: Member) => void;
}

export function MemberForm({ form, onSubmit }: MemberFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <FormField control={form.control} name="fullName" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl><Input placeholder="John Doe" {...field} required /></FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="nationalId" render={({ field }) => (
          <FormItem>
            <FormLabel>National ID</FormLabel>
            <FormControl><Input placeholder="CM12345678" {...field} required /></FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl><Input placeholder="+256..." {...field} /></FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="joinDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Join Date</FormLabel>
            <FormControl><Input type="date" {...field} required /></FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="status" render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "ACTIVE"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )} />

        <Button type="submit" className="w-full">Save Member</Button>
      </form>
    </Form>
  );
}