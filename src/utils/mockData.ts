
export const mockUsers = [
    {
        id: 1,
        full_name: "Admin User",
        email: "harsh.kumar60456@gmail.com",
        username: "harsh.kumar60456",
        role: "Admin",
        is_approved: 1,
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        full_name: "Test Student",
        email: "student@gmail.com",
        username: "student",
        role: "Student",
        is_approved: 1,
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 3,
        full_name: "Test Coordinator",
        email: "coordinator@gmail.com",
        username: "coordinator",
        role: "Coordinator",
        is_approved: 1,
        created_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
        id: 4,
        full_name: "Test Member",
        email: "member@gmail.com",
        username: "member",
        role: "ClubMember",
        is_approved: 1,
        created_at: new Date(Date.now() - 259200000).toISOString()
    },
    {
        id: 5,
        full_name: "Pending User",
        email: "pending@gmail.com",
        username: "pending",
        role: "Student",
        is_approved: 0,
        created_at: new Date(Date.now() - 100000).toISOString()
    }
];

export const mockLogin = (emailOrUsername: string, password: string) => {
    const user = mockUsers.find(u => u.email === emailOrUsername || u.username === emailOrUsername);
    if (!user) return { error: "User not found" };

    // Check approvals
    if (user.role !== 'Admin' && !user.is_approved) {
        return { error: "Account not approved. Please contact Admin." };
    }

    return {
        token: "mock-jwt-token-" + Date.now(),
        user: user,
        message: "Login successful"
    };
};

export const mockRegister = (data: any) => {
    // Check if email or username exists
    const exists = mockUsers.find(u => u.email === data.email || u.username === data.username);
    if (exists) return { error: "Email or username already exists" };

    const newUser = {
        id: mockUsers.length + 1,
        ...data,
        is_approved: data.role === 'Admin' ? 1 : 0, // In mock, only Admin is auto-approved, or maybe none?
        created_at: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return { message: "User registered successfully", error: undefined };
};
