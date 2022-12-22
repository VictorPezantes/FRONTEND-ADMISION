/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const AdminItemsNavigations: FuseNavigationItem[] = [
    
    {
        id: 'empresa',
        title: 'Empresa',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/empresa'
    },
    {
        id: 'rrhh',
        title: 'Recursos Humanos',
        type: 'group',
        children: [
            {
                id: 'admision',
                title: 'Admisión',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-pie',
                link: '/recursos-humanos/admision',
                children: [
                    {
                        id: 'registrar-solicitud',
                        title: 'Registrar solicitud',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/solicitud/registrar-solicitud'
                    },
                    {
                        id: 'postulaciones',
                        title: 'Postulaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/postulaciones'
                    },
                    {
                        id: 'ofertas',
                        title: 'Ofertas',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/ofertas'
                    },
                    {
                        id: 'entrevistas',
                        title: 'Entrevistas',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/entrevistas'
                    },
                    {
                        id: 'examen-medico',
                        title: 'Examen médico',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/examen-medico'
                    },
                    {
                        id: 'evaluaciones',
                        title: 'Evaluaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/evaluaciones'
                    },
                ]
            },

            {
                id: 'personas',
                title: 'Personas',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-pie',
                //link: '/recursos-humanos/admision',
                children: [
                    {
                        id: 'usuario',
                        title: 'Usuarios',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/usuario',
                    },
                    {
                        id: 'personal',
                        title: 'Personal',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/personal',
                    },
                ]
            },
        ]
    }

];

export const defaultNavigation: FuseNavigationItem[] = [...AdminItemsNavigations];
export const compactNavigation: FuseNavigationItem[] = [...AdminItemsNavigations];
export const futuristicNavigation: FuseNavigationItem[] = [...AdminItemsNavigations];
export const horizontalNavigation: FuseNavigationItem[] = [...AdminItemsNavigations];
