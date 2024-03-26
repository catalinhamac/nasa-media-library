import { useQuery } from "react-query";
import { getImagesCollection, triggerSearch } from "./triggerSearch";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
}

export interface ISearchParams {
  search?: string;
  mediaType?: MediaType;
  yearStart?: string;
  yearEnd?: string;
  nasaId?: string;
}

export const useSearch = (params: ISearchParams, queryOptions = {} as any) => {
  return useQuery(
    ["search", ...Object.values(params)],
    () => triggerSearch({ ...params, mediaType: MediaType.IMAGE }),
    queryOptions
  );
};

export const useImagesCollection = (nasaId: string) => {
  return useQuery(["images", nasaId], () => getImagesCollection(nasaId), {
    enabled: !!nasaId,
  });
};
