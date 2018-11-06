export const PAGES_MENU = [
{
    path: 'cu001',
    data: {
        menu: {
            title: 'Plantilla',
            short: 'Plantilla',
            icon: 'fa fa-clipboard'
        }
    },
    children: [
    {
        path: 'listadoplantillas',
        data: {
            menu: {
                title: 'Listar Plantillas',
                short: 'Listar Plantillas'
            }
        }
    }
    ]
},
{
    path: 'cu002',
    data: {
        menu: {
            title: 'Programación',
            short: 'Programación',
            icon: 'fa fa-list-alt'
        }
    },
    children: [
    {
        path: 'listarencuesta',
        data: {
            menu: {
                title: 'Programaciones Realizadas',
                short: 'Programaciones Realizadas'
            }
        }
    },
    ]
},
{
    path: 'cu003/encuesta',
    data: {
        menu: {
            title: 'Encuesta',
            short: 'Encuesta',
            icon: 'fa fa-clipboard'
        }
    }
},
{
    path: 'cu004/resultados',
    data: {
        menu: {
            title: 'Resultados',
            short: 'Resultados',
            icon: 'fa fa-clipboard'
        }
    }
},

];
