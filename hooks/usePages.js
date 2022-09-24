import { useTranslation } from "./";

const usePages = () => {
    const { t } = useTranslation();

    const pages = {
        sec1: [
            {
                name: t.home,
                path: '/',
                isPrivate: false
            },
            {
                name: t.projects,
                path: '/projects',
                isPrivate: false
            },
            {
                name: t.invest,
                path: '/investor',
                isPrivate: true
            },
            {
                name: t.raise,
                path: '/company',
                isPrivate: true
            }
            
        ],
        sec2 : [
            {
                name: t.sign_in,
                path: '/sign-in',
                isPrivate: false
            },
            {
                name: t.sign_up,
                path: '/sign-up',
                isPrivate: false
            },
            {
                name: t.profile,
                path: '/profile',
                isPrivate: true
            },
        ]
    }

    return pages;
}

export default usePages;