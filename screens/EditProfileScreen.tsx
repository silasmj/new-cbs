import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import { updateUser } from '../store/actions/user.actions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "EditProfile">;

export default function EditProfileScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    
    const [textEmail, setTextEmail] = useState(user.email)
    const [textName, setTextName] = useState(user.displayname)
    const [textStudyprogramme, setTextStudyprogramme] = useState(user.studyprogramme)
    const dispatch = useDispatch();
    const navigation = useNavigation<ScreenNavigationType>()

    const returnToProfile = () => {
        navigation.navigate("Profile")
    }

    const funcWrapper = (textEmail: string, textName: string, textStudyprogramme: string ) => {
        onSave(textEmail, textName, textStudyprogramme)
        returnToProfile()
    }
        
    const onSave = (textEmail: string, textName: string, textStudyprogramme: string ) => {
        if (textEmail !== '' && textName !== '' && textStudyprogramme !== '' ) {
           dispatch(updateUser(textEmail, textStudyprogramme, textName));
        } else {
        alert("inputfield can't be empty")
        }
    }

    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <Input title="What is your email?"
                inputValue={textEmail}
                setText={setTextEmail}
                error="Email cannot be empty"
            />
            <Input title="What's your name?"
                inputValue={textName}
                setText={setTextName}
                error="Name can't be empty"
            />
            <Input title="Study programme"
                inputValue={textStudyprogramme}
                setText={setTextStudyprogramme}
                error="Study programme cannot be empty" 
            /> 

            <Button title="Save" onPress={() => funcWrapper(textEmail, textName, textStudyprogramme)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})