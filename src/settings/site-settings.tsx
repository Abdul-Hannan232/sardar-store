import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
import siteLogo from 'public/assets/images/logo.svg';

export const siteSettings = {
  name: 'SARDAR BABA',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, TanStack-React-Query and Tailwind CSS.',
  author: {
    name: 'MAYONITY',
    websiteUrl: 'https://mayonity.com',
    address: '',
  },
  logo: {
    // url: '',
    url: siteLogo,
    alt: 'SARDAR_STORE',
    href: '/',
    width: 128,
    height: 30,
  },
  defaultLanguage: '',
  currencyCode: 'PKR',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/',
        label: 'Homee4',
        // subMenu: [
        //   {
        //     id: 1,
        //     path: '/',
        //     label: 'menu-modern',
        //   },
        //   {
        //     id: 2,
        //     path: '/classic',
        //     label: 'menu-classic',
        //   },
        //   {
        //     id: 3,
        //     path: '/vintage',
        //     label: 'menu-vintage',
        //   },
        //   {
        //     id: 4,
        //     path: '/standard',
        //     label: 'menu-standard',
        //   },
        //   {
        //     id: 5,
        //     path: '/minimal',
        //     label: 'menu-minimal',
        //   },
        //   {
        //     id: 6,
        //     path: '/trendy',
        //     label: 'menu-trendy',
        //   },
        //   {
        //     id: 7,
        //     path: '/elegant',
        //     label: 'menu-elegant',
        //   },
        //   {
        //     id: 8,
        //     path: '/refined',
        //     label: 'menu-refined',
        //   },
        //   {
        //     id: 9,
        //     path: '/antique',
        //     label: 'menu-antique',
        //   },
        //   {
        //     id: 10,
        //     path: '/ancient',
        //     label: 'menu-ancient',
        //   },
        // ],
      },
      {
        id: 2,
        path: '/pages/search',
        label: 'Categories',
        subMenu: [
          {
            id: 1,
            path: '/pages/search',
            label: 'Fresh Vegetables',
          },
          {
            id: 2,
            path: '/pages/search',
            label: 'Diet Nutrition',
          },
          {
            id: 3,
            path: '/pages/search',
            label: 'Healthy Foods',
          },
          {
            id: 4,
            path: '/pages/search',
            label: 'Grocery Items',
          },
          {
            id: 5,
            path: '/pages/search',
            label: 'Beaf Steak',
          },
        ],
      },
      // {
      //   id: 3,
      //   path: '/search',
      //   label: 'menu-dietary',
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: '/search',
      //       label: 'menu-vegetarian',
      //     },
      //     {
      //       id: 2,
      //       path: '/search',
      //       label: 'menu-kakogenic',
      //     },
      //     {
      //       id: 3,
      //       path: '/search',
      //       label: 'menu-mediterranean',
      //     },
      //     {
      //       id: 4,
      //       path: '/search',
      //       label: 'menu-organic',
      //     },
      //   ],
      // },
      {
        id: 4,
        path: '/pages/search',
        label: 'Search',
      },
      // {
      //   id: 5,
      //   path: '/shops/',
      //   label: 'menu-shops',
      // },
      // {
      //   id: 6,
      //   path: '/',
      //   label: 'menu-pages',
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: '/',
      //       label: 'menu-users',
      //       subMenu: [
      {
        id: 1,
        path: '/pages/my-account/account-settings',
        label: 'My Account',
      },
      //         {
      //           id: 2,
      //           path: '/signin',
      //           label: 'menu-sign-in',
      //         },
      //         {
      //           id: 3,
      //           path: '/signup',
      //           label: 'menu-sign-up',
      //         },
      //       ],
      //     },
      {
        id: 2,
        path: '/pages/faq',
        label: 'Faq',
      },
      //     {
      //       id: 3,
      //       path: '/about-us',
      //       label: 'menu-about-us',
      //     },
      //     {
      //       id: 4,
      //       path: '/privacy',
      //       label: 'menu-privacy-policy',
      //     },
      //     {
      //       id: 5,
      //       path: '/terms',
      //       label: 'menu-terms-condition',
      //     },
      //     {
      //       id: 6,
      //       path: '/contact-us',
      //       label: 'menu-contact-us',
      //     },
      //     {
      //       id: 7,
      //       path: '/checkout',
      //       label: 'menu-checkout',
      //     },
      //     {
      //       id: 8,
      //       path: '/404',
      //       label: 'menu-404',
      //     },
      //   ],
      // },
    ],

    pagesMenu: [
      {
        id: 1,
        path: '/',
        label: 'Home',
      },
      {
        id: 2,
        path: '/pages/search',
        label: 'Categories',
        subMenu: [
          {
            id: 1,
            path: '/pages/search',
            label: 'Fresh Vegetables',
          },
          {
            id: 2,
            path: '/pages/search',
            label: 'Diet Nutrition',
          },
          {
            id: 3,
            path: '/pages/search',
            label: 'Healthy Foods',
          },
          {
            id: 4,
            path: '/pages/search',
            label: 'Grocery Items',
          },
          {
            id: 5,
            path: '/pages/search',
            label: 'Beaf Steak',
          },
        ],
      },
      {
        id: 4,
        path: '/pages/search',
        label: 'Search',
      },

      {
        id: 4,
        path: '/pages/my-account/account-settings',
        label: 'My Account',
      },
      {
        id: 5,
        path: '/pages/faq',
        label: 'Faq',
      },
      // {
      //   id: 1,
      //   path: '/pages/search',
      //   label: 'menu-best-deals',
      // },
      // {
      //   id: 2,
      //   path: '/pages/about-us',
      //   label: 'menu-about-us',
      // },
      // {
      //   id: 3,
      //   path: '/pages/contact-us',
      //   label: 'menu-contact-us',
      // },
      // {
      //   id: 4,
      //   path: '/pages/faq',
      //   label: 'menu-faq',
      // },
    ],
  },
};
