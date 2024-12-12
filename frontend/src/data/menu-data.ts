import { IMenuItem } from "@/types/menu-d-type";

const menu_data:IMenuItem[] = [
  {
    id:1,
    link:'/',
    title:'Home',
  },
  {
    id:2,
    link:'/shop',
    title:'Shop',
    // drop_down:true,
    // dropdown_menus:[
    //   {title:'Shop',link:'/shop'},
    //   {title:'Cart',link:'/cart'},
    //   {title:'Wishlist',link:'/wishlist'},
    //   {title:'Coupons',link:'/coupons'},
    //   {title:'Checkout',link:'/checkout'},
    // ]
  },
  {
    id:3,
    link:'/about',
    title:'Pages',
    drop_down:true,
    dropdown_menus:[
      // {title:'Detect',link:'/detect'},
      // {title:'History',link:'/history'},
      {title:'About',link:'/about'},
      {title:'Blog',link:'/blog'},
      {title:'Contact',link:'/contact'},
      // {title:'Login',link:'/login'},
      // {title:'Register',link:'/register'},
      // {title:'Profile',link:'/profile'},
      // {title:'Checkout',link:'/checkout'},
    ]
  },
  {
    id:4,
    link:'/detect',
    title:'Plant',
    drop_down:true,
    dropdown_menus:[
      {title:'Detect',link:'/detect'},
      {title:'History',link:'/history'},
      {title:'Pathology',link:'/pathology'},
      {title:'Analytics',link:'/analytics'},
    ],
  },
  // {
  //   id:5,
  //   link:'/blog',
  //   title:'Blog',
  //   drop_down:true,
  //   dropdown_menus:[
  //     {title:'Blog Standard',link:'/blog'},
  //     {title:'Blog Details',link:'/blog-details/1'},
  //   ]
  // },
  {
    id: 6,
    link: '/admin',
    title: 'Dashboard',
    adminOnly: true,
  },
];

export default menu_data;
