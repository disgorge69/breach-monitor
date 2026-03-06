import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { Breach, InsertBreach } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useBreaches() {
  return useQuery({
    queryKey: [api.breaches.list.path],
    queryFn: async () => {
      const res = await fetch(api.breaches.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch breaches");
      const data = await res.json();
      return data as Breach[];
    },
    // Poll every 3 seconds to simulate a real-time updating feed
    refetchInterval: 3000,
  });
}

export function useCreateBreach() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBreach) => {
      const res = await fetch(api.breaches.create.path, {
        method: api.breaches.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create breach record");
      }
      return res.json() as Promise<Breach>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.breaches.list.path] });
      toast({
        title: "SYS.MSG",
        description: "Breach record successfully injected into database.",
        className: "bg-background border-primary text-primary font-mono rounded-none",
      });
    },
    onError: (error) => {
      toast({
        title: "ERR.FATAL",
        description: error.message,
        variant: "destructive",
        className: "font-mono rounded-none",
      });
    }
  });
}
