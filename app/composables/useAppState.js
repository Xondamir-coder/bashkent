const API_URL = 'https://api.projectview.uz/api';
const FRONT_API_URL = `${API_URL}/front`;

export default () => {
  // Fetch data
  const filters = useState('filters', () => null);
  const buildings = useState('buildings', () => null);
  const floors = useState('floors', () => null);

  // Selected data
  const activeBuilding = useState('activeBuilding', () => null);

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

  const fetchFloors = async ({ buildingID, blockID }) => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/floors`, {
        query: {
          building_id: buildingID,
          block_id: blockID
        }
      });
      if (status.value === 'error') throw new Error('Error occured in fetching buildings');
      floors.value = data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApartment = async apartmentID => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/apartments/${apartmentID}`);
      if (status.value === 'error') throw new Error('Error occured in fetching buildings');
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    filters,
    buildings,
    floors,
    activeBuilding,
    fetchFilters,
    fetchBuildings,
    fetchFloors,
    fetchApartment
  };
};
