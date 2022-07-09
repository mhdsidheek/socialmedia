export const LoginStart =(userCredential) =>({
    type :"LOGIN_START"
})
export const LoginSucsess =(user) =>({
    type :"LOGIN_Success",
    payload :user
})
export const LoginFailure =(error) =>({
    type :"LOGIN_Fail",
     payload:error
})

