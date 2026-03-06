import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { useCreateBreach } from "@/hooks/use-breaches";

const formSchema = z.object({
  name: z.string().min(1, "Entity name required"),
  domain: z.string().min(1, "Domain required"),
  breachDate: z.string().min(1, "Date required"),
  description: z.string().min(1, "Description required"),
  recordCount: z.coerce.number().min(1, "Must be > 0"),
  severity: z.enum(["critical", "high", "medium", "low"]),
});

type FormData = z.infer<typeof formSchema>;

export function CreateBreachDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createBreach, isPending } = useCreateBreach();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      breachDate: new Date().toISOString().split("T")[0],
      description: "",
      recordCount: 0,
      severity: "high",
    },
  });

  const onSubmit = (data: FormData) => {
    // Coerce the date string to a proper ISO timestamp for the API
    const payload = {
      ...data,
      breachDate: new Date(data.breachDate).toISOString(),
    };

    createBreach(payload, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 border border-primary bg-primary/10 px-4 py-2 font-bold text-primary hover:bg-primary hover:text-black transition-colors duration-200 box-glow"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        INJECT_RECORD
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
          <div className="w-full max-w-xl border border-primary bg-card p-6 shadow-[0_0_30px_rgba(0,255,0,0.15)] relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
              <h2 className="text-xl font-bold tracking-widest text-glow">
                NEW_BREACH_ENTRY.exe
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary hover:bg-primary hover:text-black p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-primary/70 block">ENTITY_NAME</label>
                  <input
                    {...register("name")}
                    className="w-full bg-background border border-border p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-primary/30"
                    placeholder="e.g. MegaCorp"
                  />
                  {errors.name && <span className="text-destructive text-xs block mt-1">{errors.name.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-primary/70 block">DOMAIN</label>
                  <input
                    {...register("domain")}
                    className="w-full bg-background border border-border p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-primary/30"
                    placeholder="e.g. megacorp.com"
                  />
                  {errors.domain && <span className="text-destructive text-xs block mt-1">{errors.domain.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-primary/70 block">BREACH_DATE</label>
                  <input
                    type="date"
                    {...register("breachDate")}
                    className="w-full bg-background border border-border p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  {errors.breachDate && <span className="text-destructive text-xs block mt-1">{errors.breachDate.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-primary/70 block">SEVERITY_LEVEL</label>
                  <select
                    {...register("severity")}
                    className="w-full bg-background border border-border p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="critical">CRITICAL</option>
                    <option value="high">HIGH</option>
                    <option value="medium">MEDIUM</option>
                    <option value="low">LOW</option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-primary/70 block">RECORDS_COMPROMISED</label>
                  <input
                    type="number"
                    {...register("recordCount")}
                    className="w-full bg-background border border-border p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-primary/30"
                    placeholder="1000000"
                  />
                  {errors.recordCount && <span className="text-destructive text-xs block mt-1">{errors.recordCount.message}</span>}
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-primary/70 block">DESCRIPTION_DUMP</label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full bg-background border border-border p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-primary/30"
                    placeholder="Describe the nature of the breach..."
                  />
                  {errors.description && <span className="text-destructive text-xs block mt-1">{errors.description.message}</span>}
                </div>
              </div>

              <div className="flex justify-end pt-4 mt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 border border-transparent text-primary/60 hover:text-primary mr-2"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 border border-primary bg-primary text-black font-bold hover:bg-transparent hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "EXECUTING..." : "EXECUTE_INJECT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
