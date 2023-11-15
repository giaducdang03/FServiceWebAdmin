import { Helmet } from 'react-helmet-async';
import ViewPackage from 'src/sections/packages/ViewPackage';

// ----------------------------------------------------------------------

export default function PackagesPage() {
  return (
    <>
      <Helmet>
        <title> Packages | FService </title>
      </Helmet>

      <ViewPackage />
    </>
  );
}

