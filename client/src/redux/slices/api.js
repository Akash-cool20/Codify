import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = "http://localhost:4000";

export const api = createApi({
  reducerPath:'api',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["myCodes", "allCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation({
      query:(body)=>({
        url: "/compiler/save",
        method: "POST",
        body:body,
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),
    loadCode: builder.mutation({
      query:(body)=>({
        url: "/compiler/load",
        method: "POST",
        body:body,
        transformResponse: (response) => response.data,
      })
    }),
    login: builder.mutation({
      query:(body)=>({
        url: "/user/login",
        method: "POST",
        body:body,
        credentials: "include",
        transformResponse: (response) => response.data,
      })
    }),
    signup: builder.mutation({
      query:(body)=>({
        url: "/user/signup",
        method: "POST",
        body:body,
        transformResponse: (response) => response.data,
      })
    }),
    logout: builder.mutation({
      query: ()=>({
        url: "/user/logout", 
        method: "POST" ,
        cache: "no-store" ,
      })
    }),
    getUserDetails: builder.query({ 
      query: () => "/user/user-details", 
    }),
    getMyCodes: builder.query({
      query:(body)=>({
        url: "/user/my-codes", 
      }),
      providesTags: ["myCodes"],  
    }),
    deleteCode: builder.mutation({
      query:(id)=>({
        url: `/compiler/delete/${id}`, 
        method: "DELETE", 
      }),
      invalidatesTags: ["myCodes","allCodes"]
     }),
    editCode: builder.mutation({
      query: ({ fullCode, id }) => ({ 
        url: `/compiler/edit/${id}`,
        method: "PUT", 
        body: fullCode 
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),
    getAllCodes: builder.query({
      query:()=>({
        url: "/compiler/get-all-codes", 
      }),
      providesTags: ["allCodes"]
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = api;
