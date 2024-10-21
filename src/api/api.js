import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Base URL for the API
const BASE_URL = 'https://fakestoreapi.com/users';

/****************************
 * @use: used for fetch the users
 * @param:{}
 */
const fetchUsers = async (limit) => {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/****************************
 * @use: used for update the user
 * @param:{userId, updatedUser}
 */
const updateUser = async ({ userId, updatedUser }) => {
    const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
};

/****************************
 * @use: used for delete the user
 * @param:{userId}
 */
const deleteUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return response.json();
};

/****************************
 * @use: create hook for fetch users
 * @param:{}
 */
export const useUsers = (page, itemsPerPage) => {
    let perPageItem = page * itemsPerPage
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(perPageItem),
    });
};

/****************************
 * @use: create hook for update users
 * @param:{}
 */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

/****************************
 * @use: create hook for delete users
 * @param:{}
 */
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

/****************************
 * @use: used for fetch user with pagination
 * @param:{}
 */
export const useUsersWithPagination = (page, limit) => {
    return useQuery({
        queryKey: ['users', page],
        queryFn: () =>
            fetch(`${BASE_URL}?page=${page}&limit=${limit}`).then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                return res.json();
            }),
    });
};

/****************************
 * @use: used for fetch the products
 * @param:{page, limit, filters}
 */
const fetchProducts = async (page, limit, filters) => {
    const response = await fetch(
        `https://fakestoreapi.com/products?limit=${limit}&page=${page}&sort=${filters}`
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/****************************
 * @use:create hook for fetch product
 * @param:{page, limit, filters}
 */
export const useProducts = (page, limit, filters) => {
    let pageLimit = limit * page;

    return useQuery({
        queryKey: ['products', page, limit, filters],
        queryFn: () => fetchProducts(page, pageLimit, filters),
        keepPreviousData: true, // This helps with pagination to keep previous data
    });
};

/****************************
 * @use:used for fetch product detail
 * @param:{productId}
 */
const fetchProductDetails = async (productId) => {
    const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

/****************************
 * @use:create hook for get product detail
 * @param:{productId}
 */
export const useProductDetail = (productId) => {
    return useQuery({
        queryKey: [],
        queryFn: () => fetchProductDetails(productId),
    });
}

