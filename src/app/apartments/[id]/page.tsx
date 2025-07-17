'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { FaHome, FaHashtag, FaBuilding, FaMoneyBillWave, FaAlignLeft, FaArrowLeft } from 'react-icons/fa';

interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
  price: number;
}

export default function ApartmentDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    api.get(`/apartments/${id}`)
      .then(res => setApartment(res.data))
      .catch(() => setApartment(null));
  }, [id]);

  if (!apartment) return <p>Loading or not found...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-nawy-light to-white flex items-center justify-center p-10 font-sans">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-12 animate-modalPop">
        <h1 className="text-3xl font-extrabold text-nawy-primary mb-8 flex items-center gap-3 tracking-tight drop-shadow">
          <FaHome className="text-nawy-accent" /> {apartment.unitName}
        </h1>
        <div className="space-y-4 text-lg">
          <div className="flex items-center gap-2">
            <FaHashtag className="text-nawy-accent" />
            <span className="font-semibold text-nawy-primary">Unit Number:</span>
            <span className="text-nawy-text">{apartment.unitNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-nawy-accent" />
            <span className="font-semibold text-nawy-primary">Project:</span>
            <span className="text-nawy-text">{apartment.project}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaAlignLeft className="text-nawy-accent" />
            <span className="font-semibold text-nawy-primary">Description:</span>
            <span className="text-nawy-text">{apartment.description}</span>
          </div>
          <div className="flex items-center gap-2 mt-6 text-2xl font-bold text-nawy-accent">
            <FaMoneyBillWave />
            EGP {apartment.price.toLocaleString()}
          </div>
        </div>
        <button
          onClick={() => router.push('/apartments')}
          className="mt-10 bg-gradient-to-r from-nawy-primary to-nawy-accent text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-nawy-accent hover:to-nawy-primary transition-all text-lg font-semibold flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Listings
        </button>
      </div>
    </div>
  );
}