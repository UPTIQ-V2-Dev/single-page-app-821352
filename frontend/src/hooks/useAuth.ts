import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { clearAuthData, getStoredUser, isAuthenticated } from '@/lib/api';
import type { LoginRequest, SignupRequest, User } from '@/types/user';
import { toast } from 'sonner';

export const useAuth = () => {
    const queryClient = useQueryClient();

    // Get current user from localStorage
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const storedUser = getStoredUser();
            return storedUser;
        },
        staleTime: Infinity, // User data doesn't change often
        enabled: isAuthenticated()
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            toast.success('Login successful!');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Login failed');
        }
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: (userData: SignupRequest) => authService.register(userData),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            toast.success('Registration successful!');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Registration failed');
        }
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            queryClient.clear();
            toast.success('Logged out successfully');
        },
        onError: (error: any) => {
            // Still clear local data even if server logout fails
            clearAuthData();
            queryClient.setQueryData(['user'], null);
            queryClient.clear();
            toast.error(error?.response?.data?.message || 'Logout failed');
        }
    });

    const login = (credentials: LoginRequest) => {
        return loginMutation.mutateAsync(credentials);
    };

    const register = (userData: SignupRequest) => {
        return registerMutation.mutateAsync(userData);
    };

    const logout = () => {
        return logoutMutation.mutateAsync();
    };

    return {
        user: user as User | null,
        isLoading,
        isAuthenticated: !!user && isAuthenticated(),
        login,
        register,
        logout,
        isLoginPending: loginMutation.isPending,
        isRegisterPending: registerMutation.isPending,
        isLogoutPending: logoutMutation.isPending
    };
};