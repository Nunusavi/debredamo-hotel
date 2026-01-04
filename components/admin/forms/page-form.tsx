'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/image-upload';
import { Plus, X, MoveUp, MoveDown } from 'lucide-react';
import { getUserError, logError } from '@/lib/errors';

interface PageContent {
  sections: ContentSection[];
}

interface ContentSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'features' | 'cta';
  title?: string;
  titleAm?: string;
  content?: string;
  contentAm?: string;
  image?: string;
  items?: Array<{
    icon?: string;
    title: string;
    titleAm?: string;
    description: string;
    descriptionAm?: string;
  }>;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  titleAm?: string | null;
  content?: any;
  heroImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  isPublished: boolean;
}

interface PageFormProps {
  page?: Page;
  isEdit?: boolean;
}

export default function PageForm({ page, isEdit = false }: PageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    slug: page?.slug || '',
    title: page?.title || '',
    title_am: page?.titleAm || '',
    hero_image: page?.heroImage || '',
    meta_title: page?.metaTitle || '',
    meta_description: page?.metaDescription || '',
    og_image: page?.ogImage || '',
    is_published: page?.isPublished ?? false,
    content: (page?.content as PageContent) || { sections: [] },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit ? `/api/admin/pages/${page?.id}` : '/api/admin/pages';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to save page';
        const details = data.details ? JSON.stringify(data.details, null, 2) : '';
        setError(`${errorMessage}${details ? '\n\nDetails:\n' + details : ''}`);
        logError('Page save error', data);
        setLoading(false);
        return;
      }

      router.push('/admin/pages');
      router.refresh();
    } catch (err) {
      const userError = getUserError(err);
      setError(userError.message);
      logError('Page form error', err);
      setLoading(false);
    }
  };

  const addSection = (type: ContentSection['type']) => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      type,
      title: '',
      content: '',
    };

    setFormData({
      ...formData,
      content: {
        ...formData.content,
        sections: [...formData.content.sections, newSection],
      },
    });
  };

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        sections: formData.content.sections.map((section) =>
          section.id === id ? { ...section, ...updates } : section
        ),
      },
    });
  };

  const removeSection = (id: string) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        sections: formData.content.sections.filter((section) => section.id !== id),
      },
    });
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const sections = [...formData.content.sections];
    const index = sections.findIndex((s) => s.id === id);

    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];

    setFormData({
      ...formData,
      content: { ...formData.content, sections },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded whitespace-pre-wrap">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English) *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Amharic)
            </label>
            <input
              type="text"
              value={formData.title_am}
              onChange={(e) => setFormData({ ...formData, title_am: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
            }
            required
            placeholder="about-us"
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
          />
          <p className="text-sm text-gray-500 mt-1">
            URL: /{formData.slug || 'page-slug'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image
          </label>
          <ImageUpload
            images={formData.hero_image ? [formData.hero_image] : []}
            onChange={(images) => setFormData({ ...formData, hero_image: images[0] || '' })}
            maxImages={1}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Title
          </label>
          <input
            type="text"
            value={formData.meta_title}
            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            maxLength={60}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.meta_title.length}/60 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Description
          </label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            maxLength={160}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.meta_description.length}/160 characters
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Page Content</h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addSection('text')}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Text Section
            </button>
            <button
              type="button"
              onClick={() => addSection('features')}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Features
            </button>
          </div>
        </div>

        {formData.content.sections.map((section, index) => (
          <div key={section.id} className="border-2 border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 uppercase">
                {section.type} Section
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveSection(section.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(section.id, 'down')}
                  disabled={index === formData.content.sections.length - 1}
                  className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {section.type === 'text' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Section Title (English)"
                    value={section.title || ''}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Section Title (Amharic)"
                    value={section.titleAm || ''}
                    onChange={(e) => updateSection(section.id, { titleAm: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <textarea
                    placeholder="Content (English)"
                    value={section.content || ''}
                    onChange={(e) => updateSection(section.id, { content: e.target.value })}
                    rows={4}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    placeholder="Content (Amharic)"
                    value={section.contentAm || ''}
                    onChange={(e) => updateSection(section.id, { contentAm: e.target.value })}
                    rows={4}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}

            {section.type === 'features' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Add feature items (icons, titles, descriptions)</p>
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Add Feature Item
                </button>
              </div>
            )}
          </div>
        ))}

        {formData.content.sections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No content sections yet. Click the buttons above to add sections.
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Page' : 'Create Page'}
        </button>
      </div>
    </form>
  );
}
