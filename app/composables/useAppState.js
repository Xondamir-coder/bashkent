export default () => {
  // API URL CONSTANTS
  const API_URL = 'https://api.projectview.uz/api';
  const FRONT_API_URL = `${API_URL}/front`;

  // Fetch data
  const filters = useState('filters', () => null);
  const buildings = useState('buildings', () => null);
  const floors = useState('floors', () => null);
  const apartments = useState('apartments', () => null);

  // Selected data
  const activeBuilding = useState('activeBuilding', () => null);

  // Functions
  const fetchFilters = async () => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/filters`);
      if (status.value === 'error') throw new Error('Error occured in fetching filters');
      filters.value = data.value;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBuildings = async () => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/buildings`);
      if (status.value === 'error') throw new Error('Error occured in fetching buildings');
      buildings.value = data.value;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFloors = async ({ buildingID, blockID }) => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/floors`, {
        query: {
          building_id: buildingID,
          block_id: blockID
        }
      });
      if (status.value === 'error') throw new Error('Error occured in fetching floors');
      floors.value = data.value;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApartment = async apartmentID => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/apartments/${apartmentID}`);
      if (status.value === 'error') throw new Error('Error occured in fetching apartment');
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApartments = async params => {
    try {
      const res = await $fetch(`${FRONT_API_URL}/apartments`, { query: params });
      apartments.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    API_URL,
    FRONT_API_URL,
    activeBuilding,
    filters,
    buildings,
    floors,
    apartments,
    fetchFilters,
    fetchBuildings,
    fetchFloors,
    fetchApartment,
    fetchApartments
  };
};
