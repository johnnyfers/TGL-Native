import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";
import AsyncStorage from '@react-native-async-storage/async-storage';


const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {
        signUp: (state, action) => {
            let name: string = action.payload.name
            let password: string = action.payload.password
            let email: string = action.payload.email

            axios.post('http://192.168.0.104:8000/users', {
                name,
                password,
                email
            })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already in use',
                    })
                    return err
                })

            Swal.fire(
                'Account Created!',
                '<a style="color: gray; font-weight: bold" href="http://localhost:3000/login">Press Here to Log In</a>',
                'success'
            )
        },

        login: (state, action) => {
            console.log('aaaaa')
            let password: string = action.payload.password
            let email: string = action.payload.email


            axios.post('http://192.168.0.104:8000/sessions', {
                password,
                email
            })
                .then(async (res) => {

                    //localStorage.setItem('token', res.data.token)
                    await AsyncStorage.setItem('@token', res.data.token)

                    // Swal.showLoading()

                    setTimeout(() => {

                    }, 2000)

                })
                .catch(async (err) => {
                    await AsyncStorage.setItem('@token', '')

                    console.log('EROOOOZX|ZX|SDS')
                })
        },

        logout: (state) => {
            async function logoutState() {
                await AsyncStorage.removeItem('@')
            }

            logoutState()
            //localStorage.removeItem('token')

            //window.location.href = 'http://localhost:3000/login';
        },

        validateEmail: (state, action) => {
            let email: string = action.payload.email

            axios.post('http://192.168.0.104:8000/reset', {
                email
            })
                .then((res) => {
                    Swal.fire(
                        'Password Reseting!',
                        'Check your email and follow the instructions to recover your password',
                        'success'
                    )
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err,
                    })
                })

        },

        recoverPassword(state, action) {
            let token: string = action.payload.token
            let password: string = action.payload.password
            let password_confirmation: string = action.payload.passwordConfirmation

            axios.put('http://192.168.0.104:8000/reset', {
                token,
                password,
                password_confirmation
            })
                .then((res) => {
                    Swal.fire(
                        'Password Recoreved!',
                        '<a style="color: gray; font-weight: bold" href="http://localhost:3000/login">Click Here to log in with your new password</a>',
                        'success'
                    )
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err,
                    })
                })
        }
    }
})

export const authActions = authSlice.actions

export default authSlice