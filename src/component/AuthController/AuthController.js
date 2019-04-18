import Cookies from 'universal-cookie';

const AuthController  = {
    CheckAuth : (props) => {
        const cookies = new Cookies();
        const token = cookies.get('token')
        if(token === undefined){
            props.history.push('/login')
        } 
        else{
            const url = process.env.REACT_APP_API_URL+'api/auth/me';
            // const url = 'http://api.swizzl.fr/api/auth/me';
            let fetchData = { 
                method: 'GET',
                headers:{'x-access-token':token}
            }
            fetch(url, fetchData)
            .then( async (resp) => {
                if (resp.ok) {
                    props.history.push('/dashboard')
                } else {
                    cookies.remove('auth');
                    cookies.remove('token');
                    props.history.push('/login')
                }
            });
        }
    },
}

export default AuthController