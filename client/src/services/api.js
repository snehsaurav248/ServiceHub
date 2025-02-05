export const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };