import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get file path
// NOTE: inquiries.json is in src/data/inquiries.json
const getFilePath = () => path.join(process.cwd(), 'src', 'data', 'inquiries.json');

export async function GET() {
    try {
        const filePath = getFilePath();
        if (!fs.existsSync(filePath)) {
            return NextResponse.json([]);
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading inquiries:', error);
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { corporationName, ceoName, ceoContact, checklist, otherContent } = body;

        // Basic validation: Check mandatory fields
        if (!corporationName || !ceoName || !ceoContact || !checklist || checklist.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newInquiry = {
            id: Date.now().toString(),
            name: ceoName,
            company: corporationName,
            phone: ceoContact,
            checklist: checklist,
            content: otherContent || '', // Only save if exists
            createdAt: new Date().toISOString(),
            status: 'new' // new, read, contacted
        };

        const filePath = getFilePath();
        let inquiries = [];

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            if (fileContent) {
                inquiries = JSON.parse(fileContent);
            }
        }

        inquiries.unshift(newInquiry); // Add new to top

        fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Inquiry submitted' }, { status: 201 });
    } catch (error) {
        console.error('Error saving inquiry:', error);
        return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }
}
