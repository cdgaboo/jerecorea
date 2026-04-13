export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-24 lg:pt-32 px-8 md:px-12 pb-40">

      <section className="border-b border-border/40 pb-24 relative overflow-hidden animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          <div className="md:col-span-4 lg:col-span-3 space-y-12">
            <div className="space-y-4">
              <div className="h-2 bg-muted/10 w-1/3 rounded-full" />
              <div className="h-4 bg-muted/10 w-2/3 rounded-sm" />
            </div>
            
            <div className="pt-12 border-t border-border/20 space-y-4">
              <div className="flex justify-between">
                <div className="h-2 bg-muted/10 w-4 rounded-full" />
                <div className="h-2 bg-muted/10 w-8 rounded-full" />
              </div>
              <div className="flex justify-between">
                <div className="h-2 bg-muted/10 w-4 rounded-full" />
                <div className="h-2 bg-muted/10 w-16 rounded-full" />
              </div>
              <div className="pt-8 h-10 bg-muted/10 w-full rounded-sm" />
            </div>
          </div>


          <div className="md:col-span-8 lg:col-span-9 space-y-8 text-center md:text-left">
            <div className="h-[12vw] bg-muted/10 w-full rounded-sm" />
            <div className="flex items-center gap-8">
              <div className="hidden md:block w-1/3 h-[1px] bg-muted/10" />
              <div className="h-[12vw] bg-muted/10 w-2/3 rounded-sm" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div />
              <div className="space-y-3">
                <div className="h-3 bg-muted/10 w-full rounded-full" />
                <div className="h-3 bg-muted/10 w-full rounded-full" />
                <div className="h-3 bg-muted/10 w-2/3 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 animate-pulse">
        <div className="flex justify-between items-end mb-24">
          <div className="space-y-4">
            <div className="h-2 bg-muted/10 w-24 rounded-full" />
            <div className="h-10 bg-muted/10 w-64 rounded-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-6">
              <div className="aspect-[4/3] bg-muted/10 w-full rounded-sm" />
              <div className="space-y-3">
                <div className="h-4 bg-muted/10 w-3/4 rounded-sm" />
                <div className="h-2 bg-muted/10 w-1/2 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
