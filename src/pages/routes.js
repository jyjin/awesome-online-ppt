module.exports = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/', component: './features/home' },
      { path: '/shell', component: './features/shell' },
    ]
  },
]
