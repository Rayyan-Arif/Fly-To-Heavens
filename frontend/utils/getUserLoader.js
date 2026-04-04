const getUserLoader = async () => {
  try{
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include'
    });
    const user = await res.json();
    // user = {
    //   status: 'success',
    //   data: {
    //     user: {}
    //   }
    // };
    return user;
  } catch(err){
    return null;
  }
}
export default getUserLoader