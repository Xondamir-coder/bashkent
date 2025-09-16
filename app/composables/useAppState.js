const API_URL = 'https://api.projectview.uz/api';
const FRONT_API_URL = `${API_URL}/front`;

export default () => {
  // API related
  const filters = useState('filters', () => null);

  // Functions
  const fetchFilters = async () => {
    try {
      const { data, status } = await useFetch(`${FRONT_API_URL}/filters`);
      if (status.value === 'error') throw new Error('Error occured in fetching filters');
      filters.value = data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    filters,
    fetchFilters
  };
};
