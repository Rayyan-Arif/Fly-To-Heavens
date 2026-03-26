const getUserLoader = async () => {
  try{
    const user = await fetch('http://localhost:5000/api/users/me', {
      method: 'GET',
      credentials: 'include'
    });
    return user;
  } catch(err){
    return null;
  }
}
export default getUserLoader