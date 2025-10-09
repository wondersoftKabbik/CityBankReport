// Temporary DB Mockup for login

export const userData = [
    {
        username: "city_touch_admin",
        password: "1234Ff@5",
        userType: "admin",
    },
    {
        username: "user2",
        password: "123456",
        userType: "admin",
    },
    {
        username: "user3",
        password: "123456",
        userType: "admin",
    }
]

export const LoginLogic = (username:String,password:String) => {
    for(const i of userData){
        if(i.username === username && i.password === password){
            return i;
        }
    }
    return false;
}