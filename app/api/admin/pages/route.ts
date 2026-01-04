import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { logError } from '@/lib/errors';

// GET /api/admin/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    logError('Error fetching pages', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages - Create a new page
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const newPage = await prisma.page.create({
      data: {
        slug: body.slug,
        title: body.title,
        titleAm: body.title_am,
        content: body.content || {},
        heroImage: body.hero_image,
        metaTitle: body.meta_title,
        metaDescription: body.meta_description,
        ogImage: body.og_image,
        isPublished: body.is_published ?? false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newPage,
        message: 'Page created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    logError('Error creating page', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
