const users = [
    {
        username: "john_doe",
        account_no: "ACC123456",
        email: "john.doe@example.com",
        password: "hashed_password_1"
    },
    {
        username: "alice_smith",
        account_no: "ACC789012",
        email: "alice.smith@example.com",
        password: "hashed_password_2"
    },
    {
        username: "michael_brown",
        account_no: "ACC345678",
        email: "michael.brown@example.com",
        password: "hashed_password_3"
    }
];

export const authenticateUser = (email, password) => {
    const user = users.find(u => u.email === email);
    if (!user) {
        return { success: false, message: "User not found" };
    }
    
    // In a real app, you would hash the password and compare with stored hash
    if (user.password === password) {
        const { password, ...userWithoutPassword } = user;
        return {
            success: true,
            user: userWithoutPassword,
            message: "Login successful"
        };
    }
    
    return { success: false, message: "Invalid credentials" };
};

export const getCurrentUser = () => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
};

export const logoutUser = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.href = '/';
};
