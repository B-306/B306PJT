

const Logout = () => {
    window.location.href = '/login';
    return(
        
    localStorage.clear()
    )
}
    

export default Logout