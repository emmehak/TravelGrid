import React, { useState } from 'react';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';
import { Users, CalendarDays, MapPin, Plane, TrainFront, Bus, Car, ArrowRightLeft } from 'lucide-react';

const tripModes = [
  { label: 'One-Way', value: 'oneWay' },
  { label: 'Round Trip', value: 'roundTrip' },
];

const travelOptions = [
  { label: 'Flight', value: 'flight', icon: <Plane size={18} /> },
  { label: 'Train', value: 'train', icon: <TrainFront size={18} /> },
  { label: 'Bus', value: 'bus', icon: <Bus size={18} /> },
  { label: 'Cab', value: 'cab', icon: <Car size={18} /> },
];

function TicketBooking() {
  const [tripMode, setTripMode] = useState('oneWay');
  const [travelType, setTravelType] = useState('flight');
  const [form, setForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
    cabin: 'Economy',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ from: '', to: '', depart: '', return: '', passengers: 1, cabin: 'Economy' });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      <Navbar />
      <main className="relative flex flex-col flex-1 items-center w-full pt-24 pb-10 px-4">
        {/* Background city image */}
        <img
          src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80"
          alt="City skyline"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md border border-pink-400/30 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Travel type tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-6 sm:mb-8">
            {travelOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTravelType(opt.value)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-all border text-sm sm:text-base ${
                  travelType === opt.value
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-white/20 text-white border-transparent hover:bg-pink-700/20'
                }`}
              >
                {opt.icon}
                <span className="whitespace-nowrap">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Trip mode toggle */}
          <div className="flex gap-2 sm:gap-4 justify-center mb-8 sm:mb-10">
            {tripModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => setTripMode(mode.value)}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium border transition-all text-sm sm:text-base ${
                  tripMode === mode.value
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white/20 text-white border-transparent hover:bg-pink-700/20'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Form or Success Message */}
          {submitted ? (
            <div className="text-center text-pink-100">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-4 flex items-center justify-center gap-2">
                <ArrowRightLeft size={24} /> Booking Confirmed!
              </h3>
              <p className="max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
                You have booked a {travelType} {tripMode === 'roundTrip' ? 'round-trip' : 'one-way'} ticket from
                <span className="font-semibold text-white"> {form.from}</span> to
                <span className="font-semibold text-white"> {form.to}</span> departing on
                <span className="font-semibold text-white"> {form.depart}</span>
                {tripMode === 'roundTrip' && (
                  <>
                    {' '}and returning on
                    <span className="font-semibold text-white"> {form.return}</span>
                  </>
                )}
                . Travellers: <span className="font-semibold text-white">{form.passengers}</span> • Cabin:
                <span className="font-semibold text-white"> {form.cabin}</span>.
              </p>
              <button
                className="mt-6 sm:mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold"
                onClick={resetForm}
              >
                New Search
              </button>
            </div>
          ) : (
            <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              {/* Core search panel */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-end">
                {/* From */}
                <div className="sm:col-span-1">
                  <label className="relative block">
                    <MapPin className="absolute top-3 left-3 text-pink-400" size={18} />
                    <input
                      type="text"
                      name="from"
                      placeholder="From"
                      required
                      value={form.from}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                    />
                  </label>
                </div>
                
                {/* Swap button - only visible on desktop */}
                <div className="hidden md:flex">
                  <button
                    type="button"
                    title="Swap"
                    onClick={() => setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }))}
                    className="flex items-center justify-center w-full h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-all"
                  >
                    <ArrowRightLeft size={20} />
                  </button>
                </div>
                
                {/* To */}
                <div className="sm:col-span-1">
                  <label className="relative block">
                    <MapPin className="absolute top-3 left-3 text-pink-400" size={18} />
                    <input
                      type="text"
                      name="to"
                      placeholder="To"
                      required
                      value={form.to}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                    />
                  </label>
                </div>
                
                {/* Depart Date */}
                <div className="sm:col-span-1">
                  <label className="relative block">
                    <CalendarDays className="absolute top-3 left-3 text-pink-400" size={18} />
                    <input
                      type="date"
                      name="depart"
                      required
                      value={form.depart}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                    />
                  </label>
                </div>
                
                {/* Return Date (conditional) */}
                {tripMode === 'roundTrip' ? (
                  <div className="sm:col-span-1">
                    <label className="relative block">
                      <CalendarDays className="absolute top-3 left-3 text-pink-400" size={18} />
                      <input
                        type="date"
                        name="return"
                        required
                        value={form.return}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                      />
                    </label>
                  </div>
                ) : (
                  /* Travellers field occupies return column for one-way on desktop */
                  <div className="hidden md:block">
                    <label className="relative block">
                      <Users className="absolute top-3 left-3 text-pink-400" size={18} />
                      <input
                        type="number"
                        name="passengers"
                        min="1"
                        max="10"
                        required
                        value={form.passengers}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Mobile swap button */}
              <div className="flex justify-center md:hidden">
                <button
                  type="button"
                  title="Swap locations"
                  onClick={() => setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }))}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-all"
                >
                  <ArrowRightLeft size={16} />
                  <span>Swap</span>
                </button>
              </div>

              {/* Passengers & Class row */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ${tripMode === 'oneWay' ? 'md:hidden' : ''}`}>
                <label className="relative block">
                  <Users className="absolute top-3 left-3 text-pink-400" size={18} />
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    max="10"
                    required
                    value={form.passengers}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                  />
                </label>
                <select
                  name="cabin"
                  value={form.cabin}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                >
                  {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Additional cabin selection for one-way trips on desktop (to maintain layout consistency) */}
              {tripMode === 'oneWay' && (
                <div className="hidden md:grid md:grid-cols-2 gap-6">
                  <div></div> {/* Empty div to maintain grid layout */}
                  <select
                    name="cabin"
                    value={form.cabin}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                  >
                    {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3 sm:py-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl text-base sm:text-lg tracking-wide shadow-lg transition-all hover:shadow-pink-700/50"
              >
                Search {travelType.charAt(0).toUpperCase() + travelType.slice(1)}s
              </button>
            </form>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default TicketBooking;