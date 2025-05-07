
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { RegisterUserData } from "@/types";
import { User, Check } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Nama harus minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  university: z.string().min(1, "Universitas harus diisi"),
  field: z.string().min(1, "Bidang harus diisi"),
});

const RegisterInternPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [universities, setUniversities] = React.useState<string[]>([]);
  const [fields, setFields] = React.useState<{id: string, name: string}[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const universitiesData = await api.admin.getUniversities();
        const fieldsData = await api.admin.getFields();
        
        setUniversities(universitiesData);
        setFields(fieldsData);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      university: "",
      field: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const userData: RegisterUserData = {
        name: values.name,
        email: values.email,
        university: values.university,
        field: values.field,
        role: "intern",
      };
      
      await api.admin.registerIntern(userData);
      
      toast({
        title: "Sukses!",
        description: "Anak magang berhasil ditambahkan",
      });
      
      navigate("/interns");
    } catch (error) {
      console.error("Error registering intern:", error);
      toast({
        title: "Gagal!",
        description: "Terjadi kesalahan saat menambahkan anak magang",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Tambah Anak Magang"
        description="Daftarkan anak magang baru ke sistem"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contoh@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Universitas</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih universitas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {universities.map((university, index) => (
                          <SelectItem key={index} value={university}>
                            {university}
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
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidang</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih bidang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fields.map((fieldOption) => (
                          <SelectItem key={fieldOption.id} value={fieldOption.name}>
                            {fieldOption.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    "Memproses..."
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Tambah Anak Magang
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterInternPage;
