const API_URL = 'https://api.projectview.uz/api';
const FRONT_API_URL = `${API_URL}/front`;

export default () => {
  // API related
  const filters = useState('filters', () => null);
  const buildings = useState('buildings', () => null);
  const activeBuilding = useState('activeBuilding', () => null);
  const activeFloor = useState('activeFloor', () => null);
  const activeApartment = useState('activeApartment', () => null);

  // Functions
  const fetchFilters = async () => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/filters`);
      if (status.value === 'error') throw new Error('Error occured in fetching filters');
      filters.value = data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBuildings = async () => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/buildings`);
      if (status.value === 'error') throw new Error('Error occured in fetching buildings');
      buildings.value = data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    filters,
    buildings,
    activeBuilding,
    activeFloor,
    activeApartment,
    fetchFilters,
    fetchBuildings
  };
};
