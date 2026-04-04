import { NextResponse } from "next/server";
import db from '@/app/db'

export async function POST(req) {
	let { capture } = await req.json();
	try {
		const collection = db.collection('pokedex');

		if(!capture.description){
			return NextResponse.json({
				success: true,
				capture,
			}, {
				status: 200
			});
		}

		if(!capture.voiceUrl){
			const voiceUrl = await generateVoice(capture.description);
			if(voiceUrl){
				capture.voiceUrl = voiceUrl;
				await collection.updateOne(
					{ _id: capture._id },
					{ $set: { voiceUrl: capture.voiceUrl } }
				);
			}
		}

		return NextResponse.json({
			success: true,
			capture,
		}, {
			status: 200
		});

	} catch (err){
		console.log('Voice route error:', err);
		return NextResponse.json({
			success: true,
			capture,
		}, {
			status: 200
		});
	}
};

const generateVoice = async (description) => {
	try {
		const response = await fetch(
			`https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
			{
				method: 'POST',
				headers: {
					'xi-api-key': process.env.ELEVENLABS_API_KEY,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: description,
					model_id: 'eleven_multilingual_v2',
				}),
			}
		);
		if (!response.ok) {
			console.log('ElevenLabs TTS error:', response.status);
			return null;
		}
		const audioBuffer = Buffer.from(await response.arrayBuffer());
		const fileName = `voice_${crypto.randomUUID()}.mp3`;
		const fs = await import('fs/promises');
		const path = await import('path');
		const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'voice');
		await fs.mkdir(uploadsDir, { recursive: true });
		const filePath = path.join(uploadsDir, fileName);
		await fs.writeFile(filePath, audioBuffer);
		return `/uploads/voice/${fileName}`;
	} catch (err) {
		console.log('ElevenLabs TTS error:', err);
		return null;
	}
}
