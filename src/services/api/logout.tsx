
export function logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.reload();
}
