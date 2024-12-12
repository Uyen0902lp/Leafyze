export interface IMenuItem {
  id: number;
  link: string;
  title: string;
  mega_menu?: boolean;
  drop_down?: boolean;
  product_menus?: {
    id: number;
    title: string;
    link: string;
    dropdown_menus: {
      title: string;
      link: string;
    }[];
  }[];
  dropdown_menus?: {
    title: string;
    link: string;
  }[];
  adminOnly?: boolean;
}
