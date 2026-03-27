const getUserLoader = async () => {
  try{
    const API_URL = import.meta.env.VITE_API_URL;
    const user = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include'
    });
    return user;
  } catch(err){
    return null;
  }
}
export default getUserLoader