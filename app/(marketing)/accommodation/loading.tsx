import { Skeleton } from "@/components/ui/skeleton";

export default function AccommodationLoading() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Page Header Skeleton */}
      <section className="bg-navy-600 text-white py-8 md:py-20">
        <div className="container mx-auto px-4">
          <div>
            <Skeleton className="h-12 w-96 bg-navy-500 mb-4" />
            <Skeleton className="h-6 w-full  bg-navy-500" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Skeleton */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg border space-y-6">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Room Grid Skeleton */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden border"
                  >
                    <Skeleton className="h-64 w-full" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
