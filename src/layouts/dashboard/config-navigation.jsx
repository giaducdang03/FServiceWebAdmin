import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Người dùng',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Gói dịch vụ',
    path: '/packages',
    icon: icon('ic_cart'),
  },
  {
    title: 'Dịch vụ',
    path: '/services',
    icon: icon('ic_blog'),
  },
  {
    title: 'Đăng nhập',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
