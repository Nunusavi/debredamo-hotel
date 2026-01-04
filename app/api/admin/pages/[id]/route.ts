import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { logError } from '@/lib/errors';

// GET /api/admin/pages/[id] - Get a single page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    logError('Error fetching page', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pages/[id] - Update a page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updatedPage = await prisma.page.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        titleAm: body.title_am,
        content: body.content,
        heroImage: body.hero_image,
        metaTitle: body.meta_title,
        metaDescription: body.meta_description,
        ogImage: body.og_image,
        isPublished: body.is_published,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: 'Page updated successfully',
    });
  } catch (error: any) {
    logError('Error updating page', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/pages/[id] - Delete a page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error: any) {
    logError('Error deleting page', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
