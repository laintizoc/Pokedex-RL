export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import db from '@/app/db';

export async function GET(req) {

	const collection = db.collection('pokedex');

	const poke = await collection.findOne({
		_id: 'e718bc1c-139b-4d9f-bd06-eee0529e37e6'
	});

	return NextResponse.json({
		success: true,
		poke
	}, {
		status: 200
	});

};
