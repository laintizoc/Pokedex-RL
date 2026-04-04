import { NextResponse } from "next/server";
import db from '@/app/db';

export async function POST(req) {

	let { _id } = await req.json();

	console.log(`_id`, _id)

	const collection = db.collection('pokedex');
	const pokemon = await collection.deleteOne({
		_id
	});

	return NextResponse.json({
		success: true,
		pokemon
	}, {
		status: 200
	});

};
