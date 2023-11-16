/* eslint-disable import/no-extraneous-dependencies */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/users/UserPage'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ViewPackage = lazy(() => import('src/pages/packages/PackagePage'));
export const CreatePackage = lazy(() => import('src/pages/packages/CreatePackagePage'));
export const ViewService = lazy(() => import('src/pages/services/ServicePackagePage'));
export const PackageCardDetail = lazy(() => import('src/pages/packages/PackageDetailPage'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true, path: 'admin' },
        { path: 'user', element: <UserPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'packages', element: <ViewPackage /> },
        { path: 'packages/new', element: <CreatePackage />},
        { path: 'services', element: <ViewService /> },
        { path: 'packages/detail/:id', element: <PackageCardDetail />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
