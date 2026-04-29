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
    ],
  },
]
