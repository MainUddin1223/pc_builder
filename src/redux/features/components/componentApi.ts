import { api } from '@/redux/api/apiSlice';

const componentApi = api.injectEndpoints({
    endpoints: builder => ({
        getComponents: builder.query({
            query: (component) => `/components/category/${component}`
        })
    })
});

export const {useGetComponentsQuery} =  componentApi