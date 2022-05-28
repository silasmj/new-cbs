import * as SecureStore from 'expo-secure-store';
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import { User } from '../../entities/User';
import EditProfileScreen from '../../screens/EditProfileScreen'

export const SIGNUP = 'SIGNUP';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const LOGOUT = 'LOGOUT';
export const UPDATEUSER = 'UPDATEUSER';
export const NEWUSER = 'NEWUSER';
export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

export const logout = () => {
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}
export const updateUser = (email: string, studyprogramme: string, name: string) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const userId = getState().user.loggedInUser.localid;
        const user = new User(email, name, studyprogramme)
        
        const response = await fetch(
            'https://cbs-project-df515-default-rtdb.europe-west1.firebasedatabase.app//userprofile/' + userId + '.json?auth=' + token,  {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ //javascript to json
                    //key value pairs of data you want to send to server
                    // ...
                    email: email,
                    displayname: name,
                    studyprogramme: studyprogramme

                })
        });
        if (!response.ok) {
            //There was a problem..
            console.log(await response.json());
            
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript

            const updateUser = new User(email, name, studyprogramme, userId)
            dispatch({ type: UPDATEUSER, payload: { updateUser} })

        }
    };
    }

export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAD1NuDV3Ireh_x3erjp967_0MKU0VihB8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                
                email: email,
                password: password,
                returnSecureToken: true,

                
            })
        });

        if (!response.ok) {
            //There was a problem..
            console.log('Something happened');
            
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
        } else {
            console.log('Everythings good');
            
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: SIGNUP, payload: { user, idToken: data.idToken } })
                dispatch(createUser(user))
        }
    };

};

export const createUser = (user: User) => {
    return async(dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        //console.log(token)
        const response = await fetch(
            'https://cbs-project-df515-default-rtdb.europe-west1.firebasedatabase.app//userprofile.json?auth=' + token,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( //javascript to json
                    //key value pairs of data you want to send to server
                    // ...
                        user
        
            )
        });
        //console.log(await response.json())
        const data = await response.json()
        const newUser = new User(user.email, user.displayname, user.studyprogramme, data.name);

        dispatch({type: NEWUSER, payload: {newUser}})

    } 
}