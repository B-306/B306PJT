

const Logout = () => {
    window.location.href = '/login';
    return(
        
    localStorage.removeItem("jwtToken")
    )
}
    

export default Logout