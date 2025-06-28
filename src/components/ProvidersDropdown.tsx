import React, { useEffect, useState } from 'react';

export default function ProvidersDropdown() {
  const [providers, setProviders] = useState<{ id: string; name: string }[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetch('/api/lookups/providers')
      .then((res) => res.json())
      .then(setProviders);
  }, []);

  return (
    <div>
      <label htmlFor="provider-select" className="block mb-1 font-medium">Tedarikçi Seçin</label>
      <select
        id="provider-select"
        className="border rounded px-2 py-1"
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value="">Tümü</option>
        {providers.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  );
} 