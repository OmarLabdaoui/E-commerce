import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './api'

// Define a service using a base URL and expected endpoints
export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (cat) => `products/${cat}`,
    }),
  }),
})
export const {useGetProductsByCategory} =catApi