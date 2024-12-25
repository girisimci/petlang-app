import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.example.com/v1/',
    prepareHeaders: (headers) => {
      // Burada gerekli auth header'larını ekleyebilirsiniz
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: () => 'profiles',
    }),
    likeProfile: builder.mutation({
      query: (profileId) => ({
        url: `profiles/${profileId}/like`,
        method: 'POST',
      }),
    }),
    dislikeProfile: builder.mutation({
      query: (profileId) => ({
        url: `profiles/${profileId}/dislike`,
        method: 'POST',
      }),
    }),
    getUserProfile: builder.query({
      query: () => 'profile',
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: 'profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProfilesQuery,
  useLikeProfileMutation,
  useDislikeProfileMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = api; 