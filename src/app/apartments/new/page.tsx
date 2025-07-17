'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { FaHome, FaHashtag, FaBuilding, FaMoneyBillWave, FaAlignLeft, FaPlus } from 'react-icons/fa';

export default function AddApartmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    unitName: '',
    unitNumber: '',
    project: '',
    description: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: parseInt(formData.price, 10),
      };
      await api.post('/apartments', payload);
      router.push('/apartments');
    } catch (err) {
      console.error('Failed to add apartment', err);
      alert('Something went wrong.');
    }
  };

  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleDescriptionChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFormData(prev => ({
      ...prev,
      description: (e.target as HTMLDivElement).innerText,
    }));
  };
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nawy-light to-white p-6 font-sans">
          <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl animate-modalPop">
              <h1 className="text-3xl font-extrabold text-nawy-primary mb-8 text-center tracking-tight drop-shadow">
                  <FaPlus className="inline mr-2 text-nawy-accent" /> Add New Apartment
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <FaHome className="absolute left-3 top-3 text-nawy-accent opacity-70" />
                    <input
                        type="text"
                        name="unitName"
                        placeholder="Unit Name"
                        value={formData.unitName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nawy-accent bg-white shadow-sm text-lg"
                    />
                  </div>
                  <div className="relative">
                    <FaHashtag className="absolute left-3 top-3 text-nawy-accent opacity-70" />
                    <input
                        type="text"
                        name="unitNumber"
                        placeholder="Unit Number"
                        value={formData.unitNumber}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nawy-accent bg-white shadow-sm text-lg"
                    />
                  </div>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 text-nawy-accent opacity-70" />
                    <input
                        type="text"
                        name="project"
                        placeholder="Project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nawy-accent bg-white shadow-sm text-lg"
                    />
                  </div>
                  <div className="relative">
                    <FaAlignLeft className="absolute left-3 top-3 text-nawy-accent opacity-70" />
                    <div
                        ref={descriptionRef}
                        contentEditable
                        onInput={handleDescriptionChange}
                        className={`w-full min-h-[100px] pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nawy-accent bg-white shadow-sm text-lg ${!formData.description ? 'text-gray-400' : 'text-black'}`}
                        data-placeholder="Enter description here..."
                        suppressContentEditableWarning={true}
                    >
                        {formData.description}
                    </div>
                    <style jsx>{`
        div[contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af; /* Tailwind's text-gray-400 */
          pointer-events: none;
          display: block;
        }
      `}</style>
                  </div>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-3 text-nawy-accent opacity-70" />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nawy-accent bg-white shadow-sm text-lg"
                    />
                  </div>
                  <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-nawy-primary to-nawy-accent text-white py-3 rounded-xl shadow-lg hover:scale-105 hover:from-nawy-accent hover:to-nawy-primary transition-all text-lg font-semibold flex items-center justify-center gap-2"
                  >
                      <FaPlus /> Add Apartment
                  </button>
              </form>
          </div>
      </div>
  );
}