export const isAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    
    return !!accessToken && !!role;
};