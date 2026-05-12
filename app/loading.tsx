import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-red-600/20 blur-2xl" />

          <Image
            src="/layout/logo.jpg"
            alt="Loading"
            width={130}
            height={130}
            className="relative rounded-full border border-white/10 shadow-[0_0_60px_rgba(217,4,41,0.4)]"
          />
        </div>

        <div className="mt-10 flex gap-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-[#D90429]" />

          <div
            className="h-3 w-3 animate-bounce rounded-full bg-[#D90429]"
            style={{ animationDelay: "0.15s" }}
          />

          <div
            className="h-3 w-3 animate-bounce rounded-full bg-[#D90429]"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[#9CA3AF]">
          Cargando Atlético EFIS
        </p>
      </div>
    </div>
  );
}