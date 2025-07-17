'use client';

import { useEffect, useRef, useState } from 'react';
import api from '../../lib/api';
import Link from 'next/link';
import { FaSearch, FaBuilding, FaHashtag, FaHome, FaPlus, FaMoneyBillWave } from 'react-icons/fa';

interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  project: string;
  price: number;
  description?: string;
}

export default function ApartmentsList() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    unitName: '',
    unitNumber: '',
    project: '',
  });
  const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const isFiltering = filters.unitName || filters.unitNumber || filters.project;

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400); // 400ms debounce

    return () => clearTimeout(timeout);
  }, [filters]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const query = new URLSearchParams();

        if (debouncedFilters.unitName) query.append('unitName', debouncedFilters.unitName);
        if (debouncedFilters.unitNumber) query.append('unitNumber', debouncedFilters.unitNumber);
        if (debouncedFilters.project) query.append('project', debouncedFilters.project);

        const res = await api.get(`/apartments?${query.toString()}`);
        setApartments(res.data);
      } catch (err) {
        console.error('Failed to fetch apartments:', err);
      }
    };

    fetchApartments();
  }, [debouncedFilters]);

  // Fetch details when selectedApartmentId changes
  useEffect(() => {
    if (selectedApartmentId !== null) {
      setDetailsLoading(true);
      api.get(`/apartments/${selectedApartmentId}`)
        .then(res => setSelectedApartment(res.data))
        .catch(() => setSelectedApartment(null))
        .finally(() => setDetailsLoading(false));
    } else {
      setSelectedApartment(null);
    }
  }, [selectedApartmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
      <div className="min-h-screen bg-gradient-to-br from-nawy-light to-white p-6 font-sans" style={{ padding: 20 }}>
          <h1 className="text-4xl font-extrabold text-center text-nawy-primary mb-6 tracking-tight drop-shadow">
              Apartment Listings
          </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-8 bg-white/80 rounded-xl shadow p-4">
            <div className="relative w-60">
              <FaHome className="absolute left-3 top-3 text-nawy-accent opacity-70" />
              <input
                  type="text"
                  name="unitName"
                  placeholder="Search by Unit Name"
                  value={filters.unitName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nawy-accent transition bg-white shadow-sm"
              />
            </div>
            <div className="relative w-60">
              <FaHashtag className="absolute left-3 top-3 text-nawy-accent opacity-70" />
              <input
                  type="text"
                  name="unitNumber"
                  placeholder="Search by Unit Number"
                  value={filters.unitNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nawy-accent transition bg-white shadow-sm"
              />
            </div>
            <div className="relative w-60">
              <FaBuilding className="absolute left-3 top-3 text-nawy-accent opacity-70" />
              <input
                  type="text"
                  name="project"
                  placeholder="Search by Project"
                  value={filters.project}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nawy-accent transition bg-white shadow-sm"
              />
            </div>
            <button
              className="ml-2 px-4 py-2 rounded-md bg-nawy-accent text-white flex items-center gap-2 shadow hover:bg-nawy-primary transition"
              onClick={() => setFilters({ unitName: '', unitNumber: '', project: '' })}
              title="Clear filters"
            >
              <FaSearch />
              Clear
            </button>
            </div>
            <div
  className={`gap-8 mx-auto ${
    apartments.length === 1
      ? 'flex justify-center'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-screen-xl'
  }`}
>
  {apartments.map(apartment => (
    <div
      key={apartment.id}
      className={`cursor-pointer bg-white border border-gray-100 rounded-2xl p-7 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 ease-in-out flex flex-col gap-2 relative group ${
        apartments.length === 1 ? 'w-full max-w-md' : ''
      }`}
    onClick={() => setSelectedApartmentId(apartment.id)}
    role="button"
    tabIndex={0}
      >
      <div className="flex items-center gap-2 text-nawy-primary text-2xl font-semibold group-hover:underline">
        <FaHome className="text-nawy-accent" />
        {apartment.unitName}
      </div>
      <div className="flex items-center gap-2 text-nawy-text mt-1">
        <FaBuilding className="text-nawy-accent" />
        {apartment.project}
      </div>
      <div className="flex items-center gap-2 text-nawy-accent font-medium mt-2 text-lg">
        <FaMoneyBillWave />
        ${apartment.price.toLocaleString()}
      </div>
    </div>
  ))}
</div>
          <div className="mt-10 text-center">
              <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-nawy-primary to-nawy-accent text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-nawy-accent hover:to-nawy-primary transition-all text-lg font-semibold"
              >
                  <FaPlus />
                  Add New Apartment
              </button>
          </div>
          {showModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn">
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl h-[80vh] relative animate-modalPop">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-10 text-2xl"
        title="Close"
      >
        ✕
      </button>
      <iframe
        src="/apartments/new"
        className="w-full h-full border-0 rounded-b-2xl"
      />
    </div>
  </div>
)}
      {/* Apartment Details Modal */}
      {selectedApartmentId !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl relative animate-modalPop p-10 font-sans">
            <button
              onClick={() => setSelectedApartmentId(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-10 text-2xl"
              title="Close"
            >
              ✕
            </button>
            {detailsLoading || !selectedApartment ? (
              <div className="flex items-center justify-center h-40 text-nawy-primary text-xl font-semibold">Loading...</div>
            ) : (
              <div>
                <h1 className="text-3xl font-extrabold text-nawy-primary mb-8 flex items-center gap-3 tracking-tight drop-shadow">
                  <FaHome className="text-nawy-accent" /> {selectedApartment.unitName}
                </h1>
                <div className="space-y-4 text-lg">
                  <div className="flex items-center gap-2">
                    <FaHashtag className="text-nawy-accent" />
                    <span className="font-semibold text-nawy-primary">Unit Number:</span>
                    <span className="text-nawy-text">{selectedApartment.unitNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-nawy-accent" />
                    <span className="font-semibold text-nawy-primary">Project:</span>
                    <span className="text-nawy-text">{selectedApartment.project}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-nawy-accent" />
                    <span className="font-semibold text-nawy-primary">Price:</span>
                    <span className="text-nawy-accent font-bold">EGP {selectedApartment.price.toLocaleString()}</span>
                  </div>
                  {selectedApartment.description && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-nawy-primary">Description:</span>
                      <span className="text-nawy-text">{selectedApartment.description}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
  );
}