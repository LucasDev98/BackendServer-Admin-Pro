

const getMenuFrontend = ( role ) => {
   const menu = [
        {
          titulo: 'Principal',
          icon: 'mdi mdi-gauge',
          subMenuItems: [
            { titulo: 'main', url: '/' },
            { titulo: 'Progress Bar', url: 'progress' },
            { titulo: 'Graphs', url: 'grafica1' },
            { titulo: 'Promesas', url: 'promesas' },
            { titulo: 'Rxjs', url: 'rxjs' },
          ],
        },
        {
          titulo: 'Mantenimientos',
          icon: 'mdi mdi-folder-lock-open',
          subMenuItems: [
            // { titulo: 'Usuarios', url: 'users' },
            { titulo: 'Medicos', url: 'medicos' },
            { titulo: 'hospitales', url: 'hospitales' },
          ],
        },
      ];

    if( role == 'ADMIN_ROLE') {
        menu[1].subMenuItems.unshift({ titulo: 'Usuarios', url: 'users' })
    }

    return menu;
}


module.exports = {
    getMenuFrontend
}