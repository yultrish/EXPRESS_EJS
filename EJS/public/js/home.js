let usr = URLSearchParams.get('username');

if(!usr){
    window.location.href = '/login';
}