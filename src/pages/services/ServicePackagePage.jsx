import { Helmet } from 'react-helmet-async';
import ViewService from 'src/sections/servicesPackage/ViewService';

// ----------------------------------------------------------------------

export default function ServicePackagePage() {
  return (
    <>
      <Helmet>
        <title> Dịch vụ | FService </title>
      </Helmet>

      <ViewService />
    </>
  );
}

