import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import PageForm from '@/components/admin/forms/page-form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPagePage({ params }: PageProps) {
  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id },
  });

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Edit Page</h2>
      <PageForm page={page} isEdit={true} />
    </div>
  );
}
