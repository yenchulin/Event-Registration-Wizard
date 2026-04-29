export default [
  {
    path: '/',
    component: () => import('../layouts/mainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/HomePage.vue'),
      },
      {
        path: 'register',
        name: 'registration-wizard',
        component: () => import('../pages/RegistrationWizard.vue'),
      },
      {
        path: 'success/:confirmationCode',
        name: 'registration-success',
        props: true,
        component: () => import('../pages/RegistrationSuccessPage.vue'),
        beforeEnter: (to, from) => {
          if (from.name !== 'registration-wizard') {
            return { name: 'home' }
          }
        },
      },
    ],
  },
]
