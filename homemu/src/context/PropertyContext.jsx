import { createContext, useContext, useState } from 'react';
import initialProperties from '../data/properties.json';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(initialProperties);

  const addProperty = (newProperty) => {
    const id = Math.max(...properties.map(p => p.id)) + 1;
    setProperties([...properties, { id, ...newProperty }]);
  };

  const updateProperty = (id, updatedProperty) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updatedProperty } : p));
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  return useContext(PropertyContext);
}