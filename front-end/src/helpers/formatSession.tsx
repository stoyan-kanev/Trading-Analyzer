export const formatSession = (session:string) => {
    if (session == 'new_york'){
        session = "New York";
    }else if (session == 'asia'){
        session = "Asia";
    }else if (session == 'london'){
        session = "London";
    }

    return session;
}
