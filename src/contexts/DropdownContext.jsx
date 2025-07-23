import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDepartments, getLocations, getCategories } from '../services/apiServices';
import { AuthContext } from './AuthContext';

const DropdownContext = createContext();
export const useDropdownContext = () => useContext(DropdownContext);

export const DropdownProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const {token} = useContext(AuthContext);

  const refreshDropdown = async (types = 'all') => {
    try {
      setLoading(true);

      const typeList = types === 'all'
        ? ['departments', 'locations', 'categories']
        : Array.isArray(types) ? types : [types];

      await Promise.all(typeList.map(async (type) => {
        try {
          switch (type) {
            case 'departments':
              const dept = await getDepartments();
              setDepartments(dept);
              break;
            case 'locations':
              const locs = await getLocations();
              setLocations(locs);
              break;
            case 'categories':
              const cats = await getCategories();
              setCategories(cats);
              break;
            default:
              console.warn(`Unknown dropdown type: ${type}`);
          }
        } catch (err) {
          console.error(`Failed to fetch ${type}:`, err);
        }
      }));
    } catch (err) {
      console.error('Unexpected error in refreshDropdown:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    refreshDropdown('all');
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        departments,
        locations,
        categories,
        loading,
        refreshDropdown,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
