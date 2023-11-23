import { api } from '@/redux/api/apiSlice';

const componentApi = api.injectEndpoints({
    endpoints: builder => ({
        getComponents: builder.query({
            query: (component) => `/components/category/${component}`
        }),
        getCategory: builder.query ({
            query: () => `/components/category`
        })
    })
});

export const {useGetComponentsQuery,useGetCategoryQuery} =  componentApi