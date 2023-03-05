import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../utils/makeUrl";

// import { baseQueryWithReauth } from "./reAuth";
import { API_METHODS, GOODS_API } from "../../utils/constants";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getGoods: builder.query({
      query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" }
            ]
          : [{ type: "Products", id: "LIST" }]
    }),
    addGoods: builder.mutation({
      query: (body) => ({
        url: GOODS_API.GOODS,
        method: API_METHODS.post,
        body
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    }),
    deleteGoods: builder.mutation({
      query: (id) => ({
        url: `${GOODS_API.GOODS}${id}/`,
        method: API_METHODS.delete
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    }),
    fetchGoods: builder.mutation({
      query: () => ({
        url: GOODS_API.GOODS,
        method: API_METHODS.get
      })
    })
  })
});

export const {
  useFetchGoodsMutation,
  useGetGoodsQuery,
  useAddGoodsMutation,
  useDeleteGoodsMutation
} = goodsApi;
