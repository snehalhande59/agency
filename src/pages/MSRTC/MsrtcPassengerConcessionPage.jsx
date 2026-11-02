import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, MapPin, Award, ShieldAlert, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { MSRTC_CONCESSIONS } from '../../services/msrtc/msrtcService';

export const MsrtcPassengerConcessionPage = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    passengers,
    updatePassenger,
    boardingPoint,
    droppingPoint,
    setBoardingPoint,
    setDroppingPoint,
    contactDetails,
    setContactDetails
  } = useMsrtcStore();

  const [contactMobile, setContactMobile] = useState(contactDetails.mobile || '9820198420');
  const [contactEmail, setContactEmail] = useState(contactDetails.email || 'passenger@mahamobility.io');
  const [validationError, setValidationError] = useState('');

  const handleBoardingChange = (e) => {
    const pt = selectedBus?.boardingPoints?.find((p) => p.name === e.target.value);
    if (pt) setBoardingPoint(pt);
  };

  const handleDroppingChange = (e) => {
    const pt = selectedBus?.droppingPoints?.find((p) => p.name === e.target.value);
    if (pt) setDroppingPoint(pt);
  };

  const handleProceed = (e) => {
    e.preventDefault();
    // Validate passengers
    for (let p of passengers) {
      if (!p.name || !p.name.trim()) {
        setValidationError(`Please enter passenger name for Seat #${p.seatNumber}`);
        return;
      }
      if (!p.age || isNaN(p.age) || p.age < 1 || p.age > 110) {
        setValidationError(`Please enter a valid age for Seat #${p.seatNumber}`);
        return;
      }
      if (p.concessionCode !== 'NONE' && (!p.idProofNumber || !p.idProofNumber.trim())) {
        setValidationError(`Please enter Government ID/Aadhaar number for Seat #${p.seatNumber} to avail state concession.`);
        return;
      }
    }

    setContactDetails({ mobile: contactMobile, email: contactEmail });
    setValidationError('');
    navigate('/msrtc/review');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/msrtc/seats"
          className="p-2.5 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:text-rose-600 hover:bg-rose-50 border border-[#E5EDF5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
            Boarding Stages &amp; Passenger Manifest
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure boarding points, traveller particulars and Maharashtra Government concessions
          </p>
        </div>
      </div>

      {validationError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="font-bold">{validationError}</span>
        </div>
      )}

      <form onSubmit={handleProceed} className="space-y-8">
        
        {/* 1. Boarding & Dropping Points Selection */}
        <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>Select Boarding &amp; Dropping Points</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Boarding Point ({selectedBus?.originDepot || 'Origin'})
              </label>
              <select
                value={boardingPoint?.name || selectedBus?.boardingPoints?.[0]?.name}
                onChange={handleBoardingChange}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
              >
                {selectedBus?.boardingPoints?.map((bp, i) => (
                  <option key={i} value={bp.name}>
                    {bp.name} — ({bp.time})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Dropping Point ({selectedBus?.destDepot || 'Destination'})
              </label>
              <select
                value={droppingPoint?.name || selectedBus?.droppingPoints?.[selectedBus?.droppingPoints?.length - 1]?.name}
                onChange={handleDroppingChange}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
              >
                {selectedBus?.droppingPoints?.map((dp, i) => (
                  <option key={i} value={dp.name}>
                    {dp.name} — ({dp.time})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Passenger Details per Seat */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-rose-600" />
              <span>Passenger Details ({passengers.length} Travellers)</span>
            </h3>
            <span className="text-xs text-[#64748B] font-semibold">Government concession auto-applied</span>
          </div>

          {passengers.map((p, idx) => {
            const selectedConcession = MSRTC_CONCESSIONS.find((c) => c.code === p.concessionCode);

            return (
              <div
                key={p.seatNumber}
                className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                      #{p.seatNumber}
                    </span>
                    <span className="text-xs font-bold text-[#153B5B] uppercase">Passenger {idx + 1}</span>
                  </div>

                  {selectedConcession && selectedConcession.discountPercent > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <Award className="w-3 h-3 text-emerald-600" />
                      {selectedConcession.discountPercent}% Subsidized
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-[#153B5B] mb-1">
                      Full Legal Name (as per Photo ID)
                    </label>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => updatePassenger(p.seatNumber, { name: e.target.value })}
                      placeholder="e.g. Ramesh Kulkarni"
                      required
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>

                  {/* Age */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-[#153B5B] mb-1">Age</label>
                    <input
                      type="number"
                      value={p.age}
                      min="1"
                      max="110"
                      onChange={(e) => updatePassenger(p.seatNumber, { age: e.target.value })}
                      placeholder="e.g. 45"
                      required
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>

                  {/* Gender */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-[#153B5B] mb-1">Gender</label>
                    <select
                      value={p.gender}
                      onChange={(e) => {
                        const newGender = e.target.value;
                        const autoConcession = newGender === 'Female' ? 'MAHILA_SAMMAN' : p.concessionCode;
                        updatePassenger(p.seatNumber, { gender: newGender, concessionCode: autoConcession });
                      }}
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                </div>

                {/* Maharashtra State Concession Selector */}
                <div className="p-4 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-[#153B5B] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      Maharashtra Government Travel Concession
                    </label>
                    <span className="text-[10px] text-[#64748B]">Subject to conductor verification on board</span>
                  </div>

                  <select
                    value={p.concessionCode}
                    onChange={(e) => updatePassenger(p.seatNumber, { concessionCode: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs text-[#153B5B] font-bold focus:outline-none focus:border-rose-600"
                  >
                    {MSRTC_CONCESSIONS.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {p.concessionCode !== 'NONE' && (
                    <div>
                      <label className="block text-[11px] font-bold text-amber-800 mb-1">
                        Enter Gov ID / Aadhaar / UDID Proof Number:
                      </label>
                      <input
                        type="text"
                        value={p.idProofNumber || ''}
                        onChange={(e) => updatePassenger(p.seatNumber, { idProofNumber: e.target.value })}
                        placeholder="e.g. 5432-XXXX-1234 or UDID/MH/XXXX"
                        required
                        className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2 text-xs text-[#153B5B] font-bold focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* 3. Primary Contact Particulars */}
        <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-600" />
            <span>Contact Details (For Demo E-Ticket Delivery)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Mobile Number (+91)
              </label>
              <input
                type="tel"
                value={contactMobile}
                onChange={(e) => setContactMobile(e.target.value)}
                placeholder="9820XXXXXX"
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="passenger@example.com"
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5EDF5]">
          <Link
            to="/msrtc/seats"
            className="text-xs font-bold text-[#64748B] hover:text-[#153B5B] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Seat Layout</span>
          </Link>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Proceed to Fare Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
