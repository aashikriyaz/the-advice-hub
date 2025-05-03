
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROBLEM_CATEGORIES, ProblemCategory } from "@/types/problem";
import { submitProblem } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000, "Description cannot exceed 2000 characters"),
  category: z.enum(PROBLEM_CATEGORIES as [ProblemCategory, ...ProblemCategory[]]),
  isAnonymous: z.boolean().default(true),
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProblemForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      isAnonymous: true,
      name: "",
      email: "",
    },
  });
  
  const isAnonymous = form.watch("isAnonymous");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      // Ensure required fields are present before submitting
      const problemData = {
        title: data.title,
        description: data.description,
        category: data.category,
        isAnonymous: data.isAnonymous,
        // Only include name and email if not anonymous
        ...(data.isAnonymous ? {} : {
          name: data.name,
          email: data.email,
        })
      };
      
      // Submit problem to "database"
      submitProblem(problemData);
      
      toast({
        title: "Problem submitted successfully",
        description: "Thank you for sharing your problem. We'll review it soon.",
      });
      
      // Reset form
      form.reset();
      
      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Error submitting problem:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your problem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Give your problem a short, descriptive title" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROBLEM_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your problem in detail" 
                  className="h-36"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isAnonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Submit Anonymously</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Check this if you don't want to provide your personal details
                </p>
              </div>
            </FormItem>
          )}
        />
        
        {!isAnonymous && (
          <div className="space-y-4 animate-fade-in">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email for follow-up" 
                      type="email"
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-advice-600 hover:bg-advice-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Problem"}
        </Button>
      </form>
    </Form>
  );
};

export default ProblemForm;
