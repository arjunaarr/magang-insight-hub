
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api-service";
import { useAuth } from "@/context/auth-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHeader from "@/components/ui/page-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Loader2, Upload, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock image upload function (in a real app, this would use a file upload service)
const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate creating a data URL (in a real app, this would be a URL from your storage service)
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }, 1000);
  });
};

const formSchema = z.object({
  date: z.date({
    required_error: "Tanggal laporan harus diisi.",
  }),
  photos: z.array(z.string()).min(1, "Minimal satu foto harus diunggah."),
});

const SubmitReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      photos: [],
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    
    try {
      const formattedDate = format(values.date, "yyyy-MM-dd");
      await api.intern.submitReport(user.id, formattedDate, values.photos);
      
      toast({
        title: "Laporan berhasil disubmit!",
        description: "Terima kasih telah mengumpulkan laporan hari ini.",
      });
      
      navigate("/my-reports");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Gagal submit laporan",
        description: "Terjadi kesalahan saat mengumpulkan laporan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Get current photos and add new ones
      const currentPhotos = form.getValues("photos") || [];
      const newPhotos = [...currentPhotos, ...uploadedUrls];
      
      // Update form
      form.setValue("photos", newPhotos, { shouldValidate: true });
      setPhotoPreview(newPhotos);
      
      toast({
        title: "Foto berhasil diunggah",
        description: `${files.length} foto telah ditambahkan ke laporan.`,
      });
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast({
        title: "Gagal mengunggah foto",
        description: "Terjadi kesalahan saat mengunggah foto. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = "";
    }
  };
  
  const removePhoto = (index: number) => {
    const currentPhotos = [...form.getValues("photos")];
    currentPhotos.splice(index, 1);
    form.setValue("photos", currentPhotos, { shouldValidate: true });
    setPhotoPreview(currentPhotos);
  };

  return (
    <div>
      <PageHeader
        title="Submit Laporan Kegiatan"
        description="Silakan submit laporan kegiatan harian Anda"
      />

      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Laporan</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Laporan</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {photoPreview.map((photo, index) => (
                          <div 
                            key={index} 
                            className="relative border rounded-md overflow-hidden h-40"
                          >
                            <img 
                              src={photo} 
                              alt={`Preview ${index}`} 
                              className="w-full h-full object-cover" 
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removePhoto(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <label className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-40 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                          <div className="flex flex-col items-center justify-center py-7 px-4">
                            <Plus className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">
                              {uploading ? "Mengupload..." : "Tambah Foto"}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, PNG, atau GIF
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                      
                      {form.formState.errors.photos && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.photos.message}
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={uploading || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Laporan
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubmitReportPage;
