import { Helmet } from 'react-helmet-async';

import CreateService from 'src/sections/servicesPackage/CreateService';

// ----------------------------------------------------------------------

export default function ServicePackagePage() {
  return (
    <>
      <Helmet>
        <title> Dịch vụ | FService </title>
      </Helmet>
      
      <CreateService/>
    </>
  );
}

