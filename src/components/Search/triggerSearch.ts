import { ISearchParams, MediaType } from "./useSearch";

export interface ISearchResult {
  collection?: ISearchResultCollection;
  reason?: string;
}

export interface ISearchResultCollection {
  version: string;
  href: string;
  items: ISearchResultCollectionItem[];
  metadata: {
    total_hits: number;
  };
}

export interface ISearchResultCollectionItem {
  href: string;
  data: ISearchResultCollectionItemData[];
  links: ISearchResultCollectionItemLink[];
}

interface ISearchResultCollectionItemData {
  center: string;
  title: string;
  location?: string;
  nasa_id: string;
  date_created: string;
  keywords: string[];
  media_type: MediaType;
  description_508: string;
  secondary_creator: string;
  description: string;
}

interface ISearchResultCollectionItemLink {
  href: string;
  rel: string;
  render: string;
}

const NASA_SEARCH_API_ROOT = "https://images-api.nasa.gov";
const NASA_IMAGES_API_ROOT = "https://images-assets.nasa.gov";

export const triggerSearch = async (
  params: ISearchParams
): Promise<ISearchResult> => {
  console.log(params);
  return (
    await fetch(
      `${NASA_SEARCH_API_ROOT}/search?${
        params.mediaType ? "&media_type=" + params.mediaType : ""
      }${params.search ? "&q=" + params.search : ""}${
        params.yearStart ? "&year_start=" + params.yearStart : ""
      }${params.yearEnd ? "&year_end=" + params.yearEnd : ""}${
        params.nasaId ? "&nasa_id=" + params.nasaId : ""
      }`
    )
  ).json();
};

export const getImagesCollection = async (
  nasaId: string
): Promise<string[]> => {
  return (
    await fetch(`${NASA_IMAGES_API_ROOT}/image/${nasaId}/collection.json`)
  ).json();
};
