"use client";

import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { tr } from 'date-fns/locale/tr';

interface DateInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

// Demo fiyat verisi (gerçek kullanımda API'den alınabilir)
const demoPrices: Record<string, number> = {
  '2024-06-16': 120,
  '2024-06-17': 145,
  '2024-06-18': 132,
  '2024-06-19': 210,
  '2024-06-20': 158,
  '2024-07-03': 145,
  '2024-07-04': 120,
  '2024-07-05': 120,
  '2024-07-06': 145,
  '2024-07-07': 132,
};

function CustomDayContent(props: any) {
  const date = props.date;
  if (!(date instanceof Date) || isNaN(date.getTime())) return null;
  const price = Math.floor(100 + (date.getDate() * 7) % 100);
  return (
    <div className="flex flex-col items-center justify-center min-h-[36px] min-w-[32px] gap-0.5 px-0.5 py-0.5 text-sm font-normal">
      <span className="text-xs font-normal text-gray-800">{date.getDate()}</span>
      <span className="text-xs text-green-600 font-normal">{price} €</span>
    </div>
  );
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, disabled, className, placeholder }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(value);
  const inputRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklanınca popup'ı kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  // Seçimi uygula
  const handleApply = () => {
    onChange(selected);
    setShow(false);
  };

  // İptal
  const handleCancel = () => {
    setSelected(value);
    setShow(false);
  };

  // Kısa gün isimleri
  const shortWeekdays = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

  // Başlık formatı
  const formatCaption = (month: Date) =>
    month.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  return (
    <div className={`relative ${className || ''}`} ref={inputRef}>
      <button
        type="button"
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        onClick={() => setShow(!show)}
        disabled={disabled}
      >
        {selected ? selected.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }) : (placeholder || 'Tarih seçin')}
      </button>
      {show && (
        <div className="absolute z-[9999] mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 min-w-[500px] right-0">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            locale={tr}
            numberOfMonths={2}
            className="mb-4 flex flex-row text-sm font-normal"
            showOutsideDays
            components={{
              DayContent: CustomDayContent
            }}
            classNames={{
              day_selected: "bg-gray-200 border border-gray-500 text-gray-900",
              day: "rounded-lg text-sm font-normal"
            }}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={handleCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">İptal</button>
            <button onClick={handleApply} className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600">Tarihi ayarla</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput; 