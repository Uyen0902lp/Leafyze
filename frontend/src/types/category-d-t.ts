export interface ICategory{
  id: number;
  image: string;
  title: string;
  slug: string;
  subcategories:{
    id:number;
    title:string;
    productCount: number;
  }[];
  productCount: number;
};


export interface Subcategory {
  id: number;
  title: string;
}

export interface ICategoryDT {
  id: number;
  title: string;
  image: string;
  subcategories: Subcategory[];
}