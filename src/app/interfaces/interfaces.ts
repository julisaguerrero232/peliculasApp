export interface RespuestaMDB{
  page: number;
  total_results: number;
  total_pages: number;
  results: Pelicula[];
}

export interface Pelicula{
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

export interface Belongs_to_collection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface Production_company {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface Production_country {
	iso_3166_1: string;
	name: string;
}

export interface Spoken_language {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface PeliculaDetalle {
	adult?: boolean;
	backdrop_path?: string;
	belongs_to_collection?: any;
	budget?: number;
	genres?: Genre[];
	homepage?: string;
	id?: number;
	imdb_id?: string;
	origin_country?: string[];
	original_language?: string;
	original_title?: string;
	overview?: string;
	popularity?: number;
	poster_path?: string;
	production_companies?: Production_company[];
	production_countries?: Production_country[];
	release_date?: string;
	revenue?: number;
	runtime?: number;
	spoken_languages?: Spoken_language[];
	status?: string;
	tagline?: string;
	title?: string;
	video?: boolean;
	vote_average?: number;
	vote_count?: number;
}

export interface Cast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface Crew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
	department: string;
	job: string;
}

export interface RespuestaCredits {
	id: number;
	cast: Cast[];
	crew: Crew[];
}
