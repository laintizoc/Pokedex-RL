"use client";
import { StoreContext, useContext, observer } from '@/app/Mobx'

import Header from '@/app/layout/Header'
import Footer from '@/app/layout/Footer'

const Pokedex = observer(() => {
  const store = useContext(StoreContext)
  return (
    <>
      <Header />
      <>
      <h1>Pokédex</h1>
          {store.capture.image}
          <input type="file" onChange={store.handleCaptureImage} />
          <button onClick={store.fetchVoice} className="p-2 bg-gray-200 rounded">Absenden</button>
          {store.capture.image && 
            <img src={store.capture.image} className="rounded-lg max-h-[200px]" />}
            {store.capture.voiceUrl && 
              <audio src={store.capture.voiceUrl} controls autoPlay playsInline />}
            <div>Stimme URL: {store.capture.voiceUrl}</div>
            <div>Name: {store.capture.object}</div>
            <div>Spezies: {store.capture.species}</div>
            <div>Gewicht: {store.capture.weight}</div>
            <div>Größe: {store.capture.height}</div>
            <div>KP: {store.capture.hp}</div>
            <div>Angriff: {store.capture.attack}</div>
            <div>Verteidigung: {store.capture.defense}</div>
            <div>Tempo: {store.capture.speed}</div>
            <div>Typ: {store.capture.type}</div>
            <div>Beschreibung: {store.capture.description}</div>
        </>
      <Footer />
    </>
  );
});



export default Pokedex;