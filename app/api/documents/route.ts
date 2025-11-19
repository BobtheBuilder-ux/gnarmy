import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type DocItem = {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
};

export async function GET() {
  try {
    const docsDir = path.join(process.cwd(), 'public', 'documents');
    const entries = await fs.readdir(docsDir, { withFileTypes: true });
    const pdfs = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.pdf'))
      .map((e) => e.name);

    const items: DocItem[] = pdfs.map((filename) => {
      const basename = filename.replace(/\.pdf$/i, '');
      const title = basename
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return {
        id: basename,
        title,
        description: 'View-only corporate document',
        path: `/documents/${filename}`,
        category: 'Corporate',
      };
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Failed to list documents' },
      { status: 500 }
    );
  }
}