const user = localStorage.getItem('user');

export const initialState = { 
    token: localStorage.getItem('token') || '',
    user: (user ? JSON.parse(user) : ''),
    sendcode: {
        "user_id": "",
        "code": "",
        "active": false
    },
    username: ""
 }